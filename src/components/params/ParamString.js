import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const ParamString = ({
  network = "mainnet",
  module,
  param,
  project = "kyve",
  version = "v1beta1",
}) => {
  const { siteConfig } = useDocusaurusContext();
  const {
    customFields: {
      [network]: { rest },
    },
  } = siteConfig;

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${rest}/${project}/${module}/${version}/params`)
      .then(({ data: { params } }) => setData(params[param]))
      .catch(() => setData("-"));
  }, []);

  if (!data) {
    return <span>-</span>;
  }

  return (
    <span>
      <strong>{data}</strong>
    </span>
  );
};

export default ParamString;
