---
order: 2
title: SDK
---

# Registry

## Overview

## Transactions

### `fund-pool`

Fund a specific pool using $KYVE tokens.

#### Required parameters

| Name   | Type        | Description                                          | Example |
| ------ | ----------- | ---------------------------------------------------- | ------- |
| id     | _`string`_  | the `id` of the pool which should be funded          | "0"     |
| amount | _`integer`_ | the `amount` of `$KYVE` that should you want to fund | 100     |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry fund-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
fundPool({ id: '0', amount: 100 });
```

</template>
</CodeSwitcher>

### `defund-pool`

Defund from a specific pool.

#### Required parameters

| Name   | Type        | Description                                            | Example |
| ------ | ----------- | ------------------------------------------------------ | ------- |
| id     | _`string`_  | the `id` of the pool where should be defunded          | "0"     |
| amount | _`integer`_ | the `amount` of `$KYVE` that should you want to defund | 100     |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry defund-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
defundPool({ id: '0', amount: 100 });
```

</template>
</CodeSwitcher>

### `stake-pool`

Stake in a specific pool using $KYVE tokens.

#### Required parameters

| Name   | Type        | Description                                  | Example |
| ------ | ----------- | -------------------------------------------- | ------- |
| id     | _`uint64`_  | the `id` of the pool where you want to stake | "0"     |
| amount | _`integer`_ | the `amount` of `$KYVE` you want to stake    | 100     |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry stake-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
stakePool({ id: '0', amount: 100 });
```

</template>
</CodeSwitcher>

### `unstake-pool`

Unstake from a specific pool.

#### Required parameters

| Name   | Type        | Description                                    | Example |
| ------ | ----------- | ---------------------------------------------- | ------- |
| id     | _`uint64`_  | the `id` of the pool where you want to unstake | "0"     |
| amount | _`integer`_ | the `amount` of `$KYVE` you want to unstake    | 100     |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry unstake-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
unstakePool({ id: '0', amount: 100 });
```

</template>
</CodeSwitcher>

### `delegate-pool`

Delegate to a protocol node in a specific pool using $KYVE tokens.

#### Required parameters

| Name   | Type        | Description                                     | Example     |
| ------ | ----------- | ----------------------------------------------- | ----------- |
| id     | _`uint64`_  | the `id` of the pool where you want to delegate | "0"         |
| node   | _`string`_  | the protocol `node` where you want to delegate  | "kyve1x..." |
| amount | _`integer`_ | the `amount` of `$KYVE` you want to delegate    | 100         |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry delegate-pool [id] [node] [amount]
```

</template>
<template v-slot:sdk>

```js
delegatePool({ id: '0', node: 'kyve1x...', amount: 100 });
```

</template>
</CodeSwitcher>

### `withdraw-pool`

Withdraw your delegation rewards from a protocol node in a specific pool.

#### Required parameters

| Name | Type       | Description                                     | Example     |
| ---- | ---------- | ----------------------------------------------- | ----------- |
| id   | _`uint64`_ | the `id` of the pool where you want to delegate | "0"         |
| node | _`string`_ | the protocol `node` where you want to delegate  | "kyve1x..." |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry withdraw-pool [id] [node]
```

</template>
<template v-slot:sdk>

```js
withdrawPool({ id: '0', node: 'kyve1x...' });
```

</template>
</CodeSwitcher>

### `undelegate-pool`

Undelegate from a protocol node in a specific pool using $KYVE tokens.

#### Required parameters

| Name   | Type        | Description                                       | Example     |
| ------ | ----------- | ------------------------------------------------- | ----------- |
| id     | _`uint64`_  | the `id` of the pool where you want to undelegate | "0"         |
| node   | _`string`_  | the protocol `node` where you want to undelegate  | "kyve1x..." |
| amount | _`integer`_ | the `amount` of `$KYVE` you want to undelegate    | 100         |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry undelegate-pool [id] [node] [amount]
```

</template>
<template v-slot:sdk>

```js
undelegatePool({ id: '0', node: 'kyve1x...', amount: 100 });
```

</template>
</CodeSwitcher>

### `update-metadata`

Update your protocol node's metadata in a specific pool.

#### Required parameters

| Name       | Type       | Description                                                     | Example     |
| ---------- | ---------- | --------------------------------------------------------------- | ----------- |
| id         | _`uint64`_ | the `id` of the protocol node which metadata you want to update | "0"         |
| commission | _`string`_ |                                                                 | "kyve1x..." |
| moniker    | _`string`_ |                                                                 | 100         |
| website    | _`string`_ |                                                                 | 100         |
| logo       | _`string`_ |                                                                 | 100         |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry update-metadata [id] [commission] [moniker] [website] [logo]
```

</template>
<template v-slot:sdk>

```js
updateMetadata({ id: "0", commission:, moniker: '', website: '', logo: '' })
```

</template>
</CodeSwitcher>

## Queries

### `account-funded-list`

Query list of account funded

#### Required parameters

