# MVG

https://mvg.finance 

A bridge for MVM Mainnet.

## Features

- Deposit from any network supported by Mixin Mainnet

- Withdrawal to any network supported by Mixin Mainnet

## How it works

### Deposit 

1. from Mixin Mainnet

Transfer to proxy mainnet user.

2. from Other Network

Deposit to proxy mainnet user. 

### Withdrawal

1. to Mixin Mainnet

For assets other than XIN, Call the `asset` contract's `transferWithExtra` method with extra constructed by MVM's `/extra` API.

For XIN, Call the `bridge` contract's `release` method.

2. to Other Network

Used a proxy service that automatically swaps the user's withdrawal asset to the fee asset. And do the withdrawal process when the swap is completed.


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
