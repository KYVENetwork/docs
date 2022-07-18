---
title: Getting Started
order: 1
parent:
  title: Adding Data
  order: 3
---

# Adding data

You may want to insert data from another blockchain and store it in KYVE's data warehouse.

To do this, you'll want to write an integration.

### 0. Gather necessary information from the chain you would like to integrate into KYVE

- RPC endpoint
- SDK's for the source blockchain

### 1. Clone the template repo

```sh
git clone https://github.com/yirenlu92/KyveIntegrationTemplate
cd KyveIntegrationTemplate
```

### 2. Add configuration for your chain

Open up `package.json` in your cloned repo.

```sh
vi package.json
```

Update the name and version to fit your integration/runtime.

So for example:

```json
{
"name": "@kyve/solana",
"version": "0.1.0",
...
}
```

### 3. Extend the `KYVE` class

Now open up the `src/index.ts` file from the root of the repo.

```sh
vi src/index.ts
```

All the places that you need to change will be marked with a `TODO:` comment -- make sure you follow the instructions below to fill them all in.

Extend the `KYVE` class with a camel-cased class extension name, for example:

```ts
import

class KyveSolana extends KYVE {
    ...
}
```

### 4. Fill in the `getDataItem` method

The `getDataItem` method that you implement should take in a `key`, which is the [height](https://academy.binance.com/en/glossary/block-height) of the blockchain block you are indexing. (Block height refers to a specific location in a blockchain, measured by how many confirmed blocks precede it.) The method should return the value for that particular key, which can be anything from a JSON object to a string.

```ts
  public async getDataItem(key: number): Promise<{ key: number; value: any }>
```

Every `getDataItem` method will likely take the RPC endpoint from step 1, and either pass it to an SDK provided by the source chain or third party library provider like Ethers or Web3JS; OR the method will call the public RPC endpoint directly for data.

Once the data comes back from the source chain, you can choose to clean up the data before returning it in the method.

## Examples

### KYVE-Solana Integration

As an example, let's walk through the Solana integration. The `KyveSolana` class is as below.

```ts
class KyveSolana extends KYVE {
  public async getDataItem(key: number): Promise<{ key: number; value: any }> {
    let block;

    try {
      block = await fetchBlock(
        this.pool.config.rpc,
        key,
        await this.getSignature()
      );
    } catch (err) {
      if (wasSlotSkipped(err, key)) return { key, value: null };

      this.logger.warn(
        `⚠️  EXTERNAL ERROR: Failed to fetch block ${key}. Retrying ...`
      );

      throw err;
    }

    return { key, value: block };
  }

  private async getSignature(): Promise<Signature> {
    // ...
  }
}
```

Let's take a closer look at the `fetchBlock` helper method, which in this case lives in its own `utils.ts` file.

```ts
import { BlockResponse, Connection } from '@solana/web3.js';

// NOTE: The response type isn't correct because of our patch.
export async function fetchBlock(
  endpoint: string,
  height: number,
  signature: Signature
): Promise<BlockResponse> {
  const provider = initialiseSolanaRPC(endpoint, signature);

  return (await provider.getBlock(height))!;
}

function initialiseSolanaRPC(
  endpoint: string,
  signature: Signature
): Connection {
  return new Connection(endpoint, {
    httpHeaders: {
      'Content-Type': 'application/json',
      Signature: signature.signature,
      'Public-Key': signature.pubKey,
      'Pool-ID': signature.poolId,
      Timestamp: signature.timestamp,
    },
  });
}
```

The `fetchBlock` method first initializes a connection to the Solana API and then calls the `getBlock()` method that is provided in the Solana SDK.

### KYVE-Cosmos Integration

The `fetchBlock` helper method for the KYVE-Cosmos integration fetches data from the source chain (Cosmos) directly from Cosmos's RPC endpoints.

```typescript
export async function fetchBlock(
  endpoint: string,
  height: number,
  signature: Signature
): Promise<any> {
  const res = await call<any>(
    `${endpoint}/cosmos/base/tendermint/v1beta1/blocks/${height}`,
    signature
  );

  const txs = await fetchTransactions(
    endpoint,
    res.block.data.txs.map(parseEncodedTx),
    signature
  );

  return {
    ...res.block,
    data: {
      ...res.block.data,
      txs,
    },
  };
}
```

## Custom Logic

In addition to the `getDataItem` method which must be implemented, you are free to implement custom methods in your class.

### Custom Signatures

For example, for several of the existing integrations, we have implemented custom signatures.

These signatures, which were implemented to prevent spamming of private endpoints, are calculated from the address (conveniently exposed in the class through your wallet) and the message. They can be used for signature verification.

```ts
class KyveSolana extends KYVE {
  public async getDataItem(key: number): Promise<{ key: number; value: any }> {
    let block;

    try {
      block = await fetchBlock(
        this.pool.config.rpc,
        key,
        await this.getSignature()
      );
    } catch (err) {
      ...
    }

    return { key, value: block };
  }

  private async getSignature(): Promise<Signature> {
    const address = await this.sdk.wallet.getAddress();
    const timestamp = new Date().valueOf().toString();

    const message = `${address}//${this.poolId}//${timestamp}`;

    const { signature, pub_key } = await this.sdk.signString(message);

    return {
      signature,
      pubKey: pub_key.value,
      poolId: this.poolId.toString(),
      timestamp,
    };
  }
}
```

### 5. Test your integration

Now that you've successfully extended `KYVE` and implemented your `getDataItem` class method, it's time to test your integration!

To proceed to this next step, reach out to the [KYVE Discord](https://discord.gg/kyve) channel for help.
