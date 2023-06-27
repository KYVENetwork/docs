---
sidebar_position: 3
---

# Uploader Selection

## Introduction

On every round there has to be a single uploader, the rest of the protocol validators are assigned to role of "validator". Since rewards are only payed out to nodes who successfully proposed valid bundle the uploader selection is critical and has to be calculated fairly for every participant.

## Weighted Round Robin Uploader Selection

For the selection two requirements are important:

### Determinism

All consensus nodes should come to the same conclusion on who should be the next uploader
on the protocol. Given a validator set `V`, and two honest validators `p` and `q`, for each bundle round
`r` the following should be given:

$$
\begin{aligned}
uploader_p(r) = uploader_q(r)
\end{aligned}
$$

### Fairness

The frequency of the uploader selection should match with the voting power of that validator. Let $R$ denote the number of total rounds and $r$ the index of the current round.
Let $N$ denote the number of total validators and $n$ the index of the n-th validator.

The stake (+ delegation) of each validator for each round is given by
$s(n, r)$

Then the total stake for round r is given by

$S(r) = \sum_{i=1}^N s(i, r)$

With that the voting power $VP$ can be determined by

$VP(n, r) = s(n, r) / S(r)$

Ignoring the existing progress, the likeliness of being selected in the next round is given by

$p(n, r) = s(n, r) / S(r)$

Using this value one can obtain the frequencies for uploader selection over all rounds, which is

$P(n) = 1/R * \sum_{r=1}^R p(n, r)$

### Algorithm

The fundamental principle underlying the uploader selection procedure involves the utilization of a weighted round-robin algorithm.

An illustrative model that provides a clear understanding of how and why the selection algorithm operates fairly is analogous to that of a priority queue. Within this queue, validators progress based on their respective voting power, where validators with higher voting power move towards the front of the queue at a faster rate. When the algorithm is executed, the following steps occur:

1. All validators advance in the queue in proportion to their voting powers: Each validator's priority is increased by their corresponding voting power.
2. The first validator in the queue is designated as the uploader: The validator with the highest priority is selected as the uploader.
3. The uploader is then moved back in the queue: The proposer's priority is decreased by the total voting power of all validators.

#### Stable Validator Set

Given the validator set:

| Validator | v1  | v2  |
| --------- | --- | --- |
| VP        | 1   | 3   |

Provided that no validator undergoes any changes, the table below presents the computation of proposer priorities across multiple iterations. The table displays four consecutive runs of the selection procedure, with the computation of values continuing from the 5th run onwards. Each row exhibits the priority queue and the position of the respective validators within it. The proposer, identified as the rightmost validator closest to the head, is determined based on its proximity to the front of the queue. As priorities are updated, validators shift towards the right in the queue. Conversely, the proposer moves towards the left as its priority decreases following the election.

| Rounds  | -2  | -1  | 0     | 1   | 2     | 3   | 4   | 5   | Uploader |
| ------- | --- | --- | ----- | --- | ----- | --- | --- | --- | -------- |
| init    |     |     | v1,v2 |     |       |     |     |     |          |
| round 1 |     |     |       | v1  |       | v2  |     |     | v2       |
|         |     | v2  |       | v1  |       |     |     |     |          |
| round 2 |     |     |       |     | v1,v2 |     |     |     | v1       |
|         | v1  |     |       |     | v2    |     |     |     |          |
| round 3 |     | v1  |       |     |       |     |     | v2  | v2       |
|         |     | v1  |       | v2  |       |     |     |     |          |

#### Changing Validator Set

Between proposer selection runs the validator set may change. Some changes have implications on the proposer election.

##### Voting Power Change

Now we take the example above and assume that the voting power of v1 changed from 1 to 4.

| Validator | v1  | v2  |
| --------- | --- | --- |
| VP        | 4   | 3   |

We continue from the last round and update the voting power accordingly:

| Rounds     | -2  | -1  | 0   | 1   | 2   | 3   | 4   | 5   | Uploader |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- | -------- |
| last state |     | v2  |     | v1  |     |     |     |     |          |
| round 4    |     |     |     |     | v2  |     |     | v1  | v1       |
|            | v1  |     |     |     | v2  |     |     |     |          |

Nevertheless, in situations where a validator transitions from a high voting power to a lower value, certain other validators are compelled to remain significantly distant in the queue for an extended period. This specific scenario is revisited and explored further within the "Proposer Priority Range" section.
