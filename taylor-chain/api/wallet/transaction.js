const ChainUtil = require("../chain-util");
const {
  MINING_REWARD,
  MINIMUM_TRANSACTION_FEE,
  FAUCET_REWARD,
} = require("../config");

class Transaction {
  constructor() {
    this.input = null;
    this.outputs = [];
  }

  static transactionWithOutputs(senderWallet, outputs, blockchain) {
    const transaction = new this();
    // console.log("trans w/outputs", transaction);
    transaction.outputs.push(...outputs);
    Transaction.signTransaction(transaction, senderWallet, blockchain);
    return transaction;
  }

  static newTransaction(senderWallet, recipient, amount, blockchain, gas) {
    console.log(senderWallet.safeBalance);

    if (BigInt(amount > senderWallet.safeBalance)) {
      console.log(
        `Amount : ${amount} exceeds the balance ${senderWallet.safeBalance}`
      );
      return "Not enough balance to create transaction!";
    }

    // use helper function to create and sign transaction outputs
    return Transaction.transactionWithOutputs(
      senderWallet,
      [
        {
          newSenderPendingBalance: senderWallet.safeBalance - amount - gas,
          address: senderWallet.address,
        },
        { sentAmount: amount, gas: gas, address: recipient },
      ],
      blockchain
    );
  }

  // update an existing transaction
  update(senderWallet, recipient, amount, blockchain, gas) {
    const senderOutput = this.outputs.find(
      (output) => output.address === senderWallet.address
    );

    if (BigInt(amount > senderWallet.safeBalance)) {
      console.log(
        `Amount ${amount} exceeds balance ${senderWallet.safeBalance}`
      );
      return "Not enough balance to create transaction!";
    }

    senderOutput.newSenderPendingBalance =
      senderOutput.newSenderPendingBalance - amount - gas;
    this.outputs.push({
      sentAmount: BigInt(amount),
      gas: BigInt(gas),
      address: recipient,
    });
    Transaction.signTransaction(this, senderWallet, blockchain);
    console.log("updating and signing transaction");

    return this;
  }

  static signTransaction(transaction, senderWallet, blockchain) {
    let date = new Date().toISOString();
    let outputs = transaction.outputs[1];
    let hash = ChainUtil.hash(
      senderWallet.address,
      outputs.address,
      outputs.sentAmount,
      outputs.gas,
      date,
      senderWallet.publicKey
  );

    // for mining rewards
    if(senderWallet.address === "blockchain-reward-wallet"){
      let zero = "0";
      transaction.input = {
        transactionHash: hash,
        dateCreated: date,
        senderConfirmedBalance: senderWallet.confirmedBalance,
        senderAddress: senderWallet.address,
        senderPublicKey: senderWallet.publicKey,
        signature: {r: zero.repeat(64), s: zero.repeat(64)},
      };
      return;
    }
    // normal
    transaction.input = {
      transactionHash: hash,
      dateCreated: date,
      senderConfirmedBalance: senderWallet.confirmedBalance,
      senderAddress: senderWallet.address,
      senderPublicKey: senderWallet.publicKey,
      signature: senderWallet.sign(ChainUtil.hash(transaction.outputs)),
    };
  }

  static verifyTransaction(transaction) {
    return ChainUtil.verifySignature(
      transaction.input.senderPublicKey,
      transaction.input.signature,
      ChainUtil.hash(transaction.outputs)
    );
  }

  // mining reward
  static rewardTransaction(
    minerWallet,
    blockchainWallet,
    blockchain,
    transactionPool,
    gas
  ) {
    let transaction = blockchainWallet.createTransaction(
      blockchainWallet,
      minerWallet.address,
      BigInt(MINING_REWARD),
      blockchain,
      transactionPool,
      BigInt(gas)
    );
    return transaction;
  }

  // faucet reward
  static faucetTransaction(
    recipient,
    faucetWallet,
    blockchain,
    transactionPool,
    gas
  ) {
    let transaction = faucetWallet.createTransaction(
      faucetWallet,
      recipient,
      BigInt(FAUCET_REWARD),
      blockchain,
      transactionPool,
      BigInt(gas)
    );
    return transaction;
  }
}

module.exports = Transaction;

