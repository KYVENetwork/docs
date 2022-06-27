---
title: Getting Started
order: 1 
parent:
    title: Accessing Data
    order: 2
---

# Getting Started

This tutorial will get you up and running with data access from KYVE in your React application.

## Prereqs

1. Get familiar with GraphQL

    The Kyve Data Access API is available only in [GraphQL](https://graphql.org/). GraphQL is a query language for API's and an alternative to REST API's. If you are not familiar with GraphQL, you can read an introduction [here](https://graphql.org/learn/).

2. Select Your Endpoint

    Select an endpoint from the list [here](./accessing-data/well-known-endpoints.html), depending on what kind of data you would like to retrieve from Kyve.


## Set-up

1. Create a new React App with [Create React App](https://create-react-app.dev/)
2. `npm install @apollo/client graphql`

## Using Apollo-Client in your App

Now that you have installed the required dependencies and set up a basic React app, you can get started by initializing your `ApolloClient`. `ApolloClient` gives you an abstraction layer and an interface to the Graphql server.

Replace your `src/index.js` with the following:

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

In this section, you follow the basic setup for the Apollo Client. Notice how the client is connecting to the Evmos-EVM endpoint. You can find more endpoints [here](./well-known-endpoints.md).

## Fetching data from KYVE

To fetch data from KYVE, you will need to specify a basic query that queries for Evmos-EVM-Transactions. The query below fetches the hash and blockNumber 

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

If you go to the appropriate EVM endpoint here, you should see a GraphiQL GraphQL playground. You can copy and paste the query above and hit the run button to see results.

![graphql](/graphql-kyve-1.gif)

As you can see, the GraphQL query returns the `hash` and `blockNumber` for each block.

Next up, you are building a component that uses Apollo's `useQuery`-Hook. For this example,
you will render the hashes and the block number of a transaction into a list.

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
At last you are registering the above component into your app
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

## Next steps

Now that you've successfully accessed data from Kyve, you can further explore the GraphQL syntax to construct potentially more complicated queries.

- [Basic queries](./basic-queries)
- [Querying multiple sources](./querying-multiple-sources)
- [Paginating a query](./paginating-a-query)





