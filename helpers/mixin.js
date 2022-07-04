import { Client } from 'mixin-node-sdk'

export const MixinClient = new Client({
  "pin": "523536",
  "client_id": "7d23f225-6104-3a3c-973a-4394b3d1b496",
  "session_id": "f2dcdba3-2bb8-49fe-8e2c-20b130faaac8",
  "pin_token": "tn9G6JdlXi17jQBySBpDJzCcXME7hqkoWmd_jl94iTM",
  "private_key": "lI9P8r0dCawroLumbnfJNgT3qQI97aDWHz8GdNmUOZ6zzrFseCeFycar6DAwCcRA3npNRh3TPCTElDxAhR4aKw",
  "client_secret": ''
});

export function NewClient(client_id, session_id, private_key) {
  return new Client({
    "pin": "",
    "client_id": client_id,
    "session_id": session_id,
    "pin_token": "",
    "private_key": private_key,
    "client_secret": ''
  }
)}

export default MixinClient;