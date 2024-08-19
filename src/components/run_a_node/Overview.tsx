import { Card } from "../Card";
import React, { useEffect } from "react";
import sal from "sal.js";

const TrustlessAPIOverview = () => {
  useEffect(() => {
    sal();
  }, []);

  const CARDS_DETAILED = [
    {
      title: "Protocol node",
      img: "",
      href: "/run-a-node/protocol-nodes/overview",
      desc: "A Protocol node is a validator on the protocol level. Their main tasks are connecting to data pools and uploading and validating data from various data sources, archiving them on a web3 storage provider like Arweave.",
    },
    {
      title: "Chain node",
      img: "",
      href: "/run-a-node/chain-nodes/overview",
      desc: "A Chain node is a validator in a Cosmos based Proof of Stake blockchain. Their main tasks are finding consensus on the chain state which includes keeping track of the data pools and other related data.",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {CARDS_DETAILED.map((x, i) => (
          <div
            className="col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1"
            key={i}
          >
            <Card
              href={x.href}
              img={x.img}
              className="p-8"
              delay={(i % 4) * 150}
            >
              <div className="font-bold text-3xl mt-16">{x.title}</div>
              <div className="mt-4">{x.desc}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustlessAPIOverview;
