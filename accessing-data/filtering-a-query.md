---
title: Filtering a Query
order: 2
parent:
    title: Accessing Data
    order: 4
---

# Filtering a Query
To create more complex queries, you can make use of Filters. A Filter consists of 4 parts:

1. **Field**: The field name you want to filter on. You can use any string. If you are going to filter on a sub-field, use a double underscore to select it.
2. **Value**: A value to filter for. You can use any type for a given field name.
3. **Operator** (optional): Operators allow you to add more selection to your filter.
4. **Combinator** (optional): You can combine multiple filters with a combinator.

## Operators
An operator allows the user to apply a specific operation to filter. Allowed values are:
Operation
Description
ALL
Every item in the list of values provided is in an array
CONTAINS
String field contains value
ENDS_WITH
String field ends with value
EXISTS
Value for field exists
GT
Greater than
GTE
Greater than or equal to
IN
Value is in the list (a list of values should be provided)
LT
Less than
LTE
Less than or equal to
NE
Not equal to
NIN
Value is not in the list (a list of values should be provided)
REGEX
String field match by regex
SIZE
The size of the array is
STARTS_WITH
String field starts with value

## Combinator
Possible values are AND and OR. A combinator always combines the previous filter with the current one.

#### Example:
_Select all objects where the field 'hash' starts with “0xa” and the field 'number' is less than 1000_
```
filter: [
    { field: "hash", operator: STARTS_WITH, value: "0xa" }
    { field: "number", operator: LT, value: 1000, combinator: AND }
]
```
