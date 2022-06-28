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

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`string`*            | the `id` of the pool which should be funded | "0" |
| amount           | *`integer`*          | the `amount` of `$KYVE` that should you want to fund | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry fund-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
fundPool({id: "0", amount: 100})
```


</template>
</CodeSwitcher>


### `defund-pool`

Defund from a specific pool.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`string`*            | the `id` of the pool where should be defunded | "0" |
| amount           | *`integer`*          | the `amount` of `$KYVE` that should you want to defund | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry defund-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
defundPool({id: "0", amount: 100})
```


</template>
</CodeSwitcher>



### `stake-pool`

Stake in a specific pool using $KYVE tokens.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`uint64`*            | the `id` of the pool where you want to stake | "0" |
| amount           | *`integer`*          | the `amount` of `$KYVE` you want to stake | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry stake-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
stakePool({id: "0", amount: 100})
```


</template>
</CodeSwitcher>


### `unstake-pool`

Unstake from a specific pool.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`uint64`*            | the `id` of the pool where you want to unstake | "0" |
| amount           | *`integer`*          | the `amount` of `$KYVE` you want to unstake | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry unstake-pool [id] [amount]
```

</template>
<template v-slot:sdk>

```js
unstakePool({id: "0", amount: 100})
```


</template>
</CodeSwitcher>


### `delegate-pool`

Delegate to a protocol node in a specific pool using $KYVE tokens.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`uint64`*            | the `id` of the pool where you want to delegate | "0" |
| node           | *`string`*          | the protocol `node` where you want to delegate  | "noderunner" |
| amount           | *`integer`*          | the `amount` of `$KYVE` you want to delegate | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry delegate-pool [id] [node] [amount]
```

</template>
<template v-slot:sdk>

```js
delegatePool({id: "0", node: "noderunner" ,amount: 100})
```


</template>
</CodeSwitcher>

### `withdraw-pool`

Withdraw your delegation rewards from a protocol node in a specific pool.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`uint64`*            | the `id` of the pool where you want to delegate | "0" |
| node           | *`string`*          | the protocol `node` where you want to delegate  | "noderunner" |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry withdraw-pool [id] [node]
```

</template>
<template v-slot:sdk>

```js
withdrawPool({id: "0", node: "noderunner"})
```

</template>
</CodeSwitcher>



### `undelegate-pool`

Undelegate from a protocol node in a specific pool using $KYVE tokens.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`uint64`*            | the `id` of the pool where you want to undelegate | "0" |
| node           | *`string`*          | the protocol `node` where you want to undelegate  | "noderunner" |
| amount           | *`integer`*          | the `amount` of `$KYVE` you want to undelegate | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry undelegate-pool [id] [node] [amount]
```

</template>
<template v-slot:sdk>

```js
undelegatePool({id: "0", node: "noderunner" ,amount: 100})
```
</template>
</CodeSwitcher>

### `update-metadata`

Update your protocol node's metadata in a specific pool.

#### Required parameters

| Name | Type              | Description     | Example|
|---|---|---|---|
| id           | *`uint64`*            | the `id` of the protocol node which metadata you want to update | "0" |
| commission           | *`string`*          |   | "noderunner" |
| moniker           | *`string`*          |  | 100 |
| website           | *`string`*          |  | 100 |
| logo           | *`string`*          |  | 100 |

#### *Optional parameters*

| Name | Type              | Description     | Example|
|---|---|---|---|
| fee           | *`number`* *`'auto'`*          | the network fee to process your transaction. You can choose 'auto' option or leave the field empty.| 1 or 'auto' |
| memo           | *`string`*          | a free to use string field to take notes for your transaction | "Test" |

<CodeSwitcher :languages="{cli:'CLI',sdk:'Node.js'}">
<template v-slot:cli>

```shell
kyved tx registry update-metadata [id] [commission] [moniker] [website] [logo]
```

</template>
<template v-slot:sdk>

```js
updateMetadata({id: "0", commission:, moniker: '', website: '', logo:'' })
```
</template>
</CodeSwitcher>

## Queries

## Current Configuration

