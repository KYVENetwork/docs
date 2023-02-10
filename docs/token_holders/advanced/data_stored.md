---
title: How data is stored
order: 2
parent:
  title: Advanced
  order: 4
---

# How data is stored

Storing data on Arweave is simple. Storing validated data by multiple parties is a bit more complicated. Because of that, we will break down the process by which KYVE stores its data.

## Saving data in rounds

Saving many data items or even a data stream is tricky. Thats why we aggregate data into bundles to store them more efficiently. It enables KYVE to validate multiple data items which are bundled up in a single validation round. With this method, we can break down a data stream into various rounds, making it easier to work with. A selected validator will collect data in each round, create a bundle, and submit it to the network. This marks the beginning of such a proposal round.

## Lifecycle of a bundle proposal

The lifecycle of a bundle proposal can be seen in the following diagram:

![data flow](/img/data_flow_normal.png)

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

Once a node is selected as the `next_uploader`, it will create a bundle proposal that other validators can validate. A bundle consists of many data items, making it more efficient since storing every data item on Arweave alone would be way more expensive.

A parameter called `upload_interval` how long the validator has to wait until he can submit his bundle proposal. The higher this number, the more efficient data is getting archived due to bigger bundles. For live data on another hand it is recommended to have a rather small upload interval like 60 seconds.

Once enough data has been collected, the data (usually JSON) will be transformed into a buffer to be gzipped, finishing the bundle for the next round.

### 3. Uploading the bundle to Arweave and submitting it to the network

Now the node can finally upload the bundle to Arweave. In return, it receives the transaction id of the Arweave transaction.
The node can submit it to the network with this bundle id and other information like the `bundle_size` and the `byte_size`. For that submission, the method `msg_server_submit_bundle_proposal` is called.

### 4. Validating the bundle

When the new bundle proposal is submitted, the latest round officially starts. The chain will emit an event that all nodes can listen to. When they see the uploader submitted a new bundle proposal, they will get the bundle id with the other data and start validating it. They take the `bundle_id`(the Arweave transaction id), download the raw bundle, unzip it, and parse the bundle to its original JSON format. After that the nodes will perform a simple hash compare. If the submitted `byte_size` is matching to the node will vote either valid or invalid. For that the node will call `msg_server_vote_proposal`.

### 5. Finalizing the bundle

After at least > 50% of all nodes (excluding the uploader) have voted _quorum_ has been reached. If that is the case the uploader of the next round submits his bundle he prepared in the meantime and finalizes the round.

The bundle proposal was accepted and finalized if more than 50% of the validators voted with valid. The chain will save the bundle id and make it available for the users. As a reward, the uploader of this bundle will receive a bundle reward.

The reward is calculated in the following:

- $operating\_cost$ = `Minimum fixed bundle reward in $KYVE`
- $storage\_cost$ = `Amount of $KYVE to save 1 Byte on Arweave`
- $byte\_size$ = `The size of the data bundle in bytes`
- $network\_fee$ = `The fee which gets transferred to treasurey`
- $uploader\_commission$ = `The commission the uploader set (rest goes to delegators)`

$bundle\_reward = operating\_cost + storage\_cost * byte\_size$

$uploader\_payout = bundle\_reward * (1 - network\_fee) * uploader\_commission$

But before this reward is being paid out, the network fee will be deducted, usually at 1%. After that, we take the commission of the validator, which is 90% by default. In this case, 10% of the remaining bundle reward will be distributed to the delegators. The remaining 90% will then be automatically transferred to the validator's account.

If voters have validated incorrectly (nodes who have voted invalid if the quorum was valid) will receive a vote slash.
The amount of the vote slash can be seen on the network page on the KYVE app. More on slashes can be found [here](/basics/slashing.md).

If more than 50% of the validators voted invalid, there would be no bundle reward for the uploader. The opposite will be the case, and the uploader will receive an upload slash. The amount of the slash can also be seen on the network page. Like before,
all validators who voted incorrectly and voted with valid will receive a vote slash, too.

## Summary

The diagram can summarize the following lifecycle in the chart below:

![data flow](/img/data_flow.png)
