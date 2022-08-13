import axios from 'axios';
import JsSHA from 'jssha';
import { ethers } from 'ethers';
import ERC721ABI from '../assets/erc721.json';

// Deposit
export async function getOutputs(token, ids) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let resp = await axios.get(`${process.env.MIXIN_API_BASEURL}collectibles/outputs?members=${hashMembers(ids)}&threshold=1&state=unspent`, config)
  if (resp.data) {
    return resp.data.data
  }
}

export async function getSignedOutputs(token, ids) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let resp = await axios.get(`${process.env.MIXIN_API_BASEURL}collectibles/outputs?members=${hashMembers(ids)}&threshold=1&state=signed`, config)
  if (resp.data) {
    return resp.data.data
  }
}

export async function getUserID(token) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let resp = await axios.get(`${process.env.MIXIN_API_BASEURL}me`, config)
  if (resp.data) {
    return resp.data.data.user_id
  }
};

export async function getNFTToken(token, id) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let resp = await axios.get(`${process.env.MIXIN_API_BASEURL}collectibles/tokens/${id}`, config)
  if (resp.data) {
    return resp.data.data
  }
};

export async function getFormatedTokens(token, outputs) {
  let l = [];
  for (let i = 0; i < outputs.length; i++) {
    if (outputs[i].token_id) {
      const t = await getNFTToken(token, outputs[i].token_id);
      outputs[i].token_info = t
      l.push(outputs[i]);
    }
  }
  return l;
}

export async function getNFTsByToken(token) {
  const userID = await getUserID(token);
  const outputs = await getOutputs(token, [userID]);
  return await getFormatedTokens(token, outputs);
}

export async function getSignedByToken(token, userID) {
  return await getSignedOutputs(token, [userID]);
}

export async function signTx(token, id) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let resp = await axios.post(`${process.env.MIXIN_API_BASEURL}collectibles/requests/${id}/sign`, {}, config)
  if (resp.data) {
    return resp.data
  }
};

export const hashMembers = (ids) => {
  const key = ids.sort().join('');
  const sha = new JsSHA('SHA3-256', 'TEXT', { encoding: 'UTF8' });
  sha.update(key);
  return sha.getHash('HEX');
};


// Withdrawal
export async function getNFTsFromExplorer(userAddr, provider) {
  if (!userAddr) throw new Error('UserAddr is required');
  if (!provider) throw new Error('Provider is required');
  const fetchTokens = await getTokensFromExplorer(userAddr);
  const filteredTokens = filterTokens(fetchTokens);

  var nfts = [];
  for (let i = 0; i < filteredTokens.length; i++) {
    const contract = new ethers.Contract(filteredTokens[i].contractAddress, ERC721ABI, provider);
    for (let j = 0; j < filteredTokens[i].balance; j++) {

      try {
        const tokenId = await contract.tokenOfOwnerByIndex(userAddr, j);
        const tokenURI = await contract.tokenURI(tokenId);

        // WIP
        // nfts.push(await getNFTByTokenURI(tokenURI));
        // return { contractAddress, tokenId, infoFromTokenUri }

        nfts.push({ address: filteredTokens[i].contractAddress, tokenId:tokenId._hex, collection: { id: '4aa4c030-a293-4979-8252-9fa776134cdb', name: 'CyberCoolApe赛博酷猿' }, token: { id: '1', name: '赛博酷猿96', icon: { url: 'https://trident.ap-south-1.linodeobjects.com/r6rhqicn14nn2gc9h5iudyzt1yz2' } } });
      }catch(error) {
        console.log(error)
        continue;
      }
    }
  }
  return nfts;
}

async function getNFTByTokenURI(tokenURI) {
  const resp = await axios.get(tokenURI);
  return resp.data;
}

async function getTokensFromExplorer(userAddr) {
  const uri = `https://scan.mvm.dev/api?module=account&action=tokenlist&address=${userAddr}`;
  const resp = await axios.get(uri);
  if (resp.data.message === "OK") {
    return resp.data.result
  } else {
    throw new Error(`Failed to fetch token for ${userAddr}`);
  }
}

function filterTokens(tokens) {
  var ERC721 = [];
  tokens.forEach(function (element) {
    if (element.type === 'ERC-721') {
      ERC721.push(element);
    }
  })
  return ERC721;
};