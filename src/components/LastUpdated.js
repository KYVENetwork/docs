import React from "react";
import { useState, useEffect } from "react";

const LastUpdated = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(new Date().toLocaleString());
  }, []);

  if (!data) {
    return <span>Loading ...</span>;
  }

  return <span>{data}</span>;
};

export default LastUpdated;
