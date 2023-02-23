---
sidebar_position: 3
---

# Vote Tallying

## Introduction

To finally determine if a bundle is valid or not the votes from all the node validators have to be collected and tallied. For that we track the `voting power` of each node. For every vote type (valid, invalid, abstain) the voting power is summed up and tallied at the end. If for example more than 50% of the voting power was dedicated to valid the bundle proposal will pass as valid. On the other hand if more than 50% of the voting power was dedicated to invalid the bundle proposal will be rejected as invalid. If neither of those requirements are met the bundle gets dropped since not enough validators participated in the validation process.

## Calculation

The voting power is exactly the same like the probability calculated above, the more delegation you have the more voting power you have.

$$\begin{aligned}
v_i = \frac{d_i}{\sum_{k=1}^{n} d_k}
\end{aligned}$$

where

- $v_i$ = `is the voting power of i-th node`
- $d_i$ = `is the total delegation of i-th node`
- $n$ = `is the number of validators in pool`

This implies that the total voting power inside a pool should always add up to 100%. In order to tally votes for the final status the voting power of the nodes are summed up based on their vote. Then the final result can be calculated based on the requirements below:

- **valid**: > 50% voted with valid
- **invalid**: >= 50% voted with invalid
- **dropped**: if neither of the above requirements are met
