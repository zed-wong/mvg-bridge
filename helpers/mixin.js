import { MixinApi } from '@mixin.dev/mixin-node-sdk'

export const keystore = {
  "user_id": "26f7a72f-df5f-3f19-9e5c-2f0ea4871967",
  "session_id": "c6fe5c19-2928-4f72-9437-d1bceca37c65",
  "private_key": "uWa1wuXaqcIo7VGQ1ZXYqTs121yipe6CEHwlNwU4aQVUEKlwDlceAiSoHNhF9S6MQOeDhuAnbXOXCB_o7k25Sw",
  "pin_token": "ik77iOYeuuwbI6RNKkOmp1sWFqUHU63MrIZDeEUILU8=",
  "pin": "832376"
}

export const MixinClient = new MixinApi({
  requestConfig: {
    responseCallback: err => {
      console.log(err);
    },
  },
  keystore
});

export function NewClient(client_id, session_id, private_key) {
  let keystore = {
    user_id: client_id,
    session_id: session_id,
    private_key: private_key,
  }
  let config = {
    requestConfig: {
      responseCallback: err => {
        console.log(err);
      },
    },
    keystore
  }
  return new MixinApi(config)
}

export default MixinClient;