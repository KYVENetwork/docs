import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const KSYNCLatestVersion = () => {
  const { errorMsg } = useDocusaurusContext();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/repos/KYVENetwork/ksync/releases/latest`)
      .then(({ data }) => {
        setData(data.tag_name);
      })
      .catch(() => setData(errorMsg));
  }, []);

  if (!data) {
    return <span>-</span>;
  }

  if (data === errorMsg) {
    return <span>-</span>;
  }

  return <span>{data}</span>;
};

export default KSYNCLatestVersion;
