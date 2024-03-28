import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import React, { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import DocSidebarItems from "@theme-original/DocSidebarItems";
import { useHistory } from "@docusaurus/router";

interface Pools {
  hex: string;
  name: string;
  logo: string;
}

const SearchSVG = (props) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" {...props}>
      <path
        d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
        stroke="currentColor"
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  );
};

function useSelectedPool(
  pools: Pools[],
  props: any
): [Pools, (newSelected: Pools) => void, any] {
  const [selected, internalSetSelected] = useState(pools[0]);
  const histroy = useHistory();
  const poolNavHref = props.item.items.find((x) =>
    x.items.find((y) => y.href === props.activePath)
  );
  if (poolNavHref && poolNavHref.label != selected.name) {
    internalSetSelected(pools.find((x) => x.name == poolNavHref.label)!);
  }
  const selectedPoolNavbar = props.item.items.find(
    (x) => x.label == selected.name
  );

  const setSelected = (newSelected: Pools) => {
    const newItems = props.item.items.find((x) => x.label == newSelected.name);
    histroy.push(newItems.items[0].href);
    internalSetSelected(newSelected);
  };

  return [selected, setSelected, selectedPoolNavbar.items];
}

const PoolSelect = (props) => {
  const { siteConfig } = useDocusaurusContext();
  const [search, setSearch] = useState("");
  const pools = siteConfig.customFields!.pools as Pools[];
  const logoUrl = (logo: string) =>
    "https://arweave.net/" + logo.replace("ar://", "");
  const [selected, setSelected, poolNavbar] = useSelectedPool(pools, props);
  const label = () => {
    return (
      <div className="flex flex-nowrap items-center cursor-pointer select-none menu__link">
        <img src={logoUrl(selected.logo)} className="w-8 h-8 rounded-md mr-2" />
        {selected.name}
        <div className="ml-auto">
          <SearchSVG />
        </div>
      </div>
    );
  };

  const filteredPools = () =>
    pools.filter((x) => x.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
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
          {filteredPools().map((pool, index) => (
            <div
              key={index}
              className={
                "menu__link cursor-pointer flex flex-nowrap " +
                (pool == selected ? "text-primary" : "")
              }
              onClick={() => {
                setSelected(pool);
                setTimeout(() => setSearch(""), 250);
              }}
            >
              <img
                src={logoUrl(pool.logo)}
                className="w-8 h-8 rounded-md mr-2"
              />
              {pool.name}
            </div>
          ))}
        </div>
      </Modal>
      <ul className="menu__list">
        <DocSidebarItems
          items={poolNavbar}
          tabIndex={0}
          activePath={props.activePath}
          level={props.level + 1}
        />
      </ul>
    </>
  );
};

export default PoolSelect;
