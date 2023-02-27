---
sidebar_position: 3
---

# Vote Tallying

## Introduction

To finally determine if a bundle is valid or not the votes from all the node validators have to be collected and tallied. For that we track the `voting power` of each node. For every vote type (valid, invalid, abstain) the voting power is summed up and tallied at the end. If for example more than 50% of the voting power was dedicated to valid the bundle proposal will pass as valid. On the other hand if more than 50% of the voting power was dedicated to invalid the bundle proposal will be rejected as invalid. If neither of those requirements are met the bundle gets dropped since not enough validators participated in the validation process.

:::danger
**ATTENTION**: This means if a single node has more than 50% of the total delegation in a pool it also has more than 50% voting power. This would imply that this node can act maliciously and always veto honest participants, basically controlling everything. You should never join a pool or delegate if there is a participant with or close to 50% voting power.
:::

## Calculation

The voting power is almost the same like the uploader selection probability defined before, but here **every** node in a pool is taken into account and not only the ones who voted either _valid_ or _invalid_. This implies
that simply having more delegation leads to more voting power.

$$
\begin{aligned}
v_i = \frac{d_i}{\sum_{k=1}^{n} d_k}
\end{aligned}
$$

where

- $v_i$ = `is the voting power of i-th node`
- $d_i$ = `is the total delegation of i-th node`
- $n$ = `is the number of validators in pool`

## Reaching Quorum

This implies that the total voting power inside a pool should always add up to 100%. In order to tally votes for the final status (quorum) the voting power of the nodes are summed up based on their vote. Then quorum (which can have three outcomes) then can be determined based on the requirements below:

- **VALID**: > 50% voting power dedicated to valid
- **INVALID**: >= 50% voting power dedicated to invalid
- **DROPPED**: if neither of the above requirements are met
