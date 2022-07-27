export default ({ router }) => {
  router.addRoutes([
    { path: "/getting-started/chain-node.html", redirect: "/validators/chain-node" },
    { path: "/getting-started/protocol-node.html", redirect: "/validators/protocol-node" },
    { path: "/getting-started/accessing-data/", redirect: "/developers/accessing-data/basic-queries.html" },
  ]);
};
