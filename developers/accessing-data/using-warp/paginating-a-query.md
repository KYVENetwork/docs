---
title: Paginating a Query
order: 3
parent:
  order: 4
---

# Paginating a Query

To limit the number of results, you can use pagination. Use the pageSize parameter to limit the number of results and
use the Page parameter to select the page you want to query for. The default pageSize is 10.

Example: Retrieving 5 results

```gql
query First5AvalancheBlocks {
  avalancheBlocks(pagination: { page: 0, pageSize: 5 }) {
    hash
    number
  }
}
```

Result

```json
{
  "data": {
    "avalancheBlocks": [
      {
        "hash": "0x31ced5b9beb7f8782b014660da0cb18cc409f121f408186886e1ca3e8eeca96b",
        "number": 0
      },
      {
        "hash": "0xdcfce25a3318f7e6ac4d5ae7f9f3644e39b2ad411ef218d04ca65fec4a1bf737",
        "number": 1
      },
      {
        "hash": "0x832d637c4f0df5189e51e160dc20857e11b40375dd9981e31335d8e00beed9e1",
        "number": 2
      },
      {
        "hash": "0x8ed9db83d1b77047a7b521bfa9fd55010b998aa2bc46f0988ef3cf7ff70a6145",
        "number": 3
      },
      {
        "hash": "0x10e75a497e4e0bfece689dd6592b25ec1ffc246af07be8b806155dfc8076173a",
        "number": 4
      }
    ]
  }
}
```
