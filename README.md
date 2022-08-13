# MVG

https://mvg.finance 

A bridge for MVM Mainnet.

## Features

- Asset bridge

- NFT bridge

## How it works

### For Tokens

#### Deposit 

1. from Mixin Mainnet

Transfer to proxy mainnet user.

2. from Other Network

Deposit to proxy mainnet user. 

#### Withdrawal

1. to Mixin Mainnet

For assets other than ETH, Call the `asset` contract's `transferWithExtra` method with extra constructed by MVM's `/extra` API.

For ETH, Call the `bridge` contract's `release` method.

2. to Other Network

Used a proxy service that automatically swaps the user's withdrawal asset to the fee asset. And do the withdrawal process when the swap is completed.

### For NFTs

#### Deposit

1. from Mixin Mainnet

OAuth user first, filter UTXO through [Mixin API](https://developers.mixin.one/docs/api/collectibles/outputs) with user's token, get each token information by [API](https://developers.mixin.one/docs/api/collectibles/outputs#get-collectiblestokensuuid).

When depositing, selected token is an object contains [token](https://developers.mixin.one/docs/api/collectibles/outputs#get-collectiblestokensuuid) and [output](https://developers.mixin.one/docs/api/collectibles/outputs), these two will be used for creating a collectible request. After calling the `createCollectibleRequest` function, a `code_id` would be generated for user to pay. Then loop output with parameter `state=signed`, when `output_id` found, send raw tx to mainnet. The deposit is complete.

#### Withdrawal

1. to Mixin Mainnet

Get user tokens from https://scan.mvm.dev API, filter ERC721 tokens, get tokenURI from contract, display token image. 

When withdrawing, selected token is an object contains `tokenId`, `contractAddress` and token info fetched from tokenURI. `contractAddress` will be used to initialize contract instance. call `safeTransferFrom(address,address,uint256,bytes)` to withdraw NFT. The fourth argument `_data` is constructed by user's mixin proxy contract address + mixinExtra generated through `/extra` API.

## Structure

### bridge
```
File: /pages/index.vue

Route: /

Main page of the bridge.
```
### toolbox
```
File: /pages/toolbox.vue

Route: /toolbox

Toolbox for developers.
```

## WIP

1. mvg.finance/nft
