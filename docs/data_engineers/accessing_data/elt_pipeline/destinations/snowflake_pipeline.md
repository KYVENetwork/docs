---
sidebar_position: 2
---

# Snowflake Pipeline

In order to create an end to end test of the ELT pipeline apart from the Source which is the KYVE network, you should configure a destination where the `records` will be stored.

This page will guide you through setting up an ELT pipeline using Snowflake to fetch data from
a [KYVE data pool](https://docs.kyve.network/basics/pools.html) and import it into a `Snowflake` database.

## About Snowflake

The KYVE Data Pipeline enables easy import of KYVE data into any data warehouse or destination
supported by [Airbyte](https://airbyte.com/). With the [ELT](https://en.wikipedia.org/wiki/Extract,_load,_transform)
format, data analysts and engineers can now confidently source KYVE data without worrying about its validity or
reliability.

This tutorial will guide you through setting up an ELT pipeline to fetch data from
a [KYVE data pool](https://docs.kyve.network/basics/pools.html) and import it into the Snowflake data warehouse.

A data warehouse is a centralized repository of data that is optimized for querying and analysis. It is designed for
[analytical processing (OLAP)](https://en.wikipedia.org/wiki/Online_analytical_processing). A data warehouse can handle
large volumes of data and complex queries, while a relational database is more suitable for handling small transactions
in real-time. A data warehouse provides a way for businesses to consolidate data from various sources into a single
location, which can then be used to make better decisions.

[Snowflake](https://www.snowflake.com/en/) is used by a wide range of businesses and industries, from startups to large
enterprises. Some main user groups that utilize Snowflake include business analysts, data scientists, data
engineers and executives.

## Setting up a Snowflake Data Warehouse

These instructions assume that you already have a Snowflake account. For more information on how to get started with an
account,
go [here](https://signup.snowflake.com/?utm_cta=trial-en-www-homepage-top-right-nav-ss-evg&_ga=2.4059632.1598846643.1676246204-1933848385.1675830767&_gac=1.129224190.1676246204.CjwKCAiAuaKfBhBtEiwAht6H7_TxWwlrbwx_pYK7AH9u-KShBYCU3wIDq7txKCWGGEUsj3gOjAGuwBoCcggQAvD_BwE).

Once the Snowflake data warehouse is set up, you can connect to it in various ways. We are going to be utilizing the UI
via the Web browser:

1. Open a web browser and go to the [Snowflake web application](https://app.snowflake.com/)
2. Log in to your account using your Snowflake username and password
3. Once logged in, click on the `Worksheet` option from the sidebar

<img src="/img/elt/snowflake_worksheet.png"/>

- Click on the `+ Worksheet` button on the top right of the page to open a new worksheet

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

### Getting the `Host`

Go to Admin > Account and then locate your user. Hover over the clip icon beside the account name to get your host. It
should be in the format `<your_account.snowflakecomputing.com>`.

<img src="/img/elt/snowflake_host.png"/>

### Getting the `Username`

To create a user you can either create it on the UI or using SQL:

- From the UI, under `Admin` > `Users & Roles` > `+ User`

<img src="/img/elt/snowflake_username.png"/>

- Using SQL:

  - To run
    this [command](https://docs.snowflake.com/en/sql-reference/sql/create-user.html#:~:text=Objects%20%26%20Columns.-,Access%20Control%20Requirements,-A%20role%20used),
    the current user must have a `USERADMIN` role or one with higher privileges (run this command in the worksheet):

    note: an owner with `ACCOUNTADMIN` privileges will work as well since it has higher level of access than `USERADMIN`

    ```sql
    CREATE USER <user_name_of_choice>;
    ```

This will serve as the username when creating the connection.

### Getting the `Role`

- To find the user role, go to `Admin` > `User & Roles`
- Select your user to expand and get detailed information including the role

### Getting the `Password`

- If no password is set up, you can run this SQL command for your username (run this command in the worksheet):

  ```sql
  ALTER USER <your_username> SET PASSWORD = <you_pass_as_string>;
  ```

### Getting the `Warehouse`

To create a warehouse you can either create it on the UI or by using SQL:

- From the UI, under `Admin` > `Warehouses` > `+ Warehouses`

<img src="/img/elt/snowflake_warehouse.png"/>

- Select the compute size

<img src="/img/elt/snowflake_warehouse_size.png"/>

- Using SQL

  - To run this command the current user must have
    a `SYSADMIN` [role](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse.html#:~:text=Objects%20%26%20Columns.-,Access%20Control%20Requirements,-A%20role%20used)
    or higher (run this command in the worksheet):

    ```sql
    CREATE OR REPLACE WAREHOUSE <warehouse_name_of_choice> WITH warehouse_size=<size_of_warehouse_as_string>;
    ```

### Getting the `Database`

To create a database you can either create it on the UI or by using SQL:

- From the UI, under `Data` > `Databases` > `+ Database`
  <img src="/img/elt/snowflake_database.png"/>

- Add a name, and then create the database

- Using SQL

  - To run this command the current user must have
    a `SYSADMIN` [role](https://docs.snowflake.com/en/sql-reference/sql/create-warehouse.html#:~:text=Objects%20%26%20Columns.-,Access%20Control%20Requirements,-A%20role%20used)
    or higher (run this command in the worksheet):

    ```sql
    CREATE DATABASE <db_name_of_choice>;
    ```

### Getting the `Default Schema`

The default schema is the schema you want to work with. Typically, it is `public`.

<img src="/img/elt/snowflake_database_schema.png"/>

## Step 4: Create an ELT pipeline

Now you are ready to go on the Airbyte app ([http://localhost:8000/](http://localhost:8000/)) and create a new
connection.

1. Set up the source.

   <img src="/img/elt/airbyte_kyve_source.png"/>

2. Create a new Snowflake connection as follows:

- Go to Connections -> `+ New Connection`:

<img src="/img/elt/snowflake_connections_1.png"/>

- Choose Kyve source (existing source) and click on the `Use existing source` button:

<img src="/img/elt/snowflake_connections.png"/>

- Set up the destination

  <img src="/img/elt/snowflake_make_connections.png"/>

- You will automatically be taken to a page to add the set-up details:

  <img src="/img/elt/snowflake_connection_details.png"/>

- Note: for the authorization method, use `Username` and `Password`:

  <img src="/img/elt/snowflake_credentials.png"/>

After the connection is successful, you’ll be taken to a page to define the parameters for the sync. We will be using
`Incremental | Append` and `Manual` for the `Replication Frequency`:

<img src="/img/elt/snowflake_new_connection_details.png"/>

Finally, sync!

<img src="/img/elt/snowflake_final_sync.png"/>

## Step 5: View Stored Data

To view your data, go back to your Snowflake webapp, select your database and schema and run a basic query:

1. Query displaying table with raw data

```sql
SELECT * FROM kyve_test_db.public.evm limit 10;
```

<img src="/img/elt/snowflake_unnormalized_query.png"/>

2. Query displaying table with normalized data

```sql
SELECT * FROM kyve_test_db.public.evm limit 10;
```

<img src="/img/elt/snowflake_normalized_data.jpg"/>

3. Querying data for a given miner
   a) Finding miners with multiple transactions:

   ```sql
   SELECT miner, COUNT(*) as repetition_count
   FROM kyve_test_db.public.evm_value
   GROUP BY miner
   HAVING COUNT(*) > 1
   ORDER BY repetition_count DESC;
   ```

   <img src="/img/elt/snowflake_repeated_miners.jpg"/>

   b) Selecting one and displaying results:

   ```sql
   SELECT * FROM kyve_test_db.public.emv_value
   WHERE MINER = '0x1386fD704760dd6C4DAfa66846b7BB622F32C7b5';
   ```

   <img src="/img/elt/snowflake_records_for_miner.jpg"/>

   c) Showing transactions originating from a given sender:

   ```sql
   -- list senders and receivers
   SELECT "from", "to" FROM kyve_test_db.public.emv_value_transactions limit 10;

   -- query all transactions for a given sender
   SELECT * FROM kyve_test_db.public.emv_value_transactions
   WHERE "from" = '0xd621e901F67c67209b5Bd55F37F4e69c213Fe4AD';
   ```

   <img src="/img/elt/snowflake_transactions_for_give_sender_1.jpg"/>

4. Sample Activity Query:

```sql
-- to avoid re-writing kyve_test_db.public
USE DATABASE kyve_test_db;

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

SELECT TO_TIMESTAMP(evm_value.timestamp) AS timestamp,
    evm_value_transactions."from",
    evm_value_transactions."to",
    evm_value_transactions_value.hex,
    hex_to_numeric(SUBSTR(evm_value_transactions_value.hex, 3)) AS int8_value,
    evm_value_transactions.chainid,
    evm_value_transactions.data
FROM evm_value_transactions
JOIN evm_value ON evm_value._airbyte_value_hashid = evm_value_transactions._airbyte_value_hashid
JOIN evm_value_transactions_value ON evm_value_transactions._airbyte_transactions_hashid = evm_value_transactions_value._airbyte_transactions_hashid
LIMIT 10;
```

<img src="/img/elt/snowflake_query_4.jpg"/>
