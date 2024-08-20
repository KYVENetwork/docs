import { Card } from "../Card";
import React, { useEffect } from "react";
import sal from "sal.js";

const BuildOverview = () => {
  useEffect(() => {
    sal();
  }, []);

  const CARDS_DETAILED = [
    {
      title: "Protocol Devs",
      img: "",
      href: "/build/development/developing-runtime",
      desc: "Explains everything around runtimes - how to build your own runtime, what runtimes, storage providers, and compressions exist.",
    },
    {
      title: "Web3 devs",
      img: "",
      href: "/build/web3-devs/endpoints",
      desc: "How to use and access the KYVE chain, endpoints, block explorers, indexers, and kyvejs.",
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

export default BuildOverview;
