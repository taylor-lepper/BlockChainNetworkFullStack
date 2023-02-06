const { INITIAL_BALANCE, MINIMUM_TRANSACTION_FEE } = require("../config");
const ChainUtil = require("../chain-util");
const Transaction = require("./transaction");

class Wallet {
  constructor(balance, name) {
    this.name = name || ChainUtil.randomNameGenerator();
    this.safeBalance = balance;
    this.confirmedBalance = balance;
    this.pendingBalance = balance;
    this.keyPair = ChainUtil.genKeyPair();
    this.privateKey = "0x" + this.keyPair.getPrivate("hex");
    this.publicKey = "0x" + this.keyPair.getPublic().encode("hex");
    this.address = "0x" + ChainUtil.computeAddressFromPrivKey(this.privateKey);
    this.publicKeyCompressed = ChainUtil.compressPublicKey(this.publicKey);
    this.startTime = "1991-10-01T00:00:00.000Z";
    this.safeStartTime = "1991-10-01T00:00:00.000Z";
    this.confirmedStartTime = "1991-10-01T00:00:00.000Z";
  }

  toString() {
    return `Wallet -
        name        : ${this.name}
        safeBalance : ${this.safeBalance}
        publicKey   : ${this.publicKeyCompressed.toString()}
        privateKey  : ${this.privateKey.toString()}
        address     : ${this.address.toString()}`;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }


  pushIt(blockchain, peers) {
    blockchain.wallets.push(this);
    peers.syncWallets();
  }

  static blockchainWallet() {
    let zero = "0";
    const blockchainWallet = new this(
      BigInt(1000000000000),
      "Mining Rewards Wallet from Genesis"
    );
    blockchainWallet.address = "0x0000000000000000000000000000000000000000";
    blockchainWallet.publicKey = "0x" + zero.repeat(130);
    blockchainWallet.publicKeyCompressed = "0x" + zero.repeat(66);
    blockchainWallet.privateKey = "0x" + zero.repeat(64);
    return blockchainWallet;
  }

  static faucetWallet() {
    const faucetWallet = new this(BigInt(99999999999), "Faucet Wallet ");
    faucetWallet.address = "0x11111111111111111111111111111111111111";
    faucetWallet.privateKey = "0x" + "1".repeat(64);
    return faucetWallet;
  }

  createTransaction(
    senderWallet,
    recipient,
    amount,
    blockchain,
    transactionPool,
    gas
  ) {
  
  this.calculateBalance(blockchain, transactionPool);
  console.log("balances: ", this.safeBalance, this.confirmedBalance, this.pendingBalance);
    if (BigInt(senderWallet.confirmedBalance) < BigInt(amount) + BigInt(gas)) {
      console.log(
        `Amount ${amount} exceeds the current balance: ${senderWallet.confirmedBalance}`
      );
      return {errorMsg: `Amount ${amount} exceeds the current balance: ${senderWallet.confirmedBalance}`};
    }
    // console.log(transactionPool);
    let transaction = transactionPool.isExistingTransaction(this.address);
    if (transaction) {
      // adds to existing outputs
      console.log("existing transaction to update");
      transaction.update(this, recipient, amount, blockchain, gas);
    } else {
      // creates new transaction and updates the transaction pool

      transaction = Transaction.newTransaction(
        senderWallet,
        recipient,
        amount,
        blockchain,
        gas
      );
      //   console.log(transaction);
      transactionPool.updateOrAddTransaction(transaction);
    }
    return transaction;
  }

  calculateBalance(blockchain, transactionPool) {
    let safeBalance, confirmedBalance, pendingBalance;
    const currBlockIndex = blockchain.chain.length - 1;
    // console.log("currBlockIndex ", currBlockIndex);

    let safeTransactions = [];
    let confirmedTransactions = [];
    let pendingTransactions = transactionPool.transactions;


    // get transactions from chain
    for (let i = 1; i < blockchain.chain.length; i++) {
      const block = blockchain.chain[i];
      // console.log(block);
        block.transactions.forEach((transaction) => {
          let currIndex = transaction.minedInBlockIndex;
          // console.log("currIndex ", currIndex);
          currBlockIndex - currIndex >= 6
            ? safeTransactions.push(transaction)
            : confirmedTransactions.push(transaction);
        });
    }

     safeBalance = this.calculateSafeBalance(safeTransactions);
     this.safeBalance = BigInt(safeBalance);
     confirmedBalance = this.calculateConfirmedBalance(
      confirmedTransactions
    );
    this.confirmedBalance = BigInt(confirmedBalance);
    if(pendingTransactions.length === 0){
      console.log("no pending transactions");
      pendingBalance = confirmedBalance;
      this.pendingBalance = BigInt(confirmedBalance); 
    } else{
      console.log("pending transaction exist");
      pendingBalance = this.calculatePendingBalance(pendingTransactions);
      this.pendingBalance = BigInt(pendingBalance);
    }


    // console.log("safeTransactions", safeTransactions);
    // console.log("confirmedTransactions", confirmedTransactions);
    // console.log("pendingTransactions", pendingTransactions);

    
    let currentBlock = blockchain.chain[currBlockIndex];
    this.startTime = currentBlock.transactions[currentBlock.transactions.length -1].input.dateCreated;
    return { safeBalance, confirmedBalance, pendingBalance };
  }

