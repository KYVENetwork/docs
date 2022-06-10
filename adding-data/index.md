# Adding data to Kyve

You may want to insert data from another blockchain and store it in Kyve's data warehouse.

To do this, you'll want to write an integration.

0. Gather necessary information from the chain you would like to integrate into Kyve

a. RPC endpoint
b. SDK's for the source blockchain

1. Fork the template repo

```sh
git clone
cd Kyve
```

2. Extend the `Kyve` class

Typescript classes.

```ts
class KyveNear extends KYVE {
    ...
}
```

```

3. Write a `getDataItem` method

The `getDataItem` method that you implement should take in a key, which is the block id that you're trying to fetch from the source blockchain. The method should return a key-value pair where the value can be anything you want.

```ts
  public async getDataItem(key: number): Promise<{ key: number; value: any }>
```

How to implement the details of the `getDataItem` method will depend on whether you are connecting to the source chain directly or through an API like Infura or Alchemy.

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

Let's take a closer look at the `fetchBlock` helper method, which in this case lives in its own `utilies.ts` file.

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

In this example, the `fetchBlock` method first initializes a connection to the Solana API and then calls the `getBlock()` method that is provided in the Solana SDK.

Here's another example, where instead we're fetching data from the source chain (Near) through an API.

```ts
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


