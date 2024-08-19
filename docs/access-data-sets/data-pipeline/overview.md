---
sidebar_position: 0
---
# Overview

The KYVE Data Pipeline is a concept that outlines the flow of data coming from the KYVE Data Lake. Its goal is to establish an infrastructure that allows all KYVE data consumers to access and utilize data in an efficient and user-friendly manner, resulting in a comprehensive data set. The Data Pipeline is composed of four key components:
1. **KYVE Data Lake**: The foundation where all validated data is stored and made available.
2. **[Data Loading Tool](/docs/access-data-sets/data-pipeline/data-load-tool.md)**: A streamlined and efficient method for loading data from the KYVE Data Lake into the desired database.
3. **DBT**: A tool for transforming data to ensure it is readily accessible and usable in a Data Warehouse. _(This tool is currently under development and will be released soon.)_
4. **Data Set**: The ultimate goal of the Data Pipeline: a complete, up-to-date data set that meets all user requirements.

<p align="center">
  <img width="70%" src="/img/elt/how_it_works.png" />
</p>