---
order: 2
title: Registry
---

# Registry

## Overview

## Transactions

### `fund-pool`

Fund a specific pool using $KYVE tokens.

```shell
kyved tx registry fund-pool [id] [amount]
```

### `defund-pool`

Defund from a specific pool.

```shell
kyved tx registry defund-pool [id] [amount]
```

### `stake-pool`

Stake in a specific pool using $KYVE tokens.

```shell
kyved tx registry stake-pool [id] [amount]
```

### `unstake-pool`

Unstake from a specific pool.

```shell
kyved tx registry stake-pool [id] [amount]
```

### `delegate-pool`

Delegate to a protocol node in a specific pool using $KYVE tokens.

```shell
kyved tx registry delegate-pool [id] [node] [amount]
```

### `withdraw-pool`

Withdraw your delegation rewards from a protocol node in a specific pool.

```shell
kyved tx registry delegate-pool [id] [node]
```

### `undelegate-pool`

Undelegate from a protocol node in a specific pool.

```shell
kyved tx registry undelegate-pool [id] [node] [amount]
```

### `update-metadata`

Update your protocol node's metadata in a specific pool.

```shell
kyved tx registry update-metadata [id] [commission] [moniker] [website] [logo]
```

## Queries

## Current Configuration
