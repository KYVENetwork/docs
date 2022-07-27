---
title: Basic Queries
order: 2
parent:
  title: Accessing Data
  order: 4
---

# Basic Queries

Learn how to query web3 data in your website or application. All endpoints use the same argument structure with a Filter and a Pagination-Type. The Filter allows you to run complex queries while the Pagination enables you to set the amount of data you want to have in return
and improves performance by limiting results.

## Basic Query - Getting the first Avalanche Block

You can find the endpoint for Avalanche data [here](./well-known-endpoints.md).

The endpoints host GraphiQL playgrounds that allow you to try out GraphQL queries. For example, let's copy and paste the following query to get an Avalanche block into the playground:

```
query FirstAvalancheBlock {
    avalancheBlocks(
        filter: [
            { field: "number", value: 1 }
        ]
    ) {
    hash
    number
    }
}
```

![graphql](/graphql-kyve-avalanche.gif)

This will result in

```json
{
  "data": {
    "avalancheBlocks": [
      {
        "hash": "0xdcfce25a3318f7e6ac4d5ae7f9f3644e39b2ad411ef218d04ca65fec4a1bf737",
        "number": 1
      }
    ]
  }
}
```
