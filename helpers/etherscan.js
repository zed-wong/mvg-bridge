import axios from 'axios';
import { ethers } from "ethers";

let offset = 10;
let ethscan_code = 'PKYR9W1KDBATC9WWBZ7BNDUD4WCTKNH727';
let testaddr = '0x2910543af39aba0cd09dbb2d50200b3e800a63d2';

export async function getEthBalance(address) {
  let resp = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${ethscan_code}`);
  return ethers.utils.formatEther(resp.data.result);
}

export async function getETHCounts(address, type) {
  let action;
  if (type === 'normalTx') {
    action = 'txlist'
  }
  if (type === 'internalTx') {
    action = 'txlistinternal'
  }
  if (type === 'erc20') {
    action = 'tokentx'
  }
  if (type === 'erc721') {
    action = 'tokennfttx'
  }
  if (type === 'erc1155') {
    action = 'token1155tx'
  }
  let url = `https://api.etherscan.io/api?module=account&action=${action}&address=${address}&startblock=0&endblock=99999999&page=1&offset=${offset}&sort=asc&apikey=${ethscan_code}`;
  try {
    let resp = await axios.get(url);
    console.log(type, resp)
    if (resp.data.result != null){
      return resp.data.result.length;
    }
    return 0;
  } catch(error) {
    console.log(error)
  }
}

export async function getETHAddressExistTime(address) {
  let url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${offset}&sort=dasc&apikey=${ethscan_code}`;
  try {
    let resp = await axios.get(url);
    return resp.data.result
  } catch(error) {
    console.log(error)
  }
}

export async function getETHEstimatedGas() {
  let url = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${ethscan_code}`;
  try {
    let resp = await axios.get(url);
    return resp.data.result
  } catch(error) {
    console.log(error)
  }
}