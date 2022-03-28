const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = Block.mineBlock({
      lastBlock,
      data,
    });

    this.chain.push(newBlock);
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
      return false;

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, difficulty, nonce, hash, lastHash, data } = chain[i];
      const lastBlock = chain[i - 1];
      const lastDifficulty = lastBlock.difficulty;

      if (Math.abs(lastDifficulty - difficulty) > 1) return false;
      if (lastBlock.hash !== lastHash) return false;
      const validatedHash = cryptoHash(
        timestamp,
        difficulty,
        nonce,
        data,
        lastHash
      );
      if (hash !== validatedHash) return false;
    }

    return true;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length || !this.isValidChain(chain)) {
      console.error("The incoming chain must be valid and longer");
    } else {
      console.log("Replacing blockchain with incoming chain", chain);
      this.chain = chain;
    }
  }
}

module.exports = Blockchain;
