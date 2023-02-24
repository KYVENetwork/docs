---
sidebar_position: 2
---

# Runtimes

## Introduction

As mentioned in the chapter before, every storage pool has to specify a runtime. Basically, a runtime is an implementation of the actual data retrieval and validation logic. If a storage pool chooses to run with a certain runtime, only data can be archived and validated if the data source is supported by the runtime.

An example of a runtime is `@kyvejs/bitcoin`. It is a special implementation to retrieve bitcoin data and validate it. It would not be able to retrieve for example Ethereum data. So if KYVE should archive and validate the entire Bitcoin blockchain a storage pool with the `@kyvejs/bitcoin` runtime has to be created. If KYVE on the other hand should archive and validate the entire Ethereum blockchain a storage pool with the `@kyvejs/evm` runtime has to be used.

>**This enables KYVE to reuse the validation logic of a storage pool to process every kind of data, assuming a runtime for that data type can be implemented.**

## Usage 

The runtime communicates in the following way with the KYVE core implementation:

<p align="center">
  <img width="70%" src="/img/protocol_runtime.png" />
</p>

## Implementation

When a storage pool has specified a certain runtime, the actual protocol node binaries have to use this runtime, else they are not able to join the pool. The binaries are compiled from the runtime implementation directly, extending the base logic from the protocol package which can be found [here](https://www.npmjs.com/package/@kyvejs/protocol).

:::info
**INFO**: Existing runtime implementations can be found [here](https://github.com/KYVENetwork/kyvejs/tree/main/integrations)
:::

## Interface

The runtime not only retrieves and validates the data for the protocol node, it also has some other responsibilities. A full list of every method the runtime has to implemented can be found below:

```ts
/**
 * Interface of Runtime.
 *
 * The Runtime implements the custom logic of a pool and defines how data
 * items are fetched and which order they should have.
 *
 * @interface IRuntime
 */
export interface IRuntime {
  /**
   * Name of the runtime. This should be unique for every runtime and should
   * later match the runtime of the pool
   *
   * @property name
   * @type {string}
   */
  name: string;

  /**
   * Version of the runtime. This is used for checking if the node runs the correct
   * runtime version specified by the pool
   *
   * @property version
   * @type {string}
   */
  version: string;

  /**
   * Gets the data item from a specific key and returns both key and the value.
   *
   * Deterministic behavior is required
   *
   * @method getDataItem
   * @param {Validator} v the class of @kyvejs/protocol
   * @param {string} source the source from which to get the data item from. usually an api or rpc endpoint
   * @param {string} key the key of the data item
   * @return {Promise<DataItem>}
   */
  getDataItem(v: Validator, source: string, key: string): Promise<DataItem>;

  /**
   * Prevalidates a data item right after is was retrieved from source.
   * If the prevalidation fails the item gets rejected and never makes
   * it to the local cache. If the prevalidation succeeds the item gets
   * transformed and written to cache were it is used from submission
   * of proposals or bundle validation.
   *
   * Deterministic behavior is required
   *
   * @method preValidateDataItem
   * @param {Validator} v the class of @kyvejs/protocol
   * @param {DataItem} item data item which gets prevalidated
   * @return {Promise<boolean>}
   */
  prevalidateDataItem(v: Validator, item: DataItem): Promise<boolean>;

  /**
   * Transforms a single data item and return it. Used for example
   * to remove unecessary data or format the data in a better way.
   *
   * Deterministic behavior is required
   *
   * @method transformDataItem
   * @param {Validator} v the class of @kyvejs/protocol
   * @param {DataItem} item data item which gets transformed
   * @return {Promise<DataItem>}
   */
  transformDataItem(v: Validator, item: DataItem): Promise<DataItem>;

  /**
   * Validates a single data item of a bundle proposal
   *
   * @method validateDataItem
   * @param {Validator} v the class of @kyvejs/protocol
   * @param {DataItem} proposedDataItem the data item proposed by the uploader
   * @param {DataItem} validationDataItem the data item which the validator created himself for validation again the proposed data item
   * @return {Promise<boolean>} returns whether the proposed data item is valid compared to the validation data item
   */
  validateDataItem(
    v: Validator,
    proposedDataItem: DataItem,
    validationDataItem: DataItem
  ): Promise<boolean>;

  /**
   * Gets a formatted value string from a bundle. This produces a "summary" of
   * a bundle which gets stored on-chain and therefore needs to be short.
   *
   * String should not be longer than 100 characters, else gas costs might be too expensive.
   *
   * Deterministic behavior is required
   *
   * @method summarizeDataBundle
   * @param {Validator} v the class of @kyvejs/protocol
   * @param {DataItem[]} bundle is the bundle which needs to be summarized
   * @return {Promise<string>} returns a formatted value string
   */
  summarizeDataBundle(v: Validator, bundle: DataItem[]): Promise<string>;

  /**
   * Gets the next key from the current key so that the data archived has an order.
   *
   * Deterministic behavior is required
   *
   * @method nextKey
   * @param {Validator} v the class of @kyvejs/protocol
   * @param {string} key which gets inserted by @kyvejs/protocol
   * @return {Promise<string>}
   */
  nextKey(v: Validator, key: string): Promise<string>;
}
```

