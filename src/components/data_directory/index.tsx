import React, { useEffect, useMemo, useState } from "react";
import Admonition from "@theme/Admonition";
import TabItem from "@theme/TabItem";
import Tabs from "@theme/Tabs";
import Modal from "../ui/Modal";
import { load } from "js-yaml";
import axios from "axios";

function GetGoal({ runtime, sourcename }) {
  switch (runtime) {
    case "kyvejs/tendermint":
      return (
        <div>
          <h3>Blocks & Block Results</h3>
          We validate and archive all blocks and block results from {
            sourcename
          }{" "}
          permanently and decentralized. With this data it is possible for other
          nodes to block sync the data from KYVE, making expensive archival
          nodes on {sourcename} obsolete in the long run. Additionally, the
          validated & archived block results enable a number of further use
          cases for data analysis.
        </div>
      );
    case "kyvejs/tendermint-ssync":
      return (
        <div>
          <h3>State Sync Snaphots</h3>
          We archive validated state-sync snapshots from {sourcename}{" "}
          permanently and decentralized. With this data, it possible for other
          nodes to quickly state-sync, making expensive archival nodes on{" "}
          {sourcename} obsolete in the long run.
        </div>
      );

    case "kyvejs/tendermint-bsync":
      return (
        <div>
          <h3>Blocks</h3>
          We validate and archive all blocks from {sourcename} permanently and
          decentralized. With this data it is possible for other nodes to block
          sync the data from KYVE, making expensive archival nodes on{" "}
          {sourcename} obsolete in the long run.
        </div>
      );
    case "kyvejs/ethereum-blobs":
      return (
        <div>
          <h3>Blobs</h3>
          We validate and archive all blobs for certain L2s on {sourcename}{" "}
          permanently and decentralized. With this data we want to play a key
          role in the required decentralized storage of these blobs and making
          them a public good for scalable, reliable building on Ethereum. This
          enables a number of further use cases for data analysis and node
          runners in the Ethereum ecosystem.
        </div>
      );
  }
}

const DataDirectory = () => {
  const [selected, setSelected] = useState<any>();
  const [search, setSearch] = useState("");
  const [registry, setRegistry] = useState<any>();

  useEffect(() => {
    const loadRegistry = async () => {
      const { data } = await axios.get(
        "https://raw.githubusercontent.com/KYVENetwork/source-registry/main/.github/registry.yml"
      );
      const parsedRegistry = load(data);
      setRegistry(parsedRegistry);
      setSelected(parsedRegistry["archway-1"]);
    };
    loadRegistry();
  }, []);

  if (!registry || !selected) return "Loading ...";

  const getProperties = (source) => {
    if (source["networks"]["kyve-1"])
      return source["networks"]["kyve-1"].properties;
    if (source["networks"]["kaon-1"])
      return source["networks"]["kaon-1"].properties;
  };

  const logoUrl = (source) => {
    return (
      "https://arweave.net/" + getProperties(source).logo.replace("ar://", "")
    );
  };
  const label = () => {
    return (
      <div className="flex flex-nowrap items-center cursor-pointer select-none border-solid border-borderColor border rounded-md p-2 menu__link dark:text-white text-black font-bold text-xl">
        <img src={logoUrl(selected)} className="w-12 h-12 rounded-md mr-2" />
        {getProperties(selected).title}
      </div>
    );
  };

  const sources = () => {
    return Object.keys(registry)
      .map((x) => registry[x])
      .filter((x) => getProperties(x).title.startsWith(search));
  };

  const pools = (network: string) => {
    if (!selected["networks"][network])
      return (
        <Admonition type="warning">
          {getProperties(selected).title} has no integration for{" "}
          <b>{network}</b>!
        </Admonition>
      );
    const pools = selected["networks"][network]["pools"] as any[];
    const data = (runtime: string) => {
      switch (runtime) {
        case "kyvejs/tendermint":
          return "Blocks & Block Results";
        case "kyvejs/tendermint-ssync":
          return "State Sync Snapshots";
        case "kyvejs/tendermint-bsync":
          return "Blocks";
        case "kyvejs/ethereum-blobs":
          return "L2 Blobs";
      }
      return "/";
    };
    return (
      <>
        <table>
          <tr>
            <th>ID</th>
            <th>Runtime</th>
            <th>Data</th>
          </tr>
          {pools.map((x, i) => (
            <tr key={i}>
              <td>
                <b>{x.id}</b>
              </td>
              <td>
                <code>{x.runtime}</code>
              </td>
              <td>{data(x.runtime)}</td>
            </tr>
          ))}
        </table>
        <h2>What is stored?</h2>
        {pools.map((x, i) => (
          <div key={i} className="my-3">
            <GetGoal
              runtime={x.runtime}
              sourcename={getProperties(selected).title}
            />
          </div>
        ))}
      </>
    );
  };

  const supportsKsync = () => {
    const networks = ["kyve-1", "kaon-1"];
    for (const network of networks) {
      if (!selected["networks"][network]) return false;

      const pools = selected["networks"][network]["pools"] as any[];
      if (pools.find((x) => x.runtime.includes("tendermint"))) return true;
    }
    return false;
  };

  return (
    <>
      <div className="">
        <h2 className="mb-0">Select Source:</h2>
        <div className="flex mt-2">
          <Modal label={label}>
            <div className="flex flex-nowrap items-center menu__link">
              <input
                className="bg-transparent outline-none border-none font-bold text-lg w-48"
                placeholder="Search"
                onChange={(x) => setSearch(x.target.value)}
                autoFocus
                value={search}
                onClick={(e) => e.stopPropagation()}
              />
              <span
                className="cursor-pointer font-bold"
                onClick={(e) => {
                  setSearch("");
                  e.stopPropagation();
                }}
              >
                X
              </span>
            </div>
            <div
              className="max-h-96 overflow-y-scroll"
              style={{ scrollbarWidth: "none" }}
            >
              {sources().map((source, index) => (
                <div
                  key={index}
                  className={
                    "menu__link cursor-pointer flex flex-nowrap " +
                    (source == selected ? "text-primary" : "")
                  }
                  onClick={() => {
                    setSelected(source);
                    setTimeout(() => setSearch(""), 250);
                  }}
                >
                  <img
                    src={logoUrl(source)}
                    className="w-8 h-8 rounded-md mr-2"
                  />
                  {getProperties(source).title}
                </div>
              ))}
            </div>
          </Modal>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1">
        <div className="col-span-3">
          <h2>Pools:</h2>
          <Tabs>
            <TabItem value="mainnet" label="Mainnet">
              {pools("kyve-1")}
            </TabItem>
            <TabItem value="kaon" label="Kaon">
              {pools("kaon-1")}
            </TabItem>
          </Tabs>
        </div>
        <div className="col-span-3">
          <h2>Supported Tools:</h2>
          <table>
            <tr>
              <th>Tool</th>
              <th>Details</th>
              <th>Support</th>
            </tr>
            <tr>
              <td>DLT</td>
              <td>
                Load datasets from KYVE pools to your destination.{" "}
                <a href="./data-pipeline/data-load-tool">Learn more.</a>
              </td>
              <td className={"text-center " + "text-green-500 text-3xl"}>✔</td>
            </tr>
            <tr>
              <td>KSYNC</td>
              <td>
                Rapidly sync blocks and snapshots from KYVE.{" "}
                <a href="./data-pipeline/data-load-tool">Learn more.</a>
              </td>
              <td
                className={
                  "text-center text-3xl " +
                  (supportsKsync() ? "text-green-500" : "text-red-500")
                }
              >
                {supportsKsync() ? "✔" : "✗"}
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default DataDirectory;
