import { Client } from 'mixin-node-sdk'

const conf = { 
  "client_id": "01fc34ef-a627-3496-8977-80c8ecbc32de",
  "session_id": "1819b4e8-2daf-463c-a351-16e74d479d86",
  "private_key": "Sb6lyBjsd9e89NuAEGcCmE5oWdy2YmFmHneN6MtKu_LkvTx9tUzIjzUkFL_Ttdj1YNoZ44hnpxeWCN99jFSxHA",
  "pin": "912459", 
  "pin_token": "oE-OsyZZP2ZYMdIPm-Vgg84nEHrMOrk-D3koP6UVE3M",
  "client_secret": ''
 }

export const MixinClient = new Client(conf);

export function NewClient(client_id, session_id, private_key) {
  return new Client({
    "pin": "",
    "client_id": client_id,
    "session_id": session_id,
    "pin_token": "",
    "private_key": private_key,
    "client_secret": ''
  }
  )
}

export default MixinClient;