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

```shell
kyved tx gov submit-proposal create-pool [flags]
```

| Flag Position | Name              | Type     |
|---------------|-------------------|----------|
| 1st           | `name`            | `string` |
| 2nd           | `runtime`         | `string` |
| 3rd           | `logo`            | `string` |
| 4th           | `versions`        | `string` |
| 5th           | `config`          | `string` |
| 6th           | `start_height`    | `uint64` |
| 7th           | `min_bundle_size` | `uint64` |
| 8th           | `operating_cost`  | `uint64` |

### `submit-proposal` (type: `update-pool`)

Update a specific pool in the [registry](/modules/registry.md) module.

```shell
kyved tx gov submit-proposal update-pool [flags]
```

| Flag Position | Name              | Type     |
|---------------|-------------------|----------|
| 1st           | `id`              | `uint64` |
| 2nd           | `name`            | `string` |
| 3rd           | `runtime`         | `string` |
| 4th           | `logo`            | `string` |
| 5th           | `versions`        | `string` |
| 6th           | `config`          | `string` |
| 7th           | `min_bundle_size` | `uint64` |
| 8th           | `operating_cost`  | `uint64` |

### `submit-proposal` (type: `pause-pool`)

Pause a specific pool in the [registry](/modules/registry.md) module.

```shell
kyved tx gov submit-proposal pause-pool [id]
```

### `submit-proposal` (type: `unpause-pool`)

Unpause a specific pool in the [registry](/modules/registry.md) module.

```shell
kyved tx gov submit-proposal unpause-pool [id]
```

## Queries

## Current Configurations
