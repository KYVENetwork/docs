import { useCurrentSidebarCategory } from "@docusaurus/theme-common";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

export const getPool = () => {
  const { siteConfig } = useDocusaurusContext();
  const name = useCurrentSidebarCategory().label;
  const result = siteConfig.customFields.pools.find((x) => x.name == name);
  return result;
};
