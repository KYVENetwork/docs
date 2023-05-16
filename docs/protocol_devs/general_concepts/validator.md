---
sidebar_position: 5
---

# Validator

## Introduction

Those protocol validators who did not become _uploader_ in the current round are automatically assigned the role of
_validator_. This does not make them less important, they have the critical task of finding out if the proposed bundle
of the uploader is valid or invalid.

## Responsibilities

The main task is like mentioned above to find out if the proposed bundle from the uploader is valid or invalid. For that
they retrieve the data from the storage provider with the `storage_id` once the proposal was registered and compare it
with their local data they retrieved themselves from the data source. With that mechanism every validator is comparing
their collected data with the data the uploader stored on the storage provider. Beside the raw data validation which is
mostly a simple hash comparison the validators also validate certain metadata which is attached in the bundle proposal
like data size (which is used in the reward calculation) or the actual data hash provided by the uploader. Once the
validator is done with validating and came to a conclusion he votes with the transaction type `MsgVoteBundleProposal`.
The validator has three options when casting a vote:

- **VALID**: when the proposed bundle is found valid in the validator's perspective. When the quorum of the bundle is
  found to be invalid the validator receives a _vote slash_
- **INVALID**: when the proposed bundle is found invalid in the validator's perspective. When the quorum of the bundle
  is found to be valid the validator receives a _vote slash_
- **ABSTAIN**: when the validator was unable to make a decision whether the bundle is valid or not. This could be for
  example due to the data source being offline for the validator. With abstain the validator does not face the risk of
  getting slashed, but won't be considered for the next uploader selection either, thus voting abstain all the time
  won't earn the validator any rewards in the long run

:::tip
**NOTE**: More information on how the votes are tallied and the quorum reached can be
found [here](/protocol_devs/advanced_concepts/vote_tallying.md)
:::

## Flow diagram

A more detailed step by step description can be found below:

<p align="center">
  <img width="70%" src="/img/validator_steps.png" />
</p>
