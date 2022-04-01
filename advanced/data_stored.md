---
title: How data is stored
order: 2
parent:
  title: Advanced
  order: 3
---

# How data is stored

Storing data on Arweave is simple, storing data validated by multiple parties is a bit more complicated. Because of that we will break down the process of KYVE stores it's data.

## Saving data in rounds

Saving many data items or even a data stream is tricky, thats why we aggregate data into bundles to store them more efficiently. This enables KYVE to validate multiple data items which are bundled up in a single validation round. With this method we can break down a data stream into multiple rounds, making it way easier to work with. In each round, a selected validator will collect data, create a bundle and submit it to the network. This marks the beginning of such a proposal round.

## Lifecycle of a bundle proposal

Running a protocol nodes comes with certain responsibilities. Based on your role for each proposal round, the following will happen:

![uploaders validator](/uploaders_validators.png)

### 1. Selecting an uploader for the data bundle

In order for a bundle proposal round to start, the `next_uploader` has to create a bundle, upload it to Arweave and then
submit it to the network. But first of all, the next uploader has to be selected. For that, we use a weighted random
selection with the following two factors:

- The personal stake (linear)
- The total delegation into the validator (sqrt)

In detail to calculate the upload probability of a validator you have to apply the following formula:

- $n$ = `number of validators`
- $v$ = `validator`

$p = \frac {validator\_personal\_stake + \sqrt {validator\_total\_delegation}} {\sum_{i=1}^n v_i.personal\_stake + \sqrt {v_i.total\_delegation}} * 100$

The `next_uploader` for each round is selected directly when the new round starts.

### 2. Creating a bundle proposal

Once a node got selected as the `next_uploader` it will create a bundle proposal other validators can validate. A bundle consists of an array of data items, making it more efficiently since storing every data item on Arweave singly would be way more expensive.

From the pool side, there is a parameter called `min_bundle_size` which determines that a bundle has to have at least so many data items. If this number is high it stores data very efficiently, but it takes longer to upload/validate which means a high number would not be suitable for live data. So the node which creates the bundle will collect data until it has collected enough data items to fullfill the bundle size requirements.

Once enough data has been collected the data is (which is usually json) will be transformed into a buffer so it can be gzipped, finishing the bundle for the next round.

### 3. Uploading the bundle to Arweave and submit it to the network

Now the node can finally upload the bundle to Arweave, in return it receives the transaction id of the Arweave transaction.
With this bundle id, and other information like the `bundle_size` and the `byte_size` the node can submit it to the network. For that submit the method `msg_server_submit_bundle_proposal` is called.

### 4. Validating the bundle

When the new bundle proposal is submitted the new round officially starts. An event will be emitted which all nodes can listen to. When they see a new bundle proposal was submitted, they will get the bundle id with the other data and start validating it. They take the `bundle_id` which is the Arweave transaction id and download the raw bundle, ungzip it and parse the bundle to it's original json format. After that the nodes will perform a simple hash compare. If the submitted `byte_size` is matching to the node will vote either valid or invalid. For that the node will call `msg_server_vote_proposal`.

### 5. Finalizing the bundle

After at least > 50% of all nodes (excluding the uploader) have voted _quorum_ has been reached. If that is the case the uploader of the next round submits his bundle he prepared in the meantime and finalizes the round.

If more than 50% of the validators voted valid the bundle proposal got accepted and will be finalized. By that, the bundle id will be saved and will be available for the users. As a reward the uploader of this bundle will receive a bundle reward.

The reward is calculated the following:

- $operating\_cost$ = `Minimum fixed bundle reward in $KYVE`
- $storage\_cost$ = `Amount of $KYVE to save 1 Byte on Arweave`
- $byte\_size$ = `The size of the data bundle in bytes`
- $network\_fee$ = `The fee which gets transferred to treasurey`
- $uploader\_commission$ = `The commission the uploader set (rest goes to delegators)`

$bundle\_reward = operating\_cost + storage\_cost * byte\_size$

$uploader\_payout = bundle\_reward * (1 - network\_fee) * uploader\_commission$

But before this reward is being payed out the network fee will be deducted which is usually at 1%. After that we take the commission of the validator, which is 90% by default. In this case 10% of the remaining bundle reward will be distributed to the delegators, the remaining 90% will be then automatically transferred to the validators account.

If voters have validated incorrectly, (nodes who have voted invalid if the quorum was valid) will receive a vote slash.
The amount of the vote slash can be seen on the network page on the KYVE app. More on slashes can be found [here](/basics/slashing.md).

If more than 50% of the validators voted invalid there will be no bundle reward for the uploader. The opposite will be the case, the uploader will receive an upload slash. The amount of the slash can be also seen on the network page. Like before,
all validators who voted incorrectly, in this case voted with valid will receive a vote slash, too.

## Summary

The following lifecycle can be summarized into the diagram below:

![data flow](/data_flow.png)