| Name   | Type        | Description                                       | Example     |
| ------ | ----------- | ------------------------------------------------- | ----------- |
| id     | _`uint64`_  | the `id` of the pool where you want to undelegate | "0"         |
| node   | _`string`_  | the protocol `node` where you want to undelegate  | "kyve1x..." |
| amount | _`integer`_ | the `amount` of `$KYVE` you want to undelegate    | 100         |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry account-funded-list [address]
```

</template>
<template v-slot:sdk>

```js
undelegatePool({ id: '0', node: 'kyve1x...', amount: 100 });
```

</template>
</CodeSwitcher>

### `account-staked-list`

Query list of account staked

#### Required parameters

| Name    | Type       | Description      | Example |
| ------- | ---------- | ---------------- | ------- |
| address | _`uint64`_ | the `address` of | "0"     |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry account-staked-list [address]
```

</template>
<template v-slot:sdk>

```js
accountStakedList({ address: '0' });
```

</template>
</CodeSwitcher>

### `account-stakers-delegation-list`

Query account stakers delegation list

#### Required parameters

| Name | Type       | Description                                  | Example     |
| ---- | ---------- | -------------------------------------------- | ----------- |
| id   | _`uint64`_ | the `id` of the pool which you want to query | "0"         |
| node | _`string`_ | the protocol `node` which you want to query  | "kyve1x..." |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry account-stakers-delegation-list [id] [node]
```

</template>
<template v-slot:sdk>

```js
accountStakersDelegationList({ id: '0', node: 'kyve1x...' });
```

</template>
</CodeSwitcher>

### `funders-list`

Query list of pool funders

#### Required parameters

| Name | Type       | Description                                  | Example |
| ---- | ---------- | -------------------------------------------- | ------- |
| id   | _`uint64`_ | the `id` of the pool which you want to query | "0"     |

#### _Optional parameters_

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry funders-list [id]
```

</template>
<template v-slot:sdk>

```js
fundersList({ id: '0' });
```

</template>
</CodeSwitcher>

### `funding-amount`

Query amount funding by address

#### Required parameters

| Name    | Type        | Description                                  | Example |
| ------- | ----------- | -------------------------------------------- | ------- |
| id      | _`uint64`_  | the `id` of the pool which you want to query | "0"     |
| address | _`integer`_ | the `address` of the funder                  | 100     |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry funding-amount [id] [address]
```

</template>
<template v-slot:sdk>

```js
fundingAmount({ id: '0', address: 'kyve1x...' });
```

</template>
</CodeSwitcher>

### `list-proposal`

List of all proposal

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry list-proposal
```

</template>
<template v-slot:sdk>

```js
listProposal({ id: '0', node: 'kyve1x...', amount: 100 });
```

</template>
</CodeSwitcher>

### `proposal-by-height`

Query proposal by height

#### Required parameters

| Name   | Type       | Description                                  | Example     |
| ------ | ---------- | -------------------------------------------- | ----------- |
| poolId | _`uint64`_ | the `id` of the pool which you want to query | "0"         |
| height | _`string`_ | the `height` of blocks                       | "kyve1x..." |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry proposal-by-height [pool-id] [height]
```

</template>
<template v-slot:sdk>

```js
proposalByHeight({ poolId: '0', height: 100 });
```

</template>
</CodeSwitcher>

### `show-pool`

Shows a pool info

#### Required parameters

| Name | Type       | Description                                       | Example |
| ---- | ---------- | ------------------------------------------------- | ------- |
| id   | _`uint64`_ | the `id` of the pool where you want to undelegate | "0"     |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry show-pool [id]
```

</template>
<template v-slot:sdk>

```js
showPool({ id: '0' });
```

</template>
</CodeSwitcher>

### `stakers-by-pool-and-delegator`

Query stakers by pool and delegator

#### Required parameters

| Name      | Type       | Description                                  | Example     |
| --------- | ---------- | -------------------------------------------- | ----------- |
| poolId    | _`uint64`_ | the `id` of the pool which you want to query | "0"         |
| delegator | _`string`_ | the `delegator`                              | "kyve1x..." |

#### _Optional parameters_

| Name | Type                  | Description                                                                                         | Example     |
| ---- | --------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| fee  | _`number`_ _`'auto'`_ | the network fee to process your transaction. You can choose 'auto' option or leave the field empty. | 1 or 'auto' |
| memo | _`string`_            | a free to use string field to take notes for your transaction                                       | "Test"      |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry stakers-by-pool-and-delegator [pool-id] [delegator]
```

</template>
<template v-slot:sdk>

```js
stakersByPoolAndDelegator({ poolId: '0', delegator: 'kyve1x...' });
```

</template>
</CodeSwitcher>

### `stakers-list`

Query stakers list in a specific pool

#### Required parameters

| Name | Type       | Description                                  | Example |
| ---- | ---------- | -------------------------------------------- | ------- |
| id   | _`uint64`_ | the `id` of the pool which you want to query | "0"     |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry stakers-list [id]
```

</template>
<template v-slot:sdk>

```js
stakersList({ id: '0' });
```

</template>
</CodeSwitcher>

### `staking-amount`

Query staking amount

#### Required parameters

| Name   | Type       | Description                                  | Example     |
| ------ | ---------- | -------------------------------------------- | ----------- |
| id     | _`uint64`_ | the `id` of the pool which you want to query | "0"         |
| staker | _`string`_ | the id of the `staker`                       | "kyve1x..." |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved query registry staking-amount [id] [staker]
```

</template>
<template v-slot:sdk>

```js
stakingAmount({ id: '0', staker: 'kyve1x...' });
```

</template>
</CodeSwitcher>

## Current Configuration
