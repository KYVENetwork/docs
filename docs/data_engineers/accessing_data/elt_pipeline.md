# KYVE DataPipeline

The KYVE ELT-Pipeline allows developers to connect KYVE to their favorite
data warehouse or destination.

## Quick start

### Starting Airbyte

```bash
git clone https://github.com/KYVENetwork/DataPipeline.git

docker-compose up
```

Now visit [http://localhost:8000](http://localhost:8000)

Here is a [step-by-step guide](https://github.com/airbytehq/airbyte/tree/e378d40236b6a34e1c1cb481c8952735ec687d88/docs/quickstart/getting-started.md) showing you how to load data from an API into a file, all on your computer.

### Adding the KYVE Source

```bash
cd airbyte-integrations/connectors/source-kyve
docker build . -t airbyte/source-kyve:dev
```

Now visit [http://localhost:8000](http://localhost:8000) and follow [this guide](https://docs.airbyte.com/integrations/custom-connectors/#adding-your-connectors-in-the-ui).
