---
title: Dealing with offline nodes
order: 3
parent:
  title: Advanced
  order: 4
---

# Dealing with offline nodes

Offline nodes can prevent the network from continuing archiving data. For this case the network has specific features dealing with offline nodes.

## If the current uploader is offline

Each round a validator is chosen as the next designated uploader. He is responsible to create a new data bundle, upload it to Arweave and submit it to the network. For those tasks the uploader has a specific amount of time which is defined in the global param `upload_timeout`. Usually it is set to 600 seconds (10 mins). If the uploader does not submit this bundle in time he will receive a `timeout_slash` (usually 1%) and will be removed from the active validator set. The remaining stake of the validator will be automatically transferred. So in case the validator gets back online again he has to restake to become a validator again.
