---
sidebar_position: 2
---

# Snowflake Destination

This page will guide you through setting up an ELT pipeline using Snowflake to fetch data from
a [KYVE data pool](/learn/architecture) and import it into a Snowflake data warehouse.

## About Snowflake

The KYVE Data Pipeline enables easy import of KYVE data into any data warehouse or destination
supported by [Airbyte](https://airbyte.com/). With the [ELT](https://en.wikipedia.org/wiki/Extract,_load,_transform)
format, data analysts and engineers can now confidently source KYVE data without worrying about its validity or
reliability.

A data warehouse is a centralized repository of data that is optimized for querying and analysis. It is designed for
[analytical processing (OLAP)](https://en.wikipedia.org/wiki/Online_analytical_processing). A data warehouse can handle
large volumes of data and complex queries, while a relational database is more suitable for handling small transactions
in real-time. A data warehouse provides a way for businesses to consolidate data from various sources into a single
location, which can then be used to make better decisions.

[Snowflake](https://www.snowflake.com/en/) is used by a wide range of businesses and industries, from startups to large
enterprises. Some main user groups that utilize Snowflake include business analysts, data scientists, data
engineers and executives.

## Snowflake Setup

### Prerequisites

These instructions assume that you already have a Snowflake account. For more information on how to get started with an
account, go [here](https://signup.snowflake.com/).

Once the Snowflake data warehouse is set up, we can configure it as a destination for Airbyte. We are going to be 
utilizing the UI via the Web browser:

1. Open a web browser and go to the [Snowflake web application](https://app.snowflake.com/).
2. Log in to your account using your Snowflake username and password.
3. Once logged in, click on the `Worksheet` option from the sidebar. Then, click on the `+ Worksheet` button on the top
   right of the page to open a new worksheet.

  <img src="/img/elt/snowflake_worksheet_1.png"/>

In order to create a connection, you will need the following:

- `Host`
- `Username`
- `Role`
- `Password`
- `Warehouse`
- `Database`
- `Default Schema`

Below are the instructions to create/get the required parameters.

> NOTE: The worksheet you just opened can act as your query editor. All the SQL queries you'll see below need to be run
> there.

### Configuring Snowflake

#### **Host**

Go to  `Admin` > `Accounts` and then locate your user. Hover over the clip icon beside the account name to get your
host. It
should be in the format `<your_account.snowflakecomputing.com>`.

  <img src="/img/elt/snowflake_host.png"/>

#### **Username**

To create a user you can either create it on the UI or using SQL:

- From the UI, under `Admin` > `Users & Roles` > `+ User`

    <img src="/img/elt/snowflake_username.png"/>

- Using SQL:

    - To run
      this [command](https://docs.snowflake.com/en/sql-reference/sql/create-user),
      the current user must have a `USERADMIN` role or one with higher privileges (run this command in the worksheet):

      > NOTE: An owner with `ACCOUNTADMIN` privileges will work as well since it has higher level of access
      than `USERADMIN`.

        ```sql
        CREATE USER <user_name_of_choice>;
        ```

  This will serve as the username when creating the connection.

#### Role

- To find the user role, go to `Admin` > `Users & Roles`.
- Select your user to expand and get detailed information including the role.

#### Password

- If no password is set up, you can run this SQL command for your username (run this command in the worksheet):

    ```sql
    ALTER USER <your_username> SET PASSWORD = <your_pass_as_string>;
    ```

#### Warehouse

To create a warehouse you can either create it on the UI or by using SQL:

- From the UI, under `Admin` > `Warehouses` > `+ Warehouse`

    <img src="/img/elt/snowflake_warehouse.png"/>

    1. Input a `Name` and choose the `Size`(here he chose `X-Small` for the sake of this tutorial).

    <img src="/img/elt/snowflake_warehouse_size.png" width="500px;"/>

- Using SQL

  To run this command the current user must have
  a `SYSADMIN` [role](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse.html#:~:text=Objects%20%26%20Columns.-,Access%20Control%20Requirements,-A%20role%20used)
  or higher (run this command in the worksheet):

    ```sql
    CREATE OR REPLACE WAREHOUSE <warehouse_name_of_choice> WITH warehouse_size=<size_of_warehouse_as_string>;
    ```

#### Database

To create a database you can either create it on the UI or by using SQL:

- From the UI, under `Data` > `Databases` > `+ Database`
  <img src="/img/elt/snowflake_database.png"/>

    1. Input a `Name` and click on `Create` to create the database.

- Using SQL

    - To run this command the current user must have
      a `SYSADMIN` [role](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse.html#:~:text=Objects%20%26%20Columns.-,Access%20Control%20Requirements,-A%20role%20used)
      or higher (run this command in the worksheet):

      ```sql
      CREATE DATABASE <db_name_of_choice>;
      ```

#### Default Schema

The default schema is the schema you want to work with. Typically, it is `public`.

  <img src="/img/elt/snowflake_database_schema.png"/>

## Create an ELT pipeline

:::caution

This example uses old data from the devnet. Check out
[https://app.kyve.network/#/pools](https://app.kyve.network/#/pools)
to get a list of active mainnet pools.
Here, we can recommend Osmosis (`pool_id: 1`) or Archway (`pool_id: 2`)

:::

Now you are ready to go on the Airbyte app ([http://localhost:8000/](http://localhost:8000/)) and create a new
connection.

1. Set up the source.

   In this step you should specify the [KYVE pool](https://app.kyve.network/#/pools) from which you want to
   retrieve data. You can specify a specific **Bundle-Start-ID** in case you want to narrow the records that will be
   retrieved from the pool. You can find the bundles of your pool choice in the KYVE app. For example
   [here](https://app.korellia.kyve.network/#/pools/8/bundles) are the bundles of Pool ID `8`, the Evmos chain.

   For this example we choose:

    - **Pool-ID**: `8` which refers to the [Evmos chain](https://app.kyve.network/#/pools/8/bundles).
    - **Bundle-Start-ID**: `105395` (or choose another `Bundle-Start-ID`)
    - **KYVE-API URL Base**: The base URL indicates the KYVE network
      1. `Mainnet` : https://api-eu-1.kyve.network
      2. `Testnet` : https://api-eu-1.kaon.kyve.network/
      3. `Devnet` : https://api.korellia.kyve.network/ 

   <br></br>

   <img src="/img/elt/airbyte_kyve_source.jpg"/>

2. Set up the destination.

    1. Go to Connections -> `+ New Connection`, choose Kyve source (existing source) and click on
       the `Use existing source` button:
       <img src="/img/elt/snowflake_connections_1.png" width="700px;"/>

    2. Select as destination type `Snowflake`. You will automatically be taken to a page to add the setup details of the
       Snowflake Warehouse that you set [before](#snowflake-setup).
       <img src="/img/elt/snowflake_connection_details.png" width="300px;" />

    3. For the authorization method, use `Username` and `Password` and enter the parameters you saved before.
       <img src="/img/elt/snowflake_credentials.png"/>

3. Final ELT configuration.

   This is the final step where you can modify the pipeline.

    - In the **Transfer** field, you can set how often the data should sync to the destination. For this example, you
      could set it to `Manual`.
    - In the **Streams** section, you can modify the Namespace, and you can add a Prefix for the data that will be
      stored.
    - In the **Activate the streams you want to sync** section, you can modify the behavior of the stream in each
      repetition. For this example, you could set it to `Incremental|Append`, which means that only new records will be
      stored on each new sync and will be appended in the DB.

      <img height="700" src="/img/elt/airbyte_kyve_elt_conf.jpg"/>

## View Stored Data

To view the data you just synced from KYVE, go back to your Snowflake UI, select the worksheet you created
[earlier](#prerequisites) and try out the following queries. All variables inside `<>` need to be changed according
to the variables you set.

- Query the table with the raw data:

  ```sql
  SELECT * FROM <DATABASE_NAME>.PUBLIC._airbyte_raw_pool_8 limit 10;
  ```

  <img src="/img/elt/snowflake_unnormalized_query.png"/>

- Query the table with the normalized data

  ```sql
  SELECT * FROM <DATABASE_NAME>.PUBLIC.POOL_8_VALUE limit 10;
  ```

  <img src="/img/elt/snowflake_normalized_data.jpg"/>

- Querying data for a given miner:

  - Finding miners with multiple transactions:

     ```sql
     SELECT miner, COUNT(*) as transaction_count
     FROM <DATABASE_NAME>.PUBLIC.POOL_8_VALUE
     GROUP BY miner
     HAVING COUNT(*) > 1
     ORDER BY transaction_count DESC;
     ```

     <img src="/img/elt/snowflake_repeated_miners.jpg"/>

  - Selecting one and displaying results:

     ```sql
     SELECT * FROM <DATABASE_NAME>.PUBLIC.POOL_8_VALUE
     WHERE MINER = '<MINER_STRING>';
     ```

     <img src="/img/elt/snowflake_records_for_miner.jpg"/>

  - Showing transactions originating from a given sender:

    ```sql
    -- list senders and receivers
    SELECT "from", "to" FROM <DATABASE_NAME>.PUBLIC.POOL_8_VALUE_TRANSACTIONS limit 10;

    -- query all transactions for a given sender
    SELECT * FROM <DATABASE_NAME>.PUBLIC.POOL_8_VALUE_TRANSACTIONS WHERE "from" = '<RECEIVER_ADDRESS_STRING>';
    ```

     <img src="/img/elt/snowflake_transactions_for_give_sender_1.jpg"/>

- Creating the Transactions View:

  ```sql
  -- to avoid re-writing <DATABASE_NAME>.PUBLIC
  USE DATABASE <DATABASE_NAME>.PUBLIC;

  -- function to convert hex to numeric
    CREATE OR REPLACE FUNCTION hex_to_numeric(str TEXT)
    RETURNS VARCHAR
    LANGUAGE JAVASCRIPT
    AS
    $$
    const n = Math.floor(arguments[0].length / 8);
    let res = BigInt(0);
    str = arguments[0].padStart((n + 1) * 8, '0');
    for (let i = 0; i <= n; i++) {
      res *= BigInt('0x100000000');
      res += BigInt('0x' + str.substr(i * 8, 8));
    }
    return res.toString();
    $$;

  SELECT TO_TIMESTAMP(POOL_8_VALUE.timestamp) AS timestamp,
      POOL_8_VALUE_TRANSACTIONS."from",
      POOL_8_VALUE_TRANSACTIONS."to",
      POOL_8_VALUE_TRANSACTIONS_value.hex,
      hex_to_numeric(SUBSTR(POOL_8_VALUE_TRANSACTIONS_value.hex, 3)) AS int8_value,
      POOL_8_VALUE_TRANSACTIONS.data
  FROM POOL_8_VALUE_TRANSACTIONS
  JOIN POOL_8_VALUE ON POOL_8_VALUE._airbyte_value_hashid = POOL_8_VALUE_TRANSACTIONS._airbyte_value_hashid
  JOIN POOL_8_VALUE_TRANSACTIONS_value ON POOL_8_VALUE_TRANSACTIONS._airbyte_transactions_hashid = POOL_8_VALUE_TRANSACTIONS_value._airbyte_transactions_hashid
  LIMIT 10;
  ```

  <img src="/img/elt/snowflake_query_4.jpg"/>

That's it! You've successfully created an end-to-end ELT pipeline fetching data from a KYVE data pool and importing it
into a Snowflake Warehouse.
