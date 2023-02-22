---
sidebar_position: 4
---

# General concepts

As outlined above a bundle needs to undergo many steps until it can be deemed valid. Since the diagram only shows a high level overview more details can be found below.

## Uploader selection

On every round there has to be a single uploader, the rest of the protocol nodes are assigned to role of "validator". Since rewards are only payed out to nodes who successfully proposed valid bundle the uploader selection is critical and has to be calculated fairly for every participant.

KYVE came up with the solution of making a weighted, pseudo random selection. Here, the weight is the total delegation a node has in that pool. There more delegation a node has (either self-delegated or from foreign users), the more likely it is that the node gets selected as the uploader for the next round. We simply call that `next_uploader` which actually already gets calculated right after the current round is done.

The seed to make the weighted random selection is derived from the current `app hash` of the blockchain state. This makes it impossible to predict the seed before the actual block is mined. As soon as the block is then mined all chain node participants come to the same hash and therefore to the same seed, therefore making the weighted selection on-chain and secure.

The probability of a node getting selected as the next uploader each round can be calculated the following way:

$$\begin{aligned}
p_i = \frac{d_i}{\sum_{k=1}^{n} d_k}
\end{aligned}$$

where

- $p_i$ = `is the probability of the i-th node to get selected each round as next uploader`
- $d_i$ = `is the total delegation of i-th node`
- $n$ = `is the number of validators in pool`

## Vote tallying

To finally determine if a bundle is valid or not the votes from all the node validators have to be collected and tallied. For that we track the `voting power` of each node. The voting power is exactly the same like the probability calculated above, the more delegation you have the more voting power you have. 

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

## Uploader Reward calculation

To incentivize protocol nodes to stay online and continue uploading and validating data nodes receive a reward in $KYVE for every valid bundle proposed. The reward depends on two main parameters, the `operating_cost` which is stored per pool and the `storage_cost` which is stored as a module param and used for every pool. The operating cost covers all fixed costs a node has including server operating costs, $KYVE transaction fees and other fixed costs. The storage cost covers all variable costs which mainly covers the cost of storing the bundle proposals on a web3 provider like Arweave. With this information the reward can be calculated as follows:

$$\begin{aligned}
r = operating\_cost + data\_size \cdot storage\_cost
\end{aligned}$$

where

- $r$ = `is the reward for a valid bundle in ukyve`
- $operating\_cost$ = `the fixed base reward per pool in ukyve`
- $data\_size$ = `the amount of bytes in bundle proposal`
- $storage\_cost$ = `the reward per byte in ukyve`

## Delegation reward calculation

Since it is possible that users can delegate into protocol nodes a mechanism had to be implemented on how to distribute those rewards between the node operator and the remaining delegators. For that we treat the stake of the node operator as a normal delegation. In this case we call this *self-delegation*. Furthermore, each node operator can choose a *commission* which is a percentage of how much of the reward will directly go to the node operator. The remaining rewards will then be distributed according to the [F1-Fee distribution](https://drops.dagstuhl.de/opus/volltexte/2020/11974/pdf/OASIcs-Tokenomics-2019-10.pdf) between all delegators **including** the self-delegation of the node operator.

This means that the node operator always has to sources of income, the commission rewards and the delegation rewards from his self delegation. But the commission has to be chosen carefully, setting it too high would discourage delegators from delegating to your node resulting in less rewards (see uploader selection) and setting it too low would maybe result in running at a loss.

## Slashing

To discourage and punish malicious behaviour protocol nodes can get slashed and therefore loose a part of their delegation. There are three types of slashings which can occur with different levels of severity:

- **Timeout slash (0.05%)**: applied if the node operator misses more than 24 bundle rounds (approx. 1h)
- **Vote slash (2%)**: applied if the node voted incorrect (e.g. voted valid although the bundle was invalid etc.)
- **Upload slash (5%)**: applied if the proposed bundle from the uploader was found invalid