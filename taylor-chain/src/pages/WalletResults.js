import React from "react";
import { useLocation } from "react-router-dom";

function WalletResults({ route, navigation }) {
  let newWallet;
  const { state } = useLocation();
  const { type, result } = state;
  console.log(type);
  console.log(result);

  if (type === "new") {
    newWallet = displayNew(result);
  }


  return (
    <div className="api">
      <h2>This is the Wallet Results page</h2>
      <p>And here are your results!</p>
      <div className="results">
        {newWallet ? <div>{newWallet}</div> : null}
      
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

          <p>Please write down your wallet name and address somewhere safe!</p>
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