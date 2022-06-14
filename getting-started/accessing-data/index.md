---
title: Getting Started
order: 1 
parent:
    title: Accessing Data
    order: 2
---

# Getting Started

This tutorial will get you up and running with data access from KYVE in your React application.

### Prerequisites

1. Get familiar with GraphQL

The Kyve Data Access API is available only in GraphQL.

If you are not familiar with GraphQL, read a good primer here.

2. Select Your Endpoint

http://localhost:8080/getting-started/accessing-data/well-known-endpoints.html

## Try this

## Set-up

1. Create a new React App with [Create React App](https://create-react-app.dev/)
2. `npm install @apollo/client graphql`

## Using Apollo-Client in our App

Now that we have installed the required dependencies and set up a basic React app, we can
get started by initializing our `ApolloClient`.

Replace the `src/index.js` with the following:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql
} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://evmos.warp.kyve.network/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <div>
            <h2>Latest Evmos Transactions 🚀</h2>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
);
```

In this section, we follow the basic setup for the Apollo Client. The client is connecting to
the Evmos-EVM endpoint. You can find more endpoints [here](./well-known-endpoints.md).

## Fetching data from KYVE
To fetch data from KYVE we first specify a basic query that queries for Evmos-EVM-Transactions.
```js
const EVMOS_EVM_TRANSACTIONS = gql`
query Transactions {
  evmosEvmTransactions {
    hash
    blockNumber
  }
}
`;
```
Next up, we are building a component that utilisez Apollo's `useQuery`-Hook. For this example,
We will render the hashes and the block number of a transaction into a list.
```js
function EvmosTransactions() {
  const {loading, error, data} = useQuery(EVMOS_EVM_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.evmosEvmTransactions.map(({hash, blockNumber}) => (
    <div key={hash}>
      <p>
        {hash} : {blockNumber}
      </p>
    </div>
  ));
}
```
At last we are registering the above component into our app
```js
function App() {
  return (
    <div>
      <h2>Latest Evmos Transactions 🚀</h2>
      <EvmosTransactions/>
    </div>
  );
}
```
You can now run `npm start` to see the app in action.



