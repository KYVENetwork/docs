---
sidebar_position: 1
---

# Postgres Destination

This page will guide you through setting up an ELT pipeline to fetch data from
a [KYVE data pool](/introduction/architecture.md) and import it into a local `Postgres` database.

## Postgres Setup

In this step, you will deploy a local `Postgres` database using Docker.

1. Run the following command to create a container with the latest Postgres image:

   ```bash
   docker run --name local-psql -v local_psql_data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=pass -d postgres
   ```

2. Access the Postgres terminal to set up a database for the pipeline's destination:

   ```bash
   docker exec -it local-psql psql -U postgres
   ```

3. In the Postgres terminal, run the following commands:

   ```sql
   CREATE DATABASE kyvetest;
   ```

   ```sql
   CREATE USER airbyte_user WITH ENCRYPTED PASSWORD 'pass';
   ```

   ```sql
   GRANT ALL PRIVILEGES ON DATABASE kyvetest to airbyte_user;
   ```

   ```sql
   \connect kyvetest
   ```

   ```sql
   GRANT ALL ON SCHEMA public to airbyte_user;
   ```

   ```sql
   \quit
   ```

   A database named `kyvetest` has been created and the user `airbyte_user` with password `pass` now
   has read and write access.

4. Install the [pgAdmin 4](https://www.pgadmin.org/download/) Postgres management tool, for example with Homebrew:

   ```sh
   brew install --cask pgadmin4
   ```

5. Run pgAdmin and click on "Add New Server". Give it a name, for example `local-psql`, and in the "Connections" tab fill out the fields as follows:

   - **Host name/address**: `localhost`
   - **Maintenance database**: `kyvetest`
   - **Username**: `airbyte_user`
   - **Password**: `pass` (in case you did not modify it in step 3)

   <br></br>
   <img src="/img/elt/pgAdmin4_connection.jpg" alt="pgAdmin Add New Server" />

## Configure Airbyte

Now you're ready to create the connection in Airbyte (<http://localhost:8000/>).

1. Set up the source.

   Search for "KYVE" in the `Sources search bar` and select it.

   In this step you specify the [KYVE pools](https://app.korellia.kyve.network/#/pools) from which you want to retrieve data, identified by **Pool-IDs**.

   You can also specify **Bundle-Start-IDs** for each pool, in order to limit the records that will be retrieved from that pool. In the KYVE app you can find the bundles for each pool, for example [these](https://app.korellia.kyve.network/#/pools/8/bundles) are the bundles for Pool-ID `8`, the Evmos chain.

   For this example we choose to ingest only the Evmos chain.

    - **Source Name**: KYVE
    - **Pool-IDs**: `8`
    - **Bundle-Start-IDs**: `105395`
    - **KYVE-API URL Base**: *This should remain as is*.

   <br></br>
   <img src="/img/elt/airbyte_kyve_source.jpg" alt="Airbyte set up source" />

   ***NOTE***: The **Bundle-Start-IDs** determines the size of the extracted data. This also affects the time required for completing
   the sync process, up to several hours for historic data. It is advised for testing purposes to visit the [KYVE network Polls page](https://app.korellia.kyve.network/#/pools) and to select a recent bundle ID (2-5 days old).

2. Set up the destination.

   Search for "Postgres" in the `Destinations search bar` and select it.

   Add the parameters of the Postgres DB that you configured [here](#postgres-setup):

   - **Destination type**: Postgres Local
   - **DB Name**: `kyvetest`
   - **User**: `airbyte_user`
   - **Password**: `pass`

   <br></br>
   <img src="/img/elt/airbyte_kyve_dest.jpg" alt="Airbyte set up destination" width="800px;" />

3. Final ELT configuration.

   Select the `KYVE Source` that you have configured in step 1 and the `Postgres Destination` from step 2.
   In this step you can make final modifications to the pipeline.

   - In the **Transfer** field, you can set how often the data should sync to the destination. For this example, we set it to `Manual`.
   - In the **Streams** section, you can modify the Namespace, and you can add a Prefix for the data that will be stored. In this example we added the word `evmos` so the tables in postgres will be named `evmospool_0_...`.
   - In the **Activate the streams you want to sync** section, you can modify the behavior of the stream in each repetition. For this example, you could set it to `Incremental|Append`, which means that only new records will be stored on each new sync and will be appended in the DB.

   <br></br>
   <img src="/img/elt/airbyte_kyve_elt_conf.jpg" alt="Airbyte ELT configuration" width="700px;" />

4. Run the initial sync.

   Click **Sync Now**. You can track progress by clicking "Sync Running". Depending on how you configured the source in Step 1 this may take a while.

## View Stored Data

For viewing the retrieved data, open pgAdmin (or any other Postgres management tool that you have installed) and connect to the `kyvetest` database that you created in [Step 3](#postgres-setup).

In the `public` schema, you will find the retrieved records in both raw and normalized formats.

1. Raw format

   <img src="/img/elt/pgAdmin4_raw.jpg" alt="pgAdmin raw data" />

2. Normalized format

   <img src="/img/elt/pgAdmin4_norm.jpg" alt="pgAdmin normalized data" />

That's it! You've successfully created an end-to-end ELT pipeline fetching data from a KYVE data pool and importing it into a local Postgres database.
