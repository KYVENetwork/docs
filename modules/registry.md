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
kyved tx registry unstake-pool [id] [amount]
```

### `delegate-pool`

Delegate to a protocol node in a specific pool using $KYVE tokens.

```shell
kyved tx registry delegate-pool [id] [node] [amount]
```

### `withdraw-pool`

Withdraw your delegation rewards from a protocol node in a specific pool.

```shell
kyved tx registry withdraw-pool [id] [node]
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

### `account-funded-list`

Query list of account funded

```shell
kyved query registry account-funded-list [address]
```

### `account-staked-list`

Query list of account staked

```shell
kyved query registry account-staked-list [address]
```

### `account-stakers-delegation-list`

Query account stakers delegation list

```shell
kyved query registry account-stakers-delegation-list [id] [node]
```

### `funders-list`

Query list of pool funders

```shell
kyved query registry funders-list [id]
```

### `funding-amount`

Query amount funding by address

```shell
kyved query registry funding-amount [id] [address]
```

### `list-proposal`

List of all proposal

```shell
kyved query registry list-proposal
```

### `proposal-by-height`

Query proposal by height

```shell
kyved query registry proposal-by-height [pool-id] [height]
```

### `show-pool`

Shows a pool info

```shell
kyved query registry show-pool [id]
```

### `stakers-by-pool-and-delegator`

Query stakers by pool and delegator

```shell
kyved query registry stakers-by-pool-and-delegator [pool-id] [delegator]
```

### `stakers-list`

Query stakers list in a specific pool

```shell
kyved query registry stakers-list [id]
```

### `staking-amount`

Query staking amount

```shell
kyved query registry staking-amount [id] [staker]
```

## Current Configuration
