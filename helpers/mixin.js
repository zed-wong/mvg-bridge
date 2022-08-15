import { MixinApi } from '@mixin.dev/mixin-node-sdk'
import { Client } from 'mixin-node-sdk'

export const keystore = {
  "pin": "146818",
  "user_id": "d7e49c43-739c-49d9-bca4-d68a4e76b3fb",
  "session_id": "0ba878b5-da4c-44e5-95b2-ad5f9585387e",
  "pin_token": "_HhHTp-J6MEuwpfzyNV_L0hykFF0udHlDqHpULAEz10",
  "private_key": "ETP7mZ3qyYkNiv7Sagcyl1RFWI1_502pYeSdHN2Gcuvdgmc-0IrMQbsnxsFF3DlG6HSDB-wjSwPXWh1aD-sevw"
}

export const oldkeystore = {
  "pin": "146818",
  "client_id": "d7e49c43-739c-49d9-bca4-d68a4e76b3fb",
  "session_id": "0ba878b5-da4c-44e5-95b2-ad5f9585387e",
  "pin_token": "_HhHTp-J6MEuwpfzyNV_L0hykFF0udHlDqHpULAEz10",
  "private_key": "ETP7mZ3qyYkNiv7Sagcyl1RFWI1_502pYeSdHN2Gcuvdgmc-0IrMQbsnxsFF3DlG6HSDB-wjSwPXWh1aD-sevw"
}

export const MixinClient = new MixinApi({
  requestConfig: {
    responseCallback: err => {
      console.log(err);
    },
  },
  keystore
});

export const OldClient = new Client(oldkeystore);

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