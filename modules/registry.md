---
order: 1
title: Registry
---

# Registry

## Overview

## Transactions

### `create-pool`

Create a new storage pool.

```
kyved tx registry create-pool [flags]
```

### `fund-pool`

Fund a specific pool using $KYVE tokens.

```
kyved tx registry fund-pool [pool-id] [amount]
```

### `stake-pool`

Stake in a specific pool using $KYVE tokens.

```
kyved tx registry stake-pool [pool-id] [amount]
```

## Queries

### `pools`

Query all pools.

```
kyved query registry pools
```

Alternatively, you can query using a valid RPC endpoint.

```
https://api.node.kyve.network/kyve/registry/pools
```

### `pool`

Query details of a specific pool.

```
kyved query registry pool [pool-id]
```

Alternatively, you can query using a valid RPC endpoint.

```
https://api.node.kyve.network/kyve/registry/pool/<pool-id>
```

## Current Configuration
