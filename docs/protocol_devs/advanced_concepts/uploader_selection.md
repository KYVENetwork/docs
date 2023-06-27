---
sidebar_position: 3
---

# Uploader Selection

## Introduction

On every round there has to be a single uploader, the rest of the protocol validators are assigned to role of "validator". Since rewards are only payed out to nodes who successfully proposed valid bundle the uploader selection is critical and has to be calculated fairly for every participant.

## Weighted Round Robin Uploader Selection

For the uploader selection a weighted round robin selection is used, the algorithm is described
[here](https://learnblockchain.cn/docs/tendermint/spec/reactors/consensus/proposer-selection.html).

Our implementation additionally has the option of temporarily skipping participants for single rounds which
is the case if participants vote abstain. They do not advance in the round-robin progress and can not be
selected as an uploader.

The frequencies of uploader selection with respect to the excluded ones can be described as follows.

Let $R$ denote the number of total rounds and $r$ the index of the current round.
Let $N$ denote the number of total validators and $n$ the index of the n-th validator.

The stake (+ delegation) of each validator for each round is given by
$s(n, r)$

Then the total stake for round r is given by

$S(r) = \sum_{i=1}^N s(i, r)$

Ignoring the existing progress, the likeliness of being selected in the next round is given by

$p(n, r) = s(n, r) / S(r)$

Using this value one can obtain the frequencies for uploader selection over all rounds, which is

$P(n) = 1/R * \sum_{r=1}^R p(n, r)$

Except for rounding errors $P(n)$ is independent from $R$ if $p(n, r)$ is constant.

If validator $i$ is excluded for round $k$, this is denoted by $s(i, k) = 0$. So in general $S(r)$ is
dependent on validator exclusions and validators set changes.
