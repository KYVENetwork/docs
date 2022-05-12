# Counting Results

Every endpoint returns a count-query. This count query only returns the number of items that would be retrievable with
the set of . Example: Count the number of transactions in the first 1000 Avalanche Blocks

Query:

```
query CountTransactionsIn1000AvalancheBlocks {
countAvalancheTransactions(
filter: { field: "blockNumber", operator: LTE, value: 1000 }
)
}
Result
{
"data": {
"countAvalancheTransactions": 918
}
}
```
