---
sidebar_position: 4
---

# Uploader

## Introduction

The uploader has the most important role in the current bundle proposal round since he is responsible for actually
providing and storing the data onto the storage provider
and registering it for validation on-chain for the other validators.

## Becoming an uploader

There are two options on how a pool participant can be become an uploader:

- When the pool is just created and still in "genesis" state, the role of uploader is still empty. With the
  transaction `MsgClaimUploaderRole` the first pool participant who calls this transaction gets the uploader role for
  the first round
- Increasing the total delegation. Increasing it increases the probability of getting chosen as the next uploader in
  each round. More details can be found [here](/protocol_devs/advanced_concepts/uploader_selection.md)

## Responsibilities

The main tasks and responsibilities of an uploader are the following:

- Close previous round with `MsgSubmitBundleProposal`. This will tally up the votes, reward (or slash) participants and
  close that round. By submitting already the new bundle proposal
  the new round immediately gets started. With the new round started, the other participants (validators) can validate
  and vote on the proposal
- Skip round with `MsgSkipUploaderRole`. This should be called if the uploader is unable to get new data from the data
  source due to it being offline or for other reasons. With this transaction
  a new uploader is automatically selected who then can try if he can find any new data. If an uploader skips a bundle
  proposal he will **not** earn any rewards

## Flow diagram

A more detailed step by step description can be found below:

<p align="center">
  <img width="70%" src="/img/uploader_steps.png" />
</p>
