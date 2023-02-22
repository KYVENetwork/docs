---
sidebar_position: 2
---

# How data is stored

Storing data is simple. Storing validated data coming from multiple parties is a bit more complicated. Because of
that, we will break down the process by which KYVE stores it's data.

## Saving data in rounds

Saving many data items or even a data stream is tricky. Thats why we group data into bundles to store them more
efficiently. This enables KYVE to validate multiple data items which are bundled up in a single validation round. With
this method, we can break down a data stream into various rounds, making it easier to work with. A selected validator
will collect data in each round, create a bundle, and submit it to the network. This marks the beginning of such a
proposal round.

In summary, in each proposal round one bundle gets proposed which consists of multiple data items and gets validated by letting other validators check the proposed bundle and vote accordingly. On-chain the votes are tallied and once the result is valid entry of the bundle gets stored on chain as valid. The data is still on the storage provider but the chain has the storage id, thus making it possible to view all the valid storage ids and therefore view the actual content on the storage provider.

## Lifecycle of a bundle proposal

The lifecycle of a bundle proposal can be seen in the following diagram:

<p align="center">
  <img width="70%" src="/img/round_lifecycle.png" />
</p>

## General concepts

As outlined above a bundle needs to undergo many steps until it can be deemed valid. Since the diagram only shows a high level overview more details can be found below.

### Uploader selection

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

### Vote tallying

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

### Uploader Reward calculation

To incentivize protocol nodes to stay online and continue uploading and validating data nodes receive a reward in $KYVE for every valid bundle proposed. The reward depends on two main parameters, the `operating_cost` which is stored per pool and the `storage_cost` which is stored as a module param and used for every pool. The operating cost covers all fixed costs a node has including server operating costs, $KYVE transaction fees and other fixed costs. The storage cost covers all variable costs which mainly covers the cost of storing the bundle proposals on a web3 provider like Arweave. With this information the reward can be calculated as follows:

$$\begin{aligned}
r = operating\_cost + data\_size \cdot storage\_cost
\end{aligned}$$

where

- $r$ = `is the reward for a valid bundle in ukyve`
- $operating\_cost$ = `the fixed base reward per pool in ukyve`
- $data\_size$ = `the amount of bytes in bundle proposal`
- $storage\_cost$ = `the reward per byte in ukyve`

### Delegation reward calculation