  calculateSafeBalance(safeTransactions) {
    let safeStartTime1 = this.safeStartTime;
    let safeStartTime2 = this.safeStartTime;
    let safeBalance = BigInt(this.safeBalance);
    console.log("safeBalance beginning ", safeBalance);

    // find all transactions matching address
    const safeWalletInputTs = safeTransactions.filter(
      (transaction) => transaction.input.senderAddress === this.address
    );
    // console.log(safeWalletInputTs);


    // if any matching transactions, take only most recent input
    // and set balance to that
    if (safeWalletInputTs.length > 0) {
      // console.log("found input");
      const safeRecentInputT = safeWalletInputTs.reduce((prev, current) =>
        prev.input.dateCreated > current.input.dateCreated ? prev : current
      );

      safeBalance = safeRecentInputT.outputs.find(
        (output) => output.address === this.address
      ).newSenderSafeBalance;
      safeStartTime1 = safeRecentInputT.input.dateCreated;
      safeBalance = BigInt(safeBalance);
    }

    // check time stamp, then add valid outputs to balance
    safeTransactions.forEach((transaction) => {
      if (transaction.input.dateCreated > safeStartTime2) {
        transaction.outputs.find((output) => {
          if (output.address === this.address) {
            if(output.sentAmount){
              safeBalance += BigInt(output.sentAmount);
              safeStartTime2 = transaction.input.dateCreated;
            }
          }
        });
      }
    });
    if(safeStartTime1 > safeStartTime2){
      this.safeStartTime = safeStartTime1;
    }
    this.safeStartTime = safeStartTime2;
    console.log("final safeBalance returned ", safeBalance);
    return safeBalance;
  }

  calculateConfirmedBalance(confirmedTransactions) {
    let startTime1 = this.confirmedStartTime;
    let startTime2 = this.confirmedStartTime;
    let confirmedBalance = BigInt(this.confirmedBalance);
    console.log("confirmedBalance beginning ", confirmedBalance);
    console.log(startTime1, startTime2);
    // find all transactions matching address
    const confirmedWalletInputTs = confirmedTransactions.filter(
      (transaction) => transaction.input.senderAddress === this.address
    );
    // console.log(safeWalletInputTs);


    // if any matching transactions, take only most recent input
    // and set balance to that
    if (confirmedWalletInputTs.length > 0) {
      console.log("found input");
      const confirmedRecentInputT = confirmedWalletInputTs.reduce(
        (prev, current) =>
          prev.input.dateCreated > current.input.dateCreated ? prev : current
      );
      
      confirmedBalance = confirmedRecentInputT.outputs.find(
        (output) => output.address === this.address
      ).newSenderConfirmedBalance;

      confirmedBalance = BigInt(confirmedBalance);

      startTime1 = confirmedRecentInputT.input.dateCreated;
      // console.log("confirmedRecentInputT", confirmedRecentInputT);
    }

    // check time stamp, then add valid outputs to balance
    confirmedTransactions.forEach((transaction) => {
      if (transaction.input.dateCreated > startTime2) {
        transaction.outputs.find((output) => {
          if (output.address === this.address) {
            console.log("found output", output);
            if(output.sentAmount){
              confirmedBalance += BigInt(output.sentAmount);
              startTime2 = transaction.input.dateCreated;
            }
          }
        });
        
      }
    });
    console.log(startTime1, startTime2);
    if(startTime1 > startTime2){
      this.confirmedStartTime = startTime1;
    }
    this.confirmedStartTime = startTime2;
    console.log("final confirmedBalance returned ", confirmedBalance);
    return confirmedBalance;
  }

  calculatePendingBalance(pendingTransactions) {
    let startTime1 = this.startTime;
    let startTime2 = this.startTime;
    let pendingBalance = BigInt(this.pendingBalance);
    console.log("pendingBalance beginning ", pendingBalance);

    // find all transactions matching address
    const pendingWalletInputTs = pendingTransactions.filter(
      (transaction) => transaction.input.senderAddress === this.address
    );
    // console.log(safeWalletInputTs);
 

    // if any matching transactions, take only most recent input
    // and set balance to that
    if (pendingWalletInputTs.length > 0) {
      // console.log("found input");
      const pendingRecentInputT = pendingWalletInputTs.reduce((prev, current) =>
        prev.input.dateCreated > current.input.dateCreated ? prev : current
      );

      pendingBalance = pendingRecentInputT.outputs.find(
        (output) => output.address === this.address
      ).newSenderPendingBalance;
      startTime1 = pendingRecentInputT.input.dateCreated;
      pendingBalance = BigInt(pendingBalance);
    }

    // check time stamp, then add valid outputs to balance
    pendingTransactions.forEach((transaction) => {
      if (transaction.input.dateCreated > startTime2) {
        transaction.outputs.find((output) => {
          if (output.address === this.address) {
            if(output.sentAmount){
              pendingBalance += BigInt(output.sentAmount);
              startTime2 = transaction.input.dateCreated;
            }
          }
        });
      }
    });
    console.log("final pendingBalance returned ", pendingBalance);
    return pendingBalance;
  }
}

module.exports = Wallet;

// test

// let wallet = new Wallet();
// console.log(wallet.toString());

// let wallet2 = new Wallet();
// console.log(wallet2);
