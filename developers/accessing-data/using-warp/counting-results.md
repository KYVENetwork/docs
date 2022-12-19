---
title: Counting results
order: 5
parent:
  order: 4
---

# Counting Results

Every endpoint returns a count-query. This count query only returns the number of items that would be retrievable with
the set of [filters](./filtering-a-query.md).

**Example: Count the number of transactions in the first 1000 Avalanche Blocks**

Query:

```
query CountTransactionsIn1000AvalancheBlocks {
    countAvalancheTransactions(
        filter: { field: "blockNumber", operator: LTE, value: 1000 }
    )
}
```

Result

```json
{
  "data": {
    "countAvalancheTransactions": 918
  }
}
```
