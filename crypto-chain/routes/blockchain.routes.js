const express = require("express");
const Blockchain = require("../blockchain-logic/blockchain");
const blockchain = new Blockchain();

const router = express.Router();

router.post("/blocks", (req, res) => {
  return res.status(200).json(blockchain.chain);
});

module.exports = router;
