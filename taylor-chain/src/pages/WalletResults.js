import React from "react";
import { useLocation } from "react-router-dom";

function WalletResults({ route, navigation }) {
  let newWallet, walletInfo, balance, allBalances;
  const { state } = useLocation();
  const { type, result } = state;
  console.log(type);
  console.log(result);

  if (type === "new") {
    newWallet = displayNew(result);
  }

  
  if (type === "info") {
    walletInfo = displayInfo(result);
  }

  if (type === "balance") {
    balance = displayBalance(result);
  }

  if (type === "allBalances") {
    allBalances = displayAllBalances(result);
  }


  return (
    <div className="api">
      <h2>This is the Wallet Results page</h2>
      <p>And here are your results!</p>
      <div className="results">
        {newWallet ? <div>{newWallet}</div> : null}
        {walletInfo ? <div>{walletInfo}</div> : null}
        {balance ? <div>{balance}</div> : null}
        {allBalances ? <div>{allBalances}</div> : null}
      </div>
    </div>
  );
}

export default WalletResults;

function displayNew(result) {
    const results = [result];
    return (
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>New Wallet Created</strong>
          </p>

          <p>Please write down all of your new wallet info somewhere safe!</p>
          <p>There will be no way to recover your information if you lose it!</p>

          <p>You can use your privateKey to load your wallet info in the future.</p>
        </div>
        {results.map((data) => {
          return (
            <div className="transaction">
              <div className="transactionInner">
            <p>name: {data.name}</p>
            <p>safeBalance: {data.safeBalance}</p>
            <p>confirmedBalance: {data.confirmedBalance}</p>
            <p>pendingBalance: {data.pendingBalance}</p>
            <p>privateKey: {data.privateKey}</p>
            <p>publicKey: {data.publicKey}</p>
            <p>publicKeyCompressed: {data.publicKeyCompressed}</p>
            <p>address: {data.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }


  function displayAllBalances(result) {
    return (
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>All Wallet Balances</strong>
          </p>

          <p>info: {result.info}</p>
          <p>quantity: {result.quantity}</p>
        </div>

        {result.wallets.map((data) => {
          return (
            <div className="transaction">
              <div className="transactionInner">   
              <p>name: {data.name}</p>
              <p>address: {data.address}</p>
            <p>safeBalance: {data.safeBalance}</p>
            <p>confirmedBalance: {data.confirmedBalance}</p>
            <p>pendingBalance: {data.pendingBalance}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  function displayBalance(result) {
    const results = [result];
    return (
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>Wallet Balances</strong>
          </p>

          <p>These are you current wallet balances:</p>
        </div>
        {results.map((data) => {
          return (
            <div className="transaction">
              <div className="transactionInner">   
            <p>safeBalance: {data.safeBalance}</p>
            <p>confirmedBalance: {data.confirmedBalance}</p>
            <p>pendingBalance: {data.pendingBalance}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }


  function displayInfo(result) {
    const results = [result];
    return (
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>Wallet info</strong>
          </p>
        </div>
        {results.map((data) => {
          return (
            <div className="transaction">
              <div className="transactionInner">
            <p>name: {data.name}</p>
            <p>safeBalance: {data.safeBalance}</p>
            <p>confirmedBalance: {data.confirmedBalance}</p>
            <p>pendingBalance: {data.pendingBalance}</p>
            <p>privateKey: {data.privateKey}</p>
            <p>publicKey: {data.publicKey}</p>
            <p>publicKeyCompressed: {data.publicKeyCompressed}</p>
            <p>address: {data.address}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }