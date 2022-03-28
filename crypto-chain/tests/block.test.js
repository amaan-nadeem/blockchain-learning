const { GENESIS_DATA, MINE_RATE } = require("../config/config");
const hashToBinary = require("hex-to-binary");
const Block = require("../blockchain-logic/block");
const cryptoHash = require("../blockchain-logic/crypto-hash");

describe("Block", () => {
  const timestamp = 2000;
  const lastHash = "foo-hash";
  const hash = "bar-hash";
  const data = ["blockchain", "data"];
  const nonce = 1;
  const difficulty = 1;

  const newBlock = new Block({
    timestamp,
    lastHash,
    hash,
    data,
    difficulty,
    nonce,
  });

  const lastBlock = Block.genesis();
  const blockData = "mined data";
  const minedBlock = Block.mineBlock({
    lastBlock,
    difficulty,
    nonce,
    data: blockData,
  });

  it("has a timestamp, lashHash, hash and data property", () => {
    expect(newBlock.timestamp).toEqual(timestamp);
    expect(newBlock.lastHash).toEqual(lastHash);
    expect(newBlock.hash).toEqual(hash);
    expect(newBlock.data).toEqual(data);
    expect(newBlock.difficulty).toEqual(difficulty);
    expect(newBlock.nonce).toEqual(nonce);
  });

  describe("genesis()", () => {
    const genesisBlock = Block.genesis();

    it("returns a Block instance", () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it("returns the genesis data", () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe("mineBlock()", () => {
    it("returns a Block instance", () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it("sets the `lastHash` to be the `hash` of the lastBlock", () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it("sets the `data`", () => {
      expect(minedBlock.data).toEqual(blockData);
    });

    it("sets a `timestamp`", () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    it("check if the created block `hash` matches the difficulty", () => {
      expect(
        hashToBinary(minedBlock.hash).substring(0, minedBlock.difficulty)
      ).toEqual("0".repeat(minedBlock.difficulty));
    });

    it("creates a SHA-256 `hash` based on the proper inputs", () => {
      expect(minedBlock.hash).toEqual(
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.difficulty,
          minedBlock.nonce,
          lastBlock.hash,
          blockData
        )
      );
    });

    it("adjust the difficulty", () => {
      const possibleResult = [
        lastBlock.difficulty - 1,
        lastBlock.difficulty + 1,
      ];

      expect(possibleResult.includes(minedBlock.difficulty)).toBe(true);
    });
  });

  describe("adjustDifficulty()", () => {
    it("raises the difficulty for a quickly mined block", () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: newBlock,
          timestamp: newBlock.timestamp + MINE_RATE - 100,
        })
      ).toEqual(newBlock.difficulty + 1);
    });
    it("lowers the difficulty for a slowly mined block", () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: newBlock,
          timestamp: newBlock.timestamp + MINE_RATE + 100,
        })
      ).toEqual(newBlock.difficulty - 1);
    });

    it("has a lower limit of 1", () => {
      newBlock.difficulty = -1;
      expect(
        Block.adjustDifficulty({
          originalBlock: newBlock,
        })
      ).toEqual(1);
    });
  });
});
