import React from "react";
import DocSidebarItem from "@theme-original/DocSidebarItem";
import PoolSelect from "../../components/pools/PoolSelect";

const CustomComponents = {
  "pool-select": PoolSelect,
};

export default function DocSidebarItemWrapper(props) {
  const CustomComponent = CustomComponents[props.item?.customProps?.type];
  if (CustomComponent) {
    return <CustomComponent {...props} />;
  }

  return (
    <>
      <DocSidebarItem {...props} />
    </>
  );
}
