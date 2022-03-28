const express = require("express");
const blockchainRoutes = require("../routes/blockchain.routes");

const router = express.Router();
const defaultRoutes = [{ path: "/blockchain", route: blockchainRoutes }];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
