import axios from 'axios';
import JsSHA from 'jssha';

export async function getOutputs(token, ids) {
  let config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let resp = await axios.get(`${process.env.MIXIN_API_BASEURL}collectibles/outputs?members=${hashMembers(ids)}&threshold=1&state=unspent`, config)
  if (resp.data){
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
  if (resp.data){
    return resp.data.data
  }
}

export async function getUserID(token){
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

export async function getNFTToken(token, id){
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

export async function signTx(token, id){
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