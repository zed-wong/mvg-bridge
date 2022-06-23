import { ethers } from "ethers";
import { parse } from 'uuid';
import Web3Modal from "web3modal"

import RegistryABI from '../assets/registryABI.json';
import AssetABI from '../assets/assetABI.json';

export const RPCURL = "https://geth.mvm.dev/";
export const registryAddress = "0x3c84B6C98FBeB813e05a7A7813F0442883450B1F";

export const getRegistryContract = (address = registryAddress) => new ethers.Contract(address, RegistryABI, new ethers.providers.JsonRpcProvider(RPCURL));
export const getContractByAssetID = (id, processAddress = registryAddress) => getRegistryContract(processAddress).contracts('0x' + Buffer.from(parse(id)).toString('hex'));
// START No need actually
export const provider = new ethers.Wallet("fd9477620edb11e46679122475d61c56d8bfb753fe68ca5565bc1f752c5f0eeb", new ethers.providers.StaticJsonRpcProvider(RPCURL));
export const assetContract = (assetAddress) => new ethers.Contract(assetAddress, AssetABI, provider);
// END
export const getSigner = async () => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  return provider.getSigner()
}

export const getContract = async (addr, abi) => {
  const signer = await getSigner()
  return new ethers.Contract(addr, abi, signer)
}

export async function execContract(address, method, args){
  const t = await getContract(address, AssetABI)
  return t[method](...args, {
    gasLimit: 500000
  })
}