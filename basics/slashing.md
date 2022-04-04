---
title: Slashing
order: 7
parent:
  title: Basics
  order: 2
---

# Slashing

Slashing is a core mechanism in a Proof of Stake chain. In KYVE we also make use of nodes having "Skin in the game" by letting them stake in order to participate as a protocol node. Currently, there are three types of slashes a protocol node can experience:

## Upload slash

An upload slash is the harshest slash. If a protocol node encounters one, it looses 20% of it's stake. In order to receive one a majority of the validators in pool have to vote against your bundle proposal.

## Vote slash

A vote slash happens when you validate data incorrectly. That means, once quorum is reached (> 50% voted either valid or invalid) all the validators who voted the opposite of the majority receive a vote slash. When a node receives a vote slash
it looses 10% of it's stake.

## Timeout slash

A timeout slash happens when the protocol node is offline for a longer time. When a node is supposed to upload and submit
data, but it does not for any reason, other validators vote if the data source was available or not. If the data source was available, that means that the node in question was probably offline and gets slashed with 1%. If the data source is actually not available and it's not the nodes fault that he did not upload the node does not get slashed.
