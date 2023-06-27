---
sidebar_position: 3
---

# Uploader Selection

## Introduction

On every round there has to be a single uploader, the rest of the protocol validators are assigned to role of "validator". Since rewards are only payed out to nodes who successfully proposed valid bundle the uploader selection is critical and has to be calculated fairly for every participant.

## Weighted Round Robin Uploader Selection

This round robin implementation closely follows the Tendermint round robin implementation described [here](https://learnblockchain.cn/docs/tendermint/spec/reactors/consensus/proposer-selection.html#requirements-for-proposer-selection)

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

Simple Algorithm in Pseudo Code

```
def UploaderSelection (vset):
  // compute priorities and elect uploader
  for each validator i in vset:
      A(i) += VP(i)

  uploader = max(A)
  A(uploader) -= P
```

#### Stable Validator Set

Given the validator set:

| Validator | v1  | v2  |
| --------- | --- | --- |
| VP        | 1   | 3   |

Provided that no validator undergoes any changes, the table below presents the computation of proposer priorities across multiple iterations. The table displays four consecutive runs of the selection procedure, with the computation of values continuing from the 5th run onwards. Each row exhibits the priority queue and the position of the respective validators within it. The proposer, identified as the rightmost validator closest to the head, is determined based on its proximity to the front of the queue. As priorities are updated, validators shift towards the right in the queue. Conversely, the proposer moves towards the left as its priority decreases following the election.

| Rounds  | -2  | -1  | 0     | 1   | 2     | 3   | 4   | 5   | Algorithm   | Uploader |
| ------- | --- | --- | ----- | --- | ----- | --- | --- | --- | ----------- | -------- |
| init    |     |     | v1,v2 |     |       |     |     |     | Init to 0   |          |
| round 1 |     |     |       | v1  |       | v2  |     |     | A(i)+=VP(i) | v2       |
|         |     | v2  |       | v1  |       |     |     |     | A(v2)-= P   |          |
| round 2 |     |     |       |     | v1,v2 |     |     |     | A(i)+=VP(i) | v1       |
|         | v1  |     |       |     | v2    |     |     |     | A(v1)-= P   |          |
| round 3 |     | v1  |       |     |       |     |     | v2  | A(i)+=VP(i) | v2       |
|         |     | v1  |       | v2  |       |     |     |     | A(v2)-= P   |          |

#### Changing Validator Set

Between proposer selection runs the validator set may change. Some changes have implications on the proposer election.

##### Voting Power Change

Now we take the example above and assume that the voting power of v1 changed from 1 to 4.

| Validator | v1  | v2  |
| --------- | --- | --- |
| VP        | 4   | 3   |

We continue from the last round and update the voting power accordingly:

| Rounds     | -2  | -1  | 0   | 1   | 2   | 3   | 4   | 5   | Algorithm     | Uploader |
| ---------- | --- | --- | --- | --- | --- | --- | --- | --- | ------------- | -------- |
| last state |     | v2  |     | v1  |     |     |     |     | update VP(v1) |          |
| round 4    |     |     |     |     | v2  |     |     | v1  | A(i)+=VP(i)   | v1       |
|            | v1  |     |     |     | v2  |     |     |     | A(v1)-= P     |          |

Nevertheless, in situations where a validator transitions from a high voting power to a lower value, certain other validators are compelled to remain significantly distant in the queue for an extended period. This specific scenario is revisited and explored further within the "Proposer Priority Range" section.

##### Validator Removal

Consider a new example with set:

| Validator | v1  | v2  | v3  |
| --------- | --- | --- | --- |
| VP        | 1   | 2   | 3   |

Suppose that following the previous run, the uploader priorities were distributed as depicted in the first row, with a total sum of 0. Upon the removal of v2, by the conclusion of the subsequent uploader selection run (penultimate row), the sum of priorities becomes -2 (subtracting the priority of the removed process).

Under normal circumstances, the procedure could proceed without any modifications. However, if a significant number of alterations occur within the validator set, the priority values may gradually gravitate towards the maximum or minimum permissible values, leading to truncation issues caused by overflow detection. To address this concern, the selection procedure incorporates an additional step that centers the current priority values, ensuring that the sum of priorities remains in close proximity to 0.

| Rounds   | -3  | -2  | -1  | 0   | 1   | 2   | 3   | 4   | Algorithm             | Uploader |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- | --------------------- | -------- |
| state    | v3  |     |     |     | v1  | v2  |     |     |                       |          |
|          | v3  |     |     |     | v1  |     |     |     | remove v2             |          |
| new step |     | v3  |     |     |     | v1  |     |     | A(i) -= avg, avg = -1 |          |
| round 4  |     |     |     |     | v3  |     | v1  |     | A(i)+=VP(i)           | v1       |
|          |     |     | v1  |     | v3  |     |     |     | A(v1)-= P             |          |

With this, the modified pseudo algorithm looks like:

```
def UploaderSelection (vset):

  // center priorities around zero
  avg = sum(A(i) for i in vset)/len(vset)
  for each validator i in vset:
      A(i) -= avg

  // compute priorities and elect uploader
  for each validator i in vset:
      A(i) += VP(i)

  uploader = max(A)
  A(uploader) -= P
```

##### New Validator

When a new validator is introduced, a similar predicament arises as described for validator removal, wherein the sum of priorities within the new validator set deviates from zero. However, this issue is mitigated through the implementation of the aforementioned centering step.

Another concern that necessitates attention is as follows: After a validator, denoted as V, has been elected, it is moved to the end of the queue. In cases where the validator set is sizable and/or other validators possess significantly higher voting power, V may need to wait through numerous runs before being elected again. If V were to remove itself from the set and subsequently rejoin, it would experience a substantial (albeit unfair) "leap" forward in the queue.

To prevent such occurrences, when a new validator is added, its initial priority is designated as follows:

```
A(V) = -1.125 * P
```

where P is the total voting power of the set including V. Curent implementation uses the penalty factor of 1.125 because it provides a small punishment that is efficient to calculate.

##### Proposer Priority Range

The implementation of the centering step gives rise to intriguing scenarios. Particularly, low-power validators that join a set containing high-power validator(s) gain an advantage from subsequent additions to the set. This advantage stems from the fact that these early validators undergo a greater number of right shift operations during the centering process, which in turn boosts their priority.

In order to prevent these types of scenarios, the selection algorithm performs scaling of priorities such that the difference between min and max values is smaller than two times the total voting power.

The modified selection algorithm is:

```
def UploaderSelection (vset):

  // scale the priority values
  diff = max(A)-min(A)
  threshold = 2 * P
  if  diff > threshold:
      scale = diff/threshold
      for each validator i in vset:
        A(i) = A(i)/scale

  // center priorities around zero
  avg = sum(A(i) for i in vset)/len(vset)
  for each validator i in vset:
      A(i) -= avg

  // compute priorities and elect uploader
  for each validator i in vset:
      A(i) += VP(i)

  uploader = max(A)
  A(uploader) -= P
```

Note also that even during steady state the priority range may increase beyond 2 \* P. The scaling introduced here helps to keep the range bounded

##### Skipping rounds

Because validators who vote abstain should not be selected as the next uploader they skip rounds everytime they do that
so they don't advance in the queue.
