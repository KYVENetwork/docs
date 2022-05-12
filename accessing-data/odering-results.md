# Ordering results

To order query results, you can specify a list of field names. Use + or - for ascending or descending order. The default
is ascending. This will overwrite default ordering. 

Example: Order Blocks by difficulty

```
query OrderedAvalancheBlocks {
    avalancheBlocks(orderBy: ["difficulty"]) {
        hash
        number
        difficulty
    }
}
```
