---
sidebar_position: 4
---

# Staking and Delegating

# Staking

### What is staking, and why is it important?

A storage pool requires protocol nodes that upload and validate data. To ensure that nodes upload correct data
and validate honestly, the protocol nodes have to stake $KYVE. When protocol nodes stake $KYVE in a pool, they are
allowed to operate in that specific pool. In case of nodes misbehaving (e.g., uploading and submitting invalid data or
validating incorrectly), the node would get [slashed](#slashing). In return for the risk of being slashed and
the work of uploading and validating data, nodes are rewarded with $KYVE based on their staking amount.

### Who would stake in a pool?

Users who want to participate in a pool and want to earn staking rewards.

### How can I stake in a pool?

You can stake in a pool through the KYVE [app](https://app.kyve.network). Select a pool you are interested in and click
on the staking tab to become a validator. You can withdraw your stake with an unbonding time.

:::caution
**IMPORTANT**: When you stake your $KYVE, you are in danger of getting slashed for being offline. Ensure that you are
running a protocol node with the correct runtime in the right pool **before** you stake.
:::

## Delegating

### What is delegation, and why is it important?

By delegating to a node, you help to secure the network. Delegation is a form of staking which does not require you to
run your node. You provide stake as network security to a node and generate rewards. In an ideal world, everyone would
be able to run their node, leading to a very secure network with millions of nodes. But on the tech, this leads to many
problems because those nodes generate a lot of traffic, leading the chain to slow down and eventually halt.

> In PoW, you are securing the network with external capital in the form of hardware, while in
> PoS, you are providing security by locking internal capital in the form of tokens.

At KYVE, you can delegate to both protocol and chain nodes, allowing you to have multiple ways of earning rewards for
your tokens.

### How can I delegate?

On the protocol, you can delegate to a node through the KYVE [app](https://app.kyve.network). Select a pool to see the
validators of the pool, choose one with parameters you are happy with, and click the become a delegator button.

To delegate to a chain node, we recommend using the explorer and the built-in process in the Staking-Tab for easy
delegation. Note: The KYVE team does not manage this process; treat it as your responsibility

## Slashing

Slashing is a core mechanism in a Proof of Stake chain. In KYVE, we also use nodes having "skin in the game" by letting
their stake participate as a protocol node. Currently, there are three types of slashes a protocol node can experience:

### Upload slash

If a protocol node encounters an upload slash, it loses 5% of its stake. To receive one, a majority of the validators in
the pool have to vote against your bundle proposal.

### Vote slash

A vote slash happens when you validate data incorrectly. Once a quorum is reached (> 50% voted valid or invalid),
validators who voted the opposite of the majority receive a vote slash. When a node receives a vote slash
it loses 5% of its stake.

### Timeout slash

A timeout slash happens when the protocol node is offline.
If a node is not able to fetch or validate data it has to vote with abstain
or skip its uploader role. If the node does not participate for more than 5
consecutive rounds it receives a slash of 0.1%.
