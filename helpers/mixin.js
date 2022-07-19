import { Client } from 'mixin-node-sdk'

const conf = { 
  "client_id": "24939c38-6840-305a-a0e3-f5b12ea1dfbe",
  "session_id": "b4cdfbbd-30ee-4e48-82f1-7e4a53f294df",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDVxucK4E4ihS0m8QZ3sS7ua/SO5PsIbdeYlFsljpBEUMwfqd67\nEF0x9cvCflxJ6d13tgYUefP+pFs5tZHmAgy+uTVE/lF0fCFVCEi6kz+C3mTZCdmV\nBC8DtMN1HPiW+dCJQuuhN3yDkcaAlQMuQ+GgS7r/DmsZBSBqu9HBMx97TQIDAQAB\nAoGAL1mjCzGrnNHKsnloaVKBhqW6wXvObouF2XHizmrJYZhT3h+OCfkR62L6AtZi\nMqzuNPnIVvi8JobY/etNqZiCocRFB2BxPLK1rCKB+iSyZ/Rz6Fsg/tDaTk6RNDi4\n6pY/UvG/36AzZS77F9lJQnv9R4JfRY7+nyUY11//ry147bECQQDzcv5xaZbJMUMp\nA8bCNHKvIyLO79r4MmPSAkt1Y8w4SAm8J9yBBqEi6eZSKHFnIDUvfGef3S2b2Vi+\n3xUciJUzAkEA4MxMhUa53Ti/09/sbtZ/T0kaxUtS4W4AcYq5mT2vDCJCsxYjYUMR\nubPrhRMbA9cniVNDBcuJSoVr/GZyk06tfwJBALw4IwqyNRc2FBOozMmnXSeVBbty\nbBxKcSyUA50t3F2DLKuhMfU7l+dzaVQJ2qt9lkExcLiDe1isMNXZiev2mUsCQAyk\nsPEWB0If/PoHsB6TxdlJvU23bNPtAe1g5gtuYrgF/UZhSmAgC5EsQ2TarDxND5Yz\nrqNWzUP5uRcbE/qhBDUCQQDQz42125MSeFTWJIRJonM/96wtsZEtLM22+p+JtaQ2\nHR8XgbNdRi2OWac1MPcL1fCG5SLSLPqePPIv5Dr8YRFX\n-----END RSA PRIVATE KEY-----",
  "pin": "164301", 
  "pin_token": "knpkaRiF/Ui4afRl9KDdKE6RFCpO+8cK/VrdJXcVI+msyvbU/GcluLLusmDZF6LYTwLPKQIKjTPw4g2NgWhVe7U5nTvR2sxYOYABtQOMI/zYCq/ZgFAhb0to52UsrU5uz4KlEH0menmNLz1qgEOrcBhmVnypFH1Xs2kvGJXiobs=",
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