import React, { useEffect } from "react";
import DocSidebarItem from "@theme-original/DocSidebarItem";
import PoolSelect from "../../components/pools/PoolSelect";
import sal from "sal.js";

const CustomComponents = {
  "pool-select": PoolSelect,
};

export default function DocSidebarItemWrapper(props) {
  useEffect(() => {
    sal();
  }, []);
  const CustomComponent = CustomComponents[props.item?.customProps?.type];
  if (CustomComponent) {
    return <CustomComponent {...props} />;
  }
  return (
    <>
      <div data-sal="slide-up">
        <DocSidebarItem {...props} />
      </div>
    </>
  );
}
