const Blockchain = require("./blockchain");
const blockchain = new Blockchain();
let prevTimestamp, nextTimestamp, timestampDiff, averageTime, nextBlock;
let times = [0];

for (let i = 0; i <= 10000; i++) {
  prevTimestamp = blockchain.chain[blockchain.chain.length - 1].timestamp;
  blockchain.addBlock({ data: `block ${i}` });
  nextBlock = blockchain.chain[blockchain.chain.length - 1];
  nextTimestamp = nextBlock.timestamp;
  timestampDiff = nextTimestamp - prevTimestamp;
  if (i > 0) {
    times.push(timestampDiff);
  }
  averageTime = times.reduce((total, num) => total + num) / times.length;

  console.log(
    `Time to mine block: ${timestampDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time: ${averageTime}ms`
  );
}
