// hashing function
const lightningHash = (data) => {
    return data + "*";
  };
  
  // create block class
  class Block {
    constructor(data, hash, lashHash) {
      this.data = data;
      this.hash = hash;
      this.lashHash = lashHash;
    }
  }
  
  // Blockchain class
  class Blockchain {
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
  
    createGenesisBlock() {
      return new Block("Genesis Block", "0", "0");
    }
  
    getLatestBlock() {
      return this.chain[this.chain.length - 1];
    }
  
    addBlock(data) {
      const lastHash = this.getLatestBlock().hash;
      const hash = lightningHash(data + lastHash + this.chain.length);
      const block = new Block(data, hash, lastHash);
      this.chain.push(block);
    }
  
    isChainValid() {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const lashBlock = this.chain[i - 1];
  
        if (
          currentBlock.hash !==
          lightningHash(currentBlock.data + lashBlock.hash + i)
        ) {
          return false;
        }
      }
      return true;
    }
  }
  
  // Creating Blockchain
  const fooBlockchain = new Blockchain();
  
  fooBlockchain.addBlock("first block");
  fooBlockchain.addBlock("two block");
  fooBlockchain.addBlock("three block");
  fooBlockchain.addBlock("fourth block");
  
  console.log("fooBlockchain >>>", fooBlockchain, {
    isBlockchainValid: fooBlockchain.isChainValid(),
  });
  