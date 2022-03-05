const HelloWorld = artifacts.require("HelloWorld");
const HelloWorldPermanent = artifacts.require("HelloWorldPermanent");

contract("HelloWorld", (accounts) => {
  // write test in here;
});

contract("HelloWorldPermanent", (accounts) => {
  console.log("total accounts >>>", accounts);
  // write test in here;

  it("Constructor should set message correctly", async () => {
    let instance = await HelloWorld.deployed();
    let message = await instance.message();
    assert.equal(message, "Hello World Constructor!");
  });

  it("Owner should be accounts[0]", async () => {
    let instance = await HelloWorld.deployed();
    let owner = await instance.owner();
    assert.equal(owner, accounts[0]);
  });
});
