---
sidebar_position: 2
---

# Uploader Selection

## Introduction

On every round there has to be a single uploader, the rest of the protocol nodes are assigned to role of "validator". Since rewards are only payed out to nodes who successfully proposed valid bundle the uploader selection is critical and has to be calculated fairly for every participant.

KYVE came up with the solution of making a weighted, pseudo random selection. Here, the weight is the total delegation a node has in that pool. There more delegation a node has (either self-delegated or from foreign users), the more likely it is that the node gets selected as the uploader for the next round. We simply call that `next_uploader` which actually already gets calculated right after the current round is done.

The seed to make the weighted random selection is derived from the current `app hash` of the blockchain state. This makes it impossible to predict the seed before the actual block is mined. As soon as the block is then mined all chain node participants come to the same hash and therefore to the same seed, therefore making the weighted selection on-chain and secure.

It is important to point out that not everyone by default qualifies for the uploader selection. Only nodes who have either voted _valid_ or _invalid_ are taking into account for the selection. Nodes who have voted with _abstain_ or did not vote at all are not considered. This ensures that nodes are incentivized to take the risk of voting either _valid_ or _invalid_, otherwise nodes would just vote with abstain, since then they won't face the risk of receiving a vote slash.

## Calculation

The probability of a node getting selected as the next uploader each round can be calculated the following way:

$$
\begin{aligned}
p_i = \frac{d_i}{\sum_{k=1}^{n} d_k}
\end{aligned}
$$

where

- $p_i$ = `is the probability of the i-th node to get selected each round as next uploader`
- $d_i$ = `is the total delegation of i-th node`
- $n$ = `is the number of nodes in the pool who have voted valid or invalid`
