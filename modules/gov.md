---
order: 1
title: Gov
---

# Gov

The `gov` module enables on-chain governance, which allows KYVE token holders to participate in a community led decision-making process.

## Overview

## Transactions

### `submit-proposal` (type: `create-pool`)

Create a new pool in the [registry](/modules/registry.md) module.

```
kyved tx gov submit-proposal create-pool [flags]
```

### `submit-proposal` (type: `spend-treasury`)

Transfer assets from the [treasury](/modules/treasury.md) module to any recipient.

```
kyved tx gov submit-proposal spend-treasury [recipient] [amount] [flags]
```

| Name        | Type                                                                       | Description | Example     |
| ----------- | -------------------------------------------------------------------------- | ----------- | ----------- |
| `Recipient` | `string`                                                                   |             | `"kyve..."` |
| `Amount`    | [`sdk.Coins`](https://pkg.go.dev/github.com/cosmos/cosmos-sdk/types#Coins) |             | `"100kyve"` |

### `submit-proposal` (type: `update-pool`)

Update any setting of a specific pool in the [registry](/modules/registry.md) module.

```
kyved tx gov submit-proposal update-pool [flags]
```

<!-- TODO: Add descriptions. -->

| Flag Position | Name            | Type     | Description  |
| ------------- | --------------- | -------- | ------------ |
| 1st           | `Id`            | `uint64` | The pool ID. |
| 2nd           | `BundleDelay`   | `uint64` |              |
| 3rd           | `Config`        | `string` |              |
| 4th           | `Logo`          | `string` |              |
| 5th           | `Name`          | `string` |              |
| 6th           | `OperatingCost` | `uint64` |              |
| 7th           | `Runtime`       | `string` |              |
| 8th           | `StorageCost`   | `uint64` |              |
| 9th           | `Versions`      | `string` |              |

## Queries

## Current Configurations
