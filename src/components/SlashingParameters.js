import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const SlashingParameters = ({ networkUrl }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${networkUrl}/kyve/delegation/v1beta1/params`)
      .then(({ data }) => setData(JSON.stringify(data)))
      .catch((err) => setData(JSON.stringify(err)));
  }, []);

  if (!data) {
    return <div>Loading ...</div>;
  }

  return <span>{data}</span>;
};

export default SlashingParameters;
