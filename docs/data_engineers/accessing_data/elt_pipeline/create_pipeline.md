---
sidebar_position: 4
---
# Create a Pipeline

In order to create an end to end test of the ELT pipeline apart from the Source which is the KYVE network, you should configure a destination where the `records` will be stored.

This page will guide you through setting up an ELT pipeline to fetch data from
a [KYVE data pool](https://docs.kyve.network/basics/pools.html) and import it into a local `Postgres` database.


## Postgres Local Deployment

In this step, you will deploy a local `Postgres` database using Docker.

1. Run the following command to create a container of the latest Postgres image:

   ```bash
   docker run --name local-psql -v local_psql_data:/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_PASSWORD=pass -d postgres
   ```

2. To access the Postgres terminal and set up a database for use as the pipeline's destination, run:

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

   A database named `kyvetest` has been created and the user `airbyte_user` with password `pass` now
   has read and write access.

4. Install [pgAdmin 4](https://www.pgadmin.org/download/) management tool.

   Click on "Add New Server" and create a connection with the `kyvetest` database.
   As show in the figure bellow you should add the following parameters:
   - **Maintenance database**: `kyvetest`
   - **Username**: `airbyte_user`
   - **Password**: `pass` (in case you did not modified it from step 3.1) 

   <img src="/img/elt/pgAdmin4_connection.jpg"/>

## Create an ELT pipeline

Now you are ready to go on the Airbyte app ([http://localhost:8000/](http://localhost:8000/)) and create a new
connection.

1. Set up the source.

    In this step you should specify the [Kyve pool](https://app.kyve.network/#/pools) from which you want to 
      retrieve data.
      You can specify a specific **Bundle-Start-ID** in case you want to narrow the records that will be retrieved from the pool.
      You can find the valid bundles of in the KYVE app.

      For this example we choose:
      - **Pool-ID**: `8` which refers to [Evmos chain](https://app.kyve.network/#/pools/8/bundles).
      - **Bundle-Start-ID**: `105395`
      - **KYVE-API URL Base**: *This should remain as is*

   <img src="/img/elt/airbyte_kyve_source.jpg"/>

2. Set up the destination.

   In this step you should add the parameters of Postgres DB that you set [before](#postgres-local-deployment).
   - **DB Name**: `kyvetest`
   - **User**: `airbyte_user`
   - **Password**: `pass`

   <img height="700" src="/img/elt/airbyte_kyve_dest.jpg"/>

3. Final ELT configuration.

   This is the final step where you can modify the pipeline.

   - In the **Transfer** field, you can set how often the data should sync to the destination. For this example, you could set it to `Manual`.
   - In the **Streams** section, you can modify the Namespace, and you can add a Prefix for the data that will be stored.
   - In the **Activate the streams you want to sync** section, you can modify the behavior of the stream in each repetition. For this example, you could set it to `Incremental|Append`, which means that only new records will be stored on each new sync and will be appended in the DB.

   <img height="700" src="/img/elt/airbyte_kyve_elt_conf.jpg"/>

## View Stored Data

For viewing the retrieved data you should open the pgAdmin or any other postgres management tool
that you have installed and connect to the `kyvetest` db that you created on Step 3.

In public schema you may find the retrieved records both in raw and normalized format.

1. Raw format

   <img src="/img/elt/pgAdmin4_raw.jpg"/>

2. Normalized format

   <img src="/img/elt/pgAdmin4_norm.jpg"/>
