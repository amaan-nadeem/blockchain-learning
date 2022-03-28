const { GENESIS_DATA, MINE_RATE } = require("../config/config");
const cryptoHash = require("./crypto-hash");
const hashToBinary = require("hex-to-binary");

class Block {
  constructor({ timestamp, lastHash, hash, data, difficulty, nonce }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    let hash, timestamp;
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce++;
      timestamp = Date.now();
      difficulty = this.adjustDifficulty({
        originalBlock: lastBlock,
        timestamp,
      });
      hash = cryptoHash(timestamp, difficulty, nonce, lastHash, data);
    } while (
      hashToBinary(hash).substring(0, difficulty) !== "0".repeat(difficulty)
    );
    return new this({ timestamp, difficulty, nonce, lastHash, hash, data });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    const diffAdjustment = timestamp - originalBlock.timestamp;

    if (difficulty < 1) return 1;

    return diffAdjustment > MINE_RATE ? difficulty - 1 : difficulty + 1;
  }
}

module.exports = Block;
