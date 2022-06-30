import { ethers } from "ethers";
import { parse } from 'uuid';
import Web3Modal from "web3modal"

import RegistryABI from '../assets/registryABI.json';
import AssetABI from '../assets/assetABI.json';
import BridgeABI from '../assets/bridgeABI.json';

export const RPCURL = "https://geth.mvm.dev/";
export const registryAddress = "0x3c84B6C98FBeB813e05a7A7813F0442883450B1F";
export const bridgeAddress = "0x12266b2BbdEAb152f8A0CF83c3997Bc8dbAD0be0";

export const getSigner = async () => {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  return provider.getSigner()
}

export const getRegistryContract = (address = registryAddress) => new ethers.Contract(address, RegistryABI, new ethers.providers.JsonRpcProvider(RPCURL));
export const getContractByAssetID = (id, processAddress = registryAddress) => getRegistryContract(processAddress).contracts('0x' + Buffer.from(parse(id)).toString('hex'));

export const provider = new ethers.providers.Web3Provider(window.ethereum).getSigner();
export const assetContract = (assetAddress) => new ethers.Contract(assetAddress, AssetABI, provider);
export const bridgeContract = (bridgeAddress = bridgeAddress, bridgeABI = BridgeABI) => new ethers.Contract(bridgeAddress, bridgeABI, provider);


export const getContract = async (addr, abi) => {
  const signer = await getSigner()
  return new ethers.Contract(addr, abi, signer)
}

export async function execAssetContract(address, method, args){
  const t = await getContract(address, AssetABI)
  return t[method](...args, {
    gasLimit: 350000
  })
}

export async function execBridgeContract(address, method, args, value){
  const t = await getContract(address, BridgeABI)
  return t[method](...args, {
    gasLimit: 350000,
    value: value,
  })
}