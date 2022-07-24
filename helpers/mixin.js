import { MixinApi } from '@mixin.dev/mixin-node-sdk'

const keystore = {
  "user_id": "e956d5e8-f532-3bdc-af42-be618d8601ee",
  "session_id": "b39b3503-a781-47c1-829b-e2818b7b45bc",
  "private_key": "M7h-C6yixsnt1FTtnW3rREnJQJinObSJdkSSeUj0rArqTr80Y3Ax3NgAJM-Y1CGx9SbDnYP5nI0dOWgyCVUCmw",
  "pin_token": "ucirZrG9mFCJmZj6qEoZ/J3sYkslVxTIRg5ZKqYl1Dk=",
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