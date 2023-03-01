import React from "react";
import { useState, useEffect } from "react";

const LastUpdated = () => {
  const ERROR_MSG = "error";

  const [data, setData] = useState([]);

  useEffect(() => {
    setData(new Date().toLocaleString());
  }, []);

  if (!data) {
    return <span>Loading ...</span>;
  }

  if (data === ERROR_MSG) {
    return <span>{ERROR_MSG}</span>;
  }

  return <span>{data}</span>;
};

export default LastUpdated;