Since it is possible that users can delegate into protocol nodes a mechanism had to be implemented on how to distribute those rewards between the node operator and the remaining delegators. For that we treat the stake of the node operator as a normal delegation. In this case we call this *self-delegation*. Furthermore, each node operator can choose a *commission* which is a percentage of how much of the reward will directly go to the node operator. The remaining rewards will then be distributed according to the [F1-Fee distribution](https://drops.dagstuhl.de/opus/volltexte/2020/11974/pdf/OASIcs-Tokenomics-2019-10.pdf) between all delegators **including** the self-delegation of the node operator.

This means that the node operator always has to sources of income, the commission rewards and the delegation rewards from his self delegation. But the commission has to be chosen carefully, setting it too high would discourage delegators from delegating to your node resulting in less rewards (see uploader selection) and setting it too low would maybe result in running at a loss.

### Slashing

To discourage and punish malicious behaviour protocol nodes can get slashed and therefore loose a part of their delegation. There are three types of slashings which can occur with different levels of severity:

- **Timeout slash (0.05%)**: applied if the node operator misses more than 24 bundle rounds (approx. 1h)
- **Vote slash (2%)**: applied if the node voted incorrect (e.g. voted valid although the bundle was invalid etc.)
- **Upload slash (5%)**: applied if the proposed bundle from the uploader was found invalid

### 1. Selecting an uploader for the data bundle

For a bundled proposal round to start, the `next_uploader` has to create a bundle, upload it to Arweave and then
submit it to the network. But first, the next uploader has to be selected. For that, we use a weighted random
selection with the following two factors:

- The personal stake (linear)
- The total delegation into the validator (sqrt)

In detail to calculate the upload probability of a validator, you have to apply the following formula:

- $n$ = `number of validators`
- $S_i$ = `personal stake of i-th validator in $KYVE`
- $D_i$ = `sum of all delegations to the i-th validator in $KYVE`
- $A$ = 10000 (`scaling parameter`)

The upload weight of the i-th validator is then given by

$$w_i = S_i + \sqrt{A \cdot \left(A + D_i\right)} - A$$

which yields the probability

$$p_i = \frac{w_i}{\sum_{k=1}^{n} w_k}$$

The `next_uploader` for each round is selected directly when the new round starts.

### 2. Creating a bundle proposal

Once a node is selected as the `next_uploader`, it will create a bundle proposal that other validators can validate. A
bundle consists of many data items, making it more efficient since storing every data item on Arweave alone would be way
more expensive.

A parameter called `upload_interval` how long the validator has to wait until he can submit his bundle proposal. The
higher this number, the more efficient data is getting archived due to bigger bundles. For live data on another hand it
is recommended to have a rather small upload interval like 60 seconds.

Once enough data has been collected, the data (usually JSON) will be transformed into a buffer to be gzipped, finishing
the bundle for the next round.

### 3. Uploading the bundle to Arweave and submitting it to the network

Now the node can finally upload the bundle to Arweave. In return, it receives the transaction id of the Arweave
transaction.
The node can submit it to the network with this bundle id and other information like the `bundle_size` and
the `byte_size`. For that submission, the method `msg_server_submit_bundle_proposal` is called.

### 4. Validating the bundle

When the new bundle proposal is submitted, the latest round officially starts. The chain will emit an event that all
nodes can listen to. When they see the uploader submitted a new bundle proposal, they will get the bundle id with the
other data and start validating it. They take the `bundle_id`(the Arweave transaction id), download the raw bundle,
unzip it, and parse the bundle to its original JSON format. After that the nodes will perform a simple hash compare. If
the submitted `byte_size` is matching to the node will vote either valid or invalid. For that the node will
call `msg_server_vote_proposal`.

### 5. Finalizing the bundle

After at least > 50% of all nodes (excluding the uploader) have voted _quorum_ has been reached. If that is the case the
uploader of the next round submits his bundle he prepared in the meantime and finalizes the round.

The bundle proposal was accepted and finalized if more than 50% of the validators voted with valid. The chain will save
the bundle id and make it available for the users. As a reward, the uploader of this bundle will receive a bundle
reward.

The reward is calculated in the following:

- $operating\_cost$ = `Minimum fixed bundle reward in $KYVE`
- $storage\_cost$ = `Amount of $KYVE to save 1 Byte on Arweave`
- $byte\_size$ = `The size of the data bundle in bytes`
- $network\_fee$ = `The fee which gets transferred to treasurey`
- $uploader\_commission$ = `The commission the uploader set (rest goes to delegators)`

$bundle\_reward = operating\_cost + storage\_cost * byte\_size$

$uploader\_payout = bundle\_reward * (1 - network\_fee) * uploader\_commission$

But before this reward is being paid out, the network fee will be deducted, usually at 1%. After that, we take the
commission of the validator, which is 90% by default. In this case, 10% of the remaining bundle reward will be
distributed to the delegators. The remaining 90% will then be automatically transferred to the validator's account.

If voters have validated incorrectly (nodes who have voted invalid if the quorum was valid) will receive a vote slash.
The amount of the vote slash can be seen on the network page on the KYVE app. More on slashes can be
found [here](/token_holders/staking_delegation.md#slashing).

If more than 50% of the validators voted invalid, there would be no bundle reward for the uploader. The opposite will be
the case, and the uploader will receive an upload slash. The amount of the slash can also be seen on the network page.
Like before,
all validators who voted incorrectly and voted with valid will receive a vote slash, too.

## Summary

The diagram can summarize the following lifecycle in the chart below:

![data flow](/img/data_flow.png)
