---
sidebar_position: 2
---
# Add KYVE Source

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

4. You should fill the following fields as show in the figure bellow:

   - **Connector display name**: `Kyve` (here you can put whatever you want)
   - **Docker repository name**: `airbyte/source-kyve`
   - **Docker image tag**: `dev`
   - **Connector Documentation URL**: `https://docs.kyve.network/` 
   

   <img src="/img/elt/airbyte_new_connector2.jpg"/>

Congratulations! You are now ready to create a pipeline with KYVE as a source.