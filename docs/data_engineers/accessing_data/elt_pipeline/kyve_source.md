---
sidebar_position: 2
---
# KYVE Source Setup

In this step, you will configure the `KYVE` source for your Airbyte deployment.

1. In a new terminal window change to the `source-kyve` directory:

   ```sh
   cd airbyte-integrations/connectors/source-kyve
   ```

2. Build the Docker image for the KYVE source:

   ```sh
   docker build . -t airbyte/source-kyve:dev
   ```

3. In the Airbyte UI, navigate to the settings page and add a new source connector.

   <img src="/img/elt/airbyte_new_connector.jpg" alt="Airbyte Settings" />

4. Fill out the fields as follows, then click Add:

   - **Connector display name**: `KYVE` (or any other name)
   - **Docker repository name**: `airbyte/source-kyve`
   - **Docker image tag**: `dev`
   - **Connector documentation URL**: `https://docs.kyve.network/`

   <br></br>
   <img src="/img/elt/airbyte_new_connector2.jpg" alt="Airbyte Add New Connector" />

Congratulations! You are now ready to set up KYVE as a source and create a data pipeline.
