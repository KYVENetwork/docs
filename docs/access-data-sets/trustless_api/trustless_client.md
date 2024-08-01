---
sidebar_position: 3
---

# Trustless Client

:::tip
This section describes the usage of the Trustless Client, enabling a seamless integration of the Trustless API.
:::

The Trustless Client enables a simple and efficient integration into your Go program of the Trustless API. Therefore, simply import 
the following package:

**https://github.com/KYVENetwork/trustless-client-go**

## Usage
The `DataItemInclusionProof` serves all the required logic. It expects a `TrustlessDataItem`, which is similar to the response type of the 
Trustless API. Besides this, it expects an endpoint that is used to compare the local computed Merkle root with the one stored on-chain. 
Although the endpoint is not required, it's recommended to specify either your own KYVE node endpoint or a KYVE node you're trusting. 
By default, KYVE's official node endpoints are used.