---
title: Querying multiple sources
order: 6
parent:
  title: Accessing Data
  order: 4
---

# Querying multiple sources

KYVE allows you to query multiple sources at the same time. This requires you to use a special gateway endpoint. The
gateways have special Union queries which unify different results types, meaning that you have access to all results at
the same time. You filter a Union query with the same settings as a standard query. The sources
argument lets you select all the sources you want to apply to this query. It is required to have at least one source
specified.

Example: Query the first blocks from Moonriver and Avalanche On run the following Query:

To do so run the following query:

```
query FirstBlockOnAvalancheAndMoonriver{
    blocks(
        filter: [{ field: "number", value: 1 }]
        sources: [AVALANCHE, MOONRIVER]
    ) {
    ... on AvalancheBlock {
        hash
        number
        __typename
    }
    ... on MoonriverBlock {
        hash
        number
        __typename
        }
    }
}
```

This will return two objects. One MoonriverBlock and one AvalancheBlock:

```json
{
  "data": {
    "blocks": [
      {
        "hash": "0xdcfce25a3318f7e6ac4d5ae7f9f3644e39b2ad411ef218d04ca65fec4a1bf737",
        "number": 1,
        "__typename": "AvalancheBlock"
      },
      {
        "hash": "0x250a4c3fc44c89a508adb59137a4936b59655288d5eaea33727c6dbed0733d64",
        "number": 1,
        "__typename": "MoonriverBlock"
      }
    ]
  }
}
```
