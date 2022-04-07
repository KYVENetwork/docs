---
title: Slashing
order: 7
parent:
  title: Basics
  order: 2
---

# Slashing

Slashing is a core mechanism in a Proof of Stake chain. In KYVE, we also use nodes having "Skin in the game" by letting their stake participate as a protocol node. Currently, there are three types of slashes a protocol node can experience:

## Upload slash

An upload slash is the harshest slash. If a protocol node encounters one, it loses 20% of its stake. To receive one, a majority of the validators in the pool have to vote against your bundle proposal.

## Vote slash

A vote slash happens when you validate data incorrectly. Once a quorum is reached (> 50% voted valid or invalid), validators who voted the opposite of the majority receive a vote slash. When a node receives a vote slash
it loses 10% of its stake.

## Timeout slash

A timeout slash happens when the protocol node is offline for longer. When a node is supposed to upload and submit
data, but it does not for any reason, other validators vote if the data source was available or not. If the data source was available, the node in question was probably offline and got slashed with 1%. If the data source is unavailable and it's not the node's fault that it did not upload the node, it does not get slashed.
