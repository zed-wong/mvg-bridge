import { ethers } from "ethers";
import axios from 'axios';
import { parse } from 'uuid';
import Web3Modal from "web3modal"

import RegistryABI from '../assets/registryABI.json';
import AssetABI from '../assets/assetABI.json';
import BridgeABI from '../assets/bridgeABI.json';

export const DECIMAL = 100000000
export const RPCURL = "https://geth.mvm.dev/";
export const registryID = 'bd670872-76ce-3263-b933-3aa337e212a4';
export const registryAddress = "0x3c84B6C98FBeB813e05a7A7813F0442883450B1F";
export const bridgeAddress = "0x0915EaE769D68128EEd9711A0bc4097831BE57F3";
export const storageAddress = '0xef241988D19892fE4efF4935256087F4fdc5ecAa';
export const withdrawalAddress = "0xb27C8e0665D2Afa10F50A7CF4D2B9B6B461FD438";
export const mirrorAddress = "0x3a04D4BeDF76C176C09Ac1F66F583070Ba540DC7";

export const mvmProvider = ethers.getDefaultProvider(RPCURL);

export const getSigner = async () => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  return provider.getSigner()
}

export const getRegistryContract = (address = registryAddress) => new ethers.Contract(address, RegistryABI, new ethers.providers.JsonRpcProvider(RPCURL));
export const getContractByAssetID = (id, processAddress = registryAddress) => getRegistryContract(processAddress).contracts('0x' + Buffer.from(parse(id)).toString('hex'));

export const fetchAssetContract = (assetId) => {
  const id = assetId.replaceAll('-', '');
  return getRegistryContract().contracts(`0x${id}`);
}
export const fetchUsersContract = (userIds) => {
  const bufLen = Buffer.alloc(2);
  bufLen.writeUInt16BE(userIds.length);
  const bufThres = Buffer.alloc(2);
  bufThres.writeUInt16BE(1);
  const ids = userIds.join('').replaceAll('-', '');
  const identity = `0x${bufLen.toString('hex')}${ids}${bufThres.toString('hex')}`;
  return getRegistryContract().contracts(ethers.utils.keccak256(identity));
}
export const fetchUserContract = (userId) => {
  return fetchUsersContract([userId]);
}

export const getContract = async (addr, abi) => {
  const signer = await getSigner()
  return new ethers.Contract(addr, abi, signer)
}

export async function execAssetContract(address, method, args) {
  const t = await getContract(address, AssetABI)
  return t[method](...args, {
    gasLimit: 350000,
    gasPrice: await mvmProvider.getGasPrice(),
  })
}

export async function execBridgeContract(address, method, args, value) {
  const t = await getContract(address, BridgeABI)
  return t[method](...args, {
    gasLimit: 350000,
    gasPrice: await mvmProvider.getGasPrice(),
    value: value,
  })
}

export async function getUserProxyContract(userAddr) {
  const result = await axios.post("https://bridge.mvm.dev/users", {
    public_key: ethers.utils.getAddress(userAddr),
  });
  return result.data.user.contract ? result.data.user.contract : "";
}

export function getExtra(userid, memo) {
  const action = {
    receivers: [userid], threshold: 1, extra: memo,
  };
  const extra =
    registryID.replaceAll('-', '') +
    storageAddress.slice(2).toLowerCase() +
    ethers.utils.id(JSON.stringify(action)).slice(2) +
    JSON.stringify(action)
      .split('')
      .map((v) => {
        return v.charCodeAt(0).toString(16);
      })
      .join('');
  return extra;
}

export async function userMe(token) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await axios
    .get(process.env.MIXIN_API_BASEURL + "me", config);
  return result.data ? result.data.data : {};
}