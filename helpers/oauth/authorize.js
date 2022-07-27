// https://github.com/fox-one/uikit/blob/main/packages/uikit/src/utils/authorize.ts
// https://github.com/fox-one/uikit/blob/main/packages/uikit/src/services/mixin/oauth.js

import ReconnectingWebSocket from "reconnecting-websocket";
import { gzip } from "pako/lib/deflate";
import { ungzip } from "pako/lib/inflate";
import { v4 as uuidv4 } from "uuid";

import sha256 from "crypto-js/sha256"
import EncBase64 from "crypto-js/enc-base64";
import axios from "axios";

function base64URLEncode(str) {
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function generateRandomString(length) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function generateCodePair() {
  const randomCode = generateRandomString(32);
  const verifier = base64URLEncode(btoa(randomCode));
  const challenge = base64URLEncode(sha256(randomCode).toString(EncBase64));

  return { verifier, challenge };
}

export default function authorize(
  params,
  callbacks = {}
) {
  const [httpDefault, wsDefault] = ["https://api.mixin.one", "wss://blaze.mixin.one"];
  const http =  httpDefault;
  const ws =  wsDefault;
  const client = new MixinClient(http, ws);

  let opened = false;
  const { challenge = "", verifier = "" } = params.pkce
    ? generateCodePair()
    : {};

  const handler = (resp) => {
    const data = resp.data;

    if (resp?.error?.code === 400 || resp?.error?.code === 10002) {
      callbacks.onError?.(resp?.error);

      return true;
    }

    if (!data) return false;

    if (data.authorization_code.length > 16) {
      if (params.pkce) {
        console.log("calling /oauth/token")
        axios
          .post(
            "/oauth/token",
            {
              client_id: params.clientId,
              code_verifier: verifier,
              code: data.authorization_code
            },
            { baseURL: http }
          )
          .then((data) => {
            let token = data?.data?.data?.access_token;

            if (token) {
              callbacks.onSuccess?.(token);
            } else {
              callbacks.onError?.({
                description: "Get PKCE access token error"
              });
            }
          })
          .catch((error) => {
            callbacks.onError?.(error);
          });
      } else {
        callbacks.onSuccess?.(data.authorization_code);
      }

      return true;
    }

    if (opened) return false;

    callbacks.onShowUrl?.("https://mixin.one/codes/" + data.code_id);
    opened = true;

    return false;
  };

  client.connect(handler, params.clientId, params.scope, challenge);

  return client;
}

class MixinClient {
  constructor(api, endpoint) {
    this.api = api;
    this.endpoint = endpoint;
  }
  disconnect() {
    const self = this;

    self.ws.close();
  }
  connect(callback, clientId, scope, codeChallenge) {
    const self = this;

    self.handled = false;
    self.callback = callback;
    self.ws = new ReconnectingWebSocket(self.endpoint, "Mixin-OAuth-1", {
      maxReconnectionDelay: 5000,
      minReconnectionDelay: 1000,
      reconnectionDelayGrowFactor: 1.2,
      connectionTimeout: 8000,
      maxRetries: Infinity,
      debug: false
    });

    self.ws.addEventListener("message", function (event) {
      if (self.handled) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const msg = ungzip(new Uint8Array(this.result), { to: "string" });
        const authorization = JSON.parse(msg);
        if (self.callback(authorization)) {
          self.handled = true;
          return;
        }
        setTimeout(function () {
          self.sendRefreshCode(
            clientId,
            scope,
            codeChallenge,
            authorization.data
          );
        }, 1000);
      };
      fileReader.readAsArrayBuffer(event.data);
    });

    self.ws.addEventListener("open", function (_) {
      self.sendRefreshCode(clientId, scope, codeChallenge);
    });
  }

  sendRefreshCode(clientId, scope, codeChallenge, authorization) {
    const self = this;
    if (self.handled) {
      return;
    }

    self.send({
      id: uuidv4().toUpperCase(),
      action: "REFRESH_OAUTH_CODE",
      params: {
        client_id: clientId,
        scope,
        code_challenge: codeChallenge,
        authorization_id: authorization ? authorization.authorization_id : ""
      }
    });
  }

  send(msg) {
    try {
      this.ws.send(gzip(JSON.stringify(msg)));
    } catch (e) {
      if (e instanceof DOMException) {
      } else {
        console.error(e);
      }
    }
  }
}