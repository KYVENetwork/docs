---
title: Interpool-security
order: 3
parent:
  title: Advanced
  order: 4
---

# Interpool-security

Data can only be trustless if enough stake is behind it. To ensure the highest stake possible for an
evergrowing amount of storage pools KYVE came up with the concept of `interpool-security`. Basically,
this allows validators to join multiple storage pools at once and therefore secure the pool with their
entirety of stake.

## One validator - multiple pools

This has some huge benefits, the biggest of them is of course the higher stake
each pool has now. So instead of splitting up the stake of a validator in each pool a pool is secured with
the entire stake, making the cost of attempting a 51% attack way higher. Futhermore, rewards can be massively
increased due to using the stake in "parallel". By validating in multiple pools a validator can earn double
the rewards if he runs on the twice the amount of pools as their competitors. But this of course comes also with a catch, running on multiple pools increases the risk of getting slashed in one of those pools. Getting slashed in one pool affects the entire stake, so the pools have to be chosen carefully.

## The use of Valaccounts

To make it possible for the Validator to participate on multiple pools without having to copy once's mnemonic to a
potentially unsecure server where to protocol node should be hosted on KYVE uses `Valaccounts` to run nodes. Basically,
the validator address can grant permissions to a random account to validate in the KYVE network on behalf of the staker.
This has to be done for every pool a validator wants to participate in. This ensures, that the validator does not have
to export his private key to a server and enables massive horizontal scaling, due to the fact that validators and his valaccounts are decoupled from another. A potential setup with multiple pools can be found below:

![interpool security](/interpool_security.png)

Here we can see that the validator granted permissions to three valaccount, were each of those runs on one pool. The node operator can decide if he wants to run multiple nodes on one machine like `Valaccount-1` and `Valaccount-2` or if he wants dedicated machines for every pool like `Valaccount-3`. Choosing the last option enables massive horizontal scaling and enables the validator to run on every pool KYVE will ever have.
