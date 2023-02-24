# Tutorial: KYVE Data Pipeline - Postgres

The KYVE Data Pipeline enables easy import of KYVE data into any data warehouse or destination
supported by [Airbyte](https://airbyte.com/). With the [ELT](https://en.wikipedia.org/wiki/Extract,_load,_transform)
format, data analysts and engineers can now confidently source KYVE data without worrying about its validity or
reliability.

This tutorial will guide you through setting up an ELT pipeline to fetch data from
a [KYVE data pool](https://docs.kyve.network/basics/pools.html) and import it into a local `Postgres` database.

## Table of Contents

- [KYVE Data Pipeline - Postgres](#kyve-data-pipeline---postgres)
  - [Table of Contents](#table-of-contents)
  - [System Requirements](#system-requirements)
    - [Windows](#windows)
    - [Mac](#mac)
    - [Linux](#linux)
  - [Step 1: Airbyte Local Deployment](#step-1-airbyte-local-deployment)
  - [Step 2: Add KYVE Source](#step-2-add-kyve-source)
  - [Step 3: Postgres Local Deployment](#step-3-postgres-local-deployment)
  - [Step 4: Create an ELT pipeline](#step-4-create-an-elt-pipeline)
  - [Step 5: View Stored Data](#step-5-view-stored-data)

## System Requirements

### Windows

For Windows users, the Windows Subsystem for Linux 2 (WSL2) must be installed. You must be running Windows 10 version
2004 or higher (build 19041 or higher), or Windows 11 to use the commands in this tutorial.

1. Open PowerShell or the Windows Command Prompt in `administrator` mode, then enter the following command to install
   WSL2:

   ```bat
   wsl --install
   ```

   Note: In case the installation command returns _"This application requires the Windows Subsystem for Linux
   Optional Component"_, you should run:

   ```bat
   Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
   ```

2. Restart your machine after installation.

3. To ensure that WSL2 has been installed successfully, run the following command:

   ```bat
    wsl -l -v
   ```

   Expected output:

   ```bat
     NAME                   STATE           VERSION
   * Ubuntu                 Running         2
   ```

4. After you've set up WSL2 successfully, install `Docker desktop on Windows` by following the
   steps [here](https://docs.docker.com/desktop/install/windows-install/).

### Mac

We will be utilizing `brew` in order to install Docker Desktop and `docker-compose` on Mac. In order to install `brew`
please follow the instructions listed [here](https://brew.sh/).

1. You are now ready to install Docker Desktop and `docker-compose`. Run the following command on your terminal:

   ```sh
   brew install docker docker-compose
   ```

### Linux

1. In order to install Docker and `docker-compose` on Linux, please follow the instructions
   listed [here](https://docs.docker.com/engine/install/) and choose your Linux distribution. Remember to also run the
   Post-installation steps listed [here](https://docs.docker.com/engine/install/linux-postinstall/).

## Step 1: Airbyte Local Deployment

In this step, we'll deploy Airbyte locally on your machine. Make sure you have installed Docker and Docker Compose on
your system.

To deploy Airbyte locally, run the following commands in your terminal:

```sh
  git clone https://github.com/KYVENetwork/DataPipeline.git

  cd DataPipeline

  docker-compose up
```

After the deployment is complete, you'll be able to access the Airbyte UI at <http://localhost:8000/>.
The default credentials are:

```sh
BASIC_AUTH_USERNAME=airbyte
BASIC_AUTH_PASSWORD=password
```

When you access the UI, you'll be taken to the onboarding page. You have the option to enter your email to receive
updates about Airbyte. If you choose to do so, enter your email and continue.

<img height="500" src="/img/elt/airbyte_preferences.png" />

## Step 2: Add KYVE Source

In this step, you will configure the `KYVE` source for your Airbyte deployment.

1. Change to the `source-kyve` directory:

   ```sh
   cd DataPipeline/airbyte-integrations/connectors/source-kyve
   ```

2. Build the docker image for the Kyve source:

   ```sh
   docker build . -t airbyte/source-kyve:dev
   ```

3. In the Airbyte UI, navigate to the settings page and add a new source connector.

   <img src="/img/elt/airbyte_new_connector.jpg"/>

   <img src="/img/elt/airbyte_new_connector2.jpg"/>

Congratulations! You are now ready to create a pipeline with KYVE as a source.

## Step 3: Postgres Local Deployment

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

   <img src="/img/elt/pgAdmin4_connection.jpg"/>

## Step 4: Create an ELT pipeline

Now you are ready to go on the Airbyte app ([http://localhost:8000/](http://localhost:8000/)) and create a new
connection.

1. Set up the source.

   <img src="/img/elt/airbyte_kyve_source.jpg"/>

2. Set up the destination.

   <img height="700" src="/img/elt/airbyte_kyve_dest.jpg"/>

3. Final ELT configuration.

   <img height="700" src="/img/elt/airbyte_kyve_elt_conf.jpg"/>

## Step 5: View Stored Data

For viewing the retrieved data you should open the pgAdmin or any other postgres management tool
that you have installed and connect to the `kyvetest` db that you created on Step 3.

In public schema you may find the retrieved records both in raw and normalized format.

1. Raw format

   <img src="/img/elt/pgAdmin4_raw.jpg"/>

2. Normalized format

   <img src="/img/elt/pgAdmin4_norm.jpg"/>
