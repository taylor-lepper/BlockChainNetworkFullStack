// debug help
process.on("warning", (e) => console.warn(e.stack));

// .env
require("dotenv").config({ path: "../.env.local" });

// packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var exec = require("child_process").exec;
var path = require("path");
var parentDir = path.resolve(process.cwd(), "shellScripts");
const asyncHandler = require("express-async-handler");
const rateLimit = require("express-rate-limit");

const { default: axios } = require("axios");

// import files locally
const Blockchain = require("../blockchain");
const Peers = require("./peers");
const Wallet = require("../wallet/index");
const Transaction = require("../wallet/transaction");
const TransactionPool = require("../wallet/transaction-pool");
const Miner = require("./miner");
const ChainUtil = require("../chain-util");
const {} = require("../config");
const Block = require("../blockchain/block");

// get port/host from user or set to defaults
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const HOST = process.env.HOST || "127.0.0.1";

// create server
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// google reCaptcha
async function validateHuman(token) {
  const secret = process.env.REACT_APP_SECRET_KEY;
  // console.log("secret", secret);
  const response = await axios.post(
    `https://google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  );

  console.log("recaptcha data", response.data.success);
  return response.data.success;
}

// limiter for faucet
const limiter = rateLimit({
  windowMs: 3600000,
  max: 1,
  legacyHeaders: true,
  message: "Too many requests, please wait an hour and try again.",
  keyGenerator: (request, response) => request.body.address,
});

// create a blockchain, and transactionPool instance
var blockchain = new Blockchain();
const transactionPool = new TransactionPool(blockchain);
var wallet = new Wallet(BigInt(0));

// create p2p server instance and start it
const peers = new Peers(blockchain, transactionPool, wallet);
peers.listen();

// add wallet to storage
wallet.pushIt(blockchain, peers);
blockchain.replaceWallets(blockchain.wallets);

// create miner instance using all the above
const miner = new Miner(blockchain, transactionPool, wallet, peers);

// =======================================================================
// ======== API ========
// =======================================================================

// ======= get IP api ======
app.get("/ip", (req, res) => {
  let ipAddr = req.socket.remoteAddress;
  return res.status(200).json({ ipAddr });
});

// ======= blocks/chain api =======
app.get(`/blockchain`, (req, res) => {
  return res.status(200).json(blockchain.chain);
});

app.get(`/blockchain/:index`, (req, res) => {
  if (req.params.index > blockchain.getLatestBlock().index) {
    return res.status(400).json("Block does not exist!");
  }
  return res.status(200).json(blockchain.chain[req.params.index]);
});

app.post("/blockchain/reset", (req, res) => {
  transactionPool.clear();
  blockchain.chain = blockchain.chain[0];
  peers.syncChainNew(blockchain);
  blockchain.resetWallets(blockchain.wallets);
  peers.syncWalletsNew(blockchain.wallets);

  return res
    .status(200)
    .json("Resetting the blockchain to Phil Collin's greatest album...");
});

// ======= mining api =======
app.post("/mining/debug", (req, res) => {
  const block = miner.mineDebug();
  //   console.log(`New block added: ${block.toString()}`);
  return res.status(200).json(blockchain.chain);
});

app.post("/mining/job", (req, res) => {
  const address = req.body.address;
  // console.log("address", address);

  const matchingWallet = blockchain.wallets.find((x) => x.address === address);

  if (matchingWallet) {
    console.log("found matching wallet for mining job");
    console.log("current jobs", miner.currentJobs);

    const findCurrentJob = miner.currentJobs.find((x) => x.address === address);
    // has current job?
    if (findCurrentJob) {
      console.log("found a current job");

      //remove old job
      removeObjectWithId(miner.currentJobs, address);

      //create new job
      let job = blockchain.createMiningJob(
        transactionPool,
        matchingWallet.address,
        blockchain,
        peers
      );
      console.log("job", job);

      miner.currentJobs.push({ address: address, job: job });
      console.log("current jobs", miner.currentJobs);
      // console.log(miner.currentJob);
      return res.status(200).json(job);
    }

    // no current job
    let job = blockchain.createMiningJob(
      transactionPool,
      matchingWallet.address,
      blockchain,
      peers
    );
    console.log("job with no previous jobs,", job);

    miner.currentJobs.push({ address: address, job: job });
    // console.log(miner.currentJob);
    return res.status(200).json(job);
  }

  return res.status(400).json({
    errorMsg: "Couldn't find your wallet! Check your address and try again",
  });
});

app.post("/mining/submitBlock", (req, res) => {
  const address = req.body.address;
  console.log("address", address);
  const matchingWallet = blockchain.wallets.find((x) => x.address === address);

  // if address is found
  if (matchingWallet) {
    const findCurrentJob = miner.currentJobs.find((x) => x.address === address);
    // if you dont have a job
    if (!findCurrentJob) {
      return res.status(400).json({
        errorMsg:
          "You need a job Spicoli, or this block has already been mined. Request a new mining job from the node!",
      });
    }

    if (findCurrentJob.index < blockchain.getLatestBlock().index) {
      res.status(400).json({
        errorMsg:
          "This block has already been mined! Grab a new job from the node!",
      });
      return (miner.currentJobs = []);
    }
    const block = miner.solveBlock(findCurrentJob.job, matchingWallet);
    const result = blockchain.validateBlock(
      block,
      transactionPool,
      peers,
      miner,
      findCurrentJob
    );
    // successfully added to chain
    if (result.reward) {
      return res.status(200).json(result);
    }
    return res.status(result.errorCode).json({ errorMsg: result.message });
  } else {
    return res.status(400).json({
      errorMsg: "Couldn't find your wallet! Check your address and try again",
    });
  }
});

// ======= transactions api =======
app.get("/transactions/pending", (req, res) => {
  return res.json(transactionPool.transactions);
});

app.get("/transactions/confirmed", (req, res) => {
  const confirmedFound = blockchain.findConfirmedTransactions();
  const confirmedTransactions = {
    info: "These transactions are from the blockchain",
    quantity: confirmedFound.length,
    confirmedTransactions: confirmedFound,
  };
  return res.json(confirmedTransactions);
});

app.get("/transactions/hash/:hash", (req, res) => {
  const hashToFind = req.params.hash;
  // console.log(hashToFind);
  const hashFound = blockchain.findTransactionByHash(
    hashToFind,
    transactionPool
  );
  if (hashFound.input) {
    return res.status(200).json(hashFound);
  }
  return res.status(400).json(hashFound);
});

app.get("/transactions/address/:address", (req, res) => {
  const addressToFind = req.params.address;
  // console.log(typeof(addressToFind));
  const addressFound = blockchain.wallets.find(
    (wallet) => wallet.address === addressToFind
  );

  if (!addressFound) {
    return res.status(404).json({ errorMsg: "Invalid address" });
  }

  const transactionsFound = blockchain.findTransactionByAddress(addressToFind);
  // console.log(transactionsFound);
  const pendingFound =
    transactionPool.findTransactionPoolByAddress(addressToFind);

  return res.status(200).json([
    {
      info: "These are confirmed transactions from the blockchain",
      quantity: transactionsFound.length,
      transactions: transactionsFound,
    },
    {
      info: "These pending transactions have not been mined yet",
      quantity: pendingFound.length,
      transactions: pendingFound,
    },
  ]);
});

app.post("/transactions/create", (req, res) => {
  var { from, recipient, amount, gas } = req.body;
  console.log(from, recipient, amount, gas);
  amount = Number(amount);
  gas = Number(gas);
  let reg = /^0x[a-fA-F0-9]{40}$/;

  const matchingWallet = blockchain.wallets.find((x) => x.address === from);
  if (!matchingWallet) {
    return res
      .status(400)
      .json({ errorMsg: "No wallet found by that address!" });
  }

  if (recipient === undefined) {
    return res
      .status(400)
      .json({ errorMsg: "Invalid transaction: field 'recipient' is missing" });
  }

  if (!reg.test(recipient)) {
    return res.status(400).json({
      errorMsg: "Invalid transaction: field 'recipient' is not a valid address",
    });
  }

  if (amount === undefined) {
    return res
      .status(400)
      .json({ errorMsg: "Invalid transaction: field 'amount' is missing" });
  }
  if (amount <= 0 || typeof amount !== "number") {
    return res.status(400).json({
      errorMsg:
        "Invalid transaction: field 'amount' must be a number greater than 0",
    });
  }
  if (gas === undefined) {
    return res
      .status(400)
      .json({ errorMsg: "Invalid transaction: field 'gas' is missing" });
  }
  if (gas < 10 || typeof gas === "string") {
    return res.status(400).json({
      errorMsg:
        "Invalid transaction: field 'gas' must be a number of 10 or more",
    });
  }

  if (BigInt(matchingWallet.confirmedBalance) < BigInt(amount) + BigInt(gas)) {
    return res
      .status(400)
      .json({
        errorMsg: `Amount ${amount + gas} exceeds the current balance: ${
          matchingWallet.confirmedBalance
        }`,
      });
  }

  const transaction = matchingWallet.createTransaction(
    matchingWallet,
    recipient,
    BigInt(amount),
    blockchain,
    transactionPool,
    BigInt(gas)
  );
  // console.log("transaction", transaction);
  peers.broadcastTransaction(transaction);
  return res.status(200).json(transactionPool.transactions);
});

// ======= wallet api =======
app.post("/wallet", (req, res) => {
  const key = req.body.privateKey;
  console.log("key", key);
  const matchingWallet = blockchain.wallets.find((x) => x.privateKey === key);
  if (matchingWallet) {
    console.log(matchingWallet);
    return res
      .status(200)
      .json({ wallet: ChainUtil.walletPretty(matchingWallet) });
  }

  return res
    .status(400)
    .json({ message: "No wallet found by that private key!" });
});

app.get("/wallet/all", (req, res) => {
  outPutWallets = [];
  blockchain.wallets.forEach((wallet) => {
    wallet = ChainUtil.walletPretty(wallet);
    outPutWallets.push(wallet);
  });
  return res.status(200).json({
    info: "Info for all Wallets",
    quantity: outPutWallets.length,
    Wallets: outPutWallets,
  });
});

app.get("/wallet/balance/all", (req, res) => {
  outPutWallets = [];
  blockchain.wallets.forEach((wallet) => {
    // console.log(wallet);
    wallet.calculateBalance(blockchain, transactionPool);
    wallet = ChainUtil.walletBalancePretty(wallet);
    outPutWallets.push(wallet);
  });

  return res.status(200).json({
    info: "Balances for all Wallets",
    quantity: outPutWallets.length,
    wallets: outPutWallets,
  });
});

app.get("/wallet/public-key", (req, res) => {
  return res.status(200).json({ publicKey: wallet.publicKey });
});

app.get("/wallet/address", (req, res) => {
  return res.status(200).json({ address: wallet.address });
});

app.get("/wallet/name/:name", (req, res) => {
  const name = req.params.name;
  console.log(name);
  const matchingWallet = blockchain.wallets.find((x) => x.name === name);
  if (matchingWallet) {
    console.log(matchingWallet);
    return res.status(200).json({ address: matchingWallet.address });
  }

  return res.status(400).json({ message: "No wallet found by that name!" });
});

app.get("/wallet/balance/:address", (req, res) => {
  const address = req.params.address;
  console.log(address);
  const matchingWallet = blockchain.wallets.find((x) => x.address === address);
  if (matchingWallet) {
    console.log(matchingWallet);
    const result = matchingWallet.calculateBalance(blockchain, transactionPool);
    return res.status(200).json({ balances: result });
  }

  return res.status(400).json({ message: "No wallet found by that address!" });
});

app.post("/wallet/new", (req, res) => {
  const name = req.body.name;
  const matchingWallet = blockchain.wallets.find((x) => x.name === name);
  if (matchingWallet) {
    return res
      .status(400)
      .json({ message: "That name already exists, please make a unique name" });
  }
  const newWallet = new Wallet(0, name);
  newWallet.pushIt(blockchain, peers);
  // console.log(newWallet);
  return res.status(200).json({ newWallet: ChainUtil.walletPretty(newWallet) });
});

// ======= faucet =======
app.post("/faucet", limiter, async (req, res) => {
  console.log(req.rateLimit);
  const token = req.body.token;
  const human = await validateHuman(token);

  if (!human) {
    return res.status(400).json({ error: "No Decepticons allowed!" });
  }
  let transaction = Transaction.faucetTransaction(
    wallet.address,
    blockchain.faucetWallet,
    blockchain,
    transactionPool,
    BigInt(0)
  );
  // transactionPool.transactions.push(transaction);
  peers.broadcastTransaction(transaction);
  return res.status(200).json({
    info: "Waiting for block to be mined...",
    transaction: transaction,
  });
});

// ======= peers =======

app.post(
  "/peers/connect",
  asyncHandler(async (req, res) => {
    const peerInfo = await peers.info();
    // no peers yet
    if (typeof peerInfo === "string") {
      exec("connect.sh", { cwd: parentDir }, function (error, stdout, stderr) {
        // if you also want to change current process working directory:
        process.chdir(parentDir);
      });
      return res.status(200).json({
        message: "A new terminal has opened! You are now connected!",
        port: 3002,
      });
    } else {
      // peers exist
      let length = peerInfo.peers;
      // console.log(length);
      exec(
        `connect${length}.sh`,
        { cwd: parentDir },
        function (error, stdout, stderr) {
          // if you also want to change current process working directory:
          process.chdir(parentDir);
        }
      );
      return res.status(200).json({
        message: "A new terminal has opened! You are now connected!",
        port: 3002 + length,
      });
    }
  })
);

app.get("/peers/info", async (req, res) => {
  const result = await peers.info();
  console.log(result);
  return res.status(200).json(result);
});

app.get("/peers/debug", (req, res) => {
  const result = peers.debug(blockchain.wallets);
  console.log(result);
  return res.status(200).json(result);
});

app.get("/peers/all", (req, res) => {
  // let result = Object.fromEntries(peers.listAll());
  let result = peers.listAll();
  let resultsArray = [];
  result.forEach((value, key) => {
    resultsArray.push({ id: key, url: value });
  });
  return res.status(200).json(resultsArray);
});

app.post("/peers/disconnect", (req, res) => {
  function killServer() {
    process.exit(0);
  }
  peers.disconnect();
  res
    .status(200)
    .json(
      `Peer has been disconnected from port ${
        peers.port
      }, Server has been terminated on port ${peers.port - 2000}.`
    );
  server.close();
  setTimeout(killServer, 5000);
  return;
});

app.get("/peers/sockets", (req, res) => {
  return res.status(200).json(peers.listSockets());
});

// =======================================================================
// ======== API END ========
// =======================================================================

// server config

var server = app.listen(HTTP_PORT, HOST, () => {
  const host = server.address().address;
  const port = server.address().port;
  // console.log(host, port);
  console.log(`Listening on http://${host}:${port}`);
});

// helper function

function removeObjectWithId(arr, address) {
  const objWithIdIndex = arr.findIndex((obj) => obj.address === address);

  if (objWithIdIndex > -1) {
    arr.splice(objWithIdIndex, 1);
  }

  return arr;
}

// test

// let bigNum = BigInt(5000000000000);
// let bigNum2 = BigInt(2222222);
// console.log((bigNum + bigNum2) + "");

// let date = new Date().toISOString();
// console.log(date);
