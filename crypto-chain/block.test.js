const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("Block", () => {
  const timestamp = "";
  const lastHash = "";
  const hash = "";
  const data = "";

  const newBlock = new Block({ timestamp, lastHash, hash, data });

  it("has a timestamp, lashHash, hash and data property", () => {
    expect(newBlock.timestamp).toEqual(timestamp);
    expect(newBlock.lastHash).toEqual(timestamp);
    expect(newBlock.hash).toEqual(timestamp);
    expect(newBlock.data).toEqual(timestamp);
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
    const lastBlock = Block.genesis();
    const blockData = "mined data";

    const minedBlock = Block.mineBlock({ lastBlock, data: blockData });

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
  });
});
