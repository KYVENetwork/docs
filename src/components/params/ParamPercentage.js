import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const ParamPercentage = ({
  network = "mainnet",
  module,
  param,
  project = "kyve",
  version = "v1beta1",
}) => {
  const { siteConfig, errorMsg } = useDocusaurusContext();
  const {
    customFields: {
      [network]: { rest },
    },
  } = siteConfig;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${rest}/${project}/${module}/${version}/params`)
      .then(({ data: { params } }) =>
        setData((parseFloat(params[param]) * 100).toFixed(2))
      )
      .catch(() => setData(errorMsg));
  }, []);

  if (!data) {
    return <span>-</span>;
  }

  if (data === errorMsg) {
    return <span>-</span>;
  }

  return (
    <span>
      <strong>{data}</strong> %
    </span>
  );
};

export default ParamPercentage;
