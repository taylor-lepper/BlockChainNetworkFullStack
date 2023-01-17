import React from "react";
import { useLocation } from "react-router-dom";

function TransactionsResults({ route, navigation }) {
  let newTransaction;
  const { state } = useLocation();
  const { type, result } = state;
  console.log(type);
  console.log(result);

  if (type === "new") {
    newTransaction = displayNewTransaction(result);
  }

  

  return (
    <div className="api">
      <h2>This is the Transactions Results page</h2>
      <p>And here are your results!</p>
      <div className="results">
        {newTransaction ? <div>{newTransaction}</div> : null}
  
      </div>
    </div>
  );
}

export default TransactionsResults;

  function displayNewTransaction(result) {
 
    return (
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>New Pending Transaction:</strong>
          </p>
        </div>
  
        {result.map((data) => {
            console.log(data);
          return (
            <div className="transaction">
              <div className="transactionInner">
                <h4>Transaction: </h4>
                <p>&#123;</p>
                <div className="eachTransaction">
                  <p>Inputs:</p>
                  <p>&#123;</p>
                  <div className="inputs">
                    <p>transactionHash: {data.input.transactionHash}</p>
                    <p>dateCreated: {data.input.dateCreated}</p>
                    {helperFunction(data)}
                    <p>senderAddress: {data.input.senderAddress}</p>
                    <p>{data.input.senderPubpcKey}</p>
                    <div className="signature">
                      <p>Signature:</p>
                      <p>&#123;</p>
                      <div className="innerSig">
                        <p>r: {data.input.signature.r}</p>
                        <p>s: {data.input.signature.s}</p>
                        <p>recoveryParam: {data.input.signature.recoveryParam}</p>
                      </div>
                      <p>&#125;</p>
                    </div>
                  </div>
  
                  <p>&#125;</p>
  
                  <p>Outputs:</p>
  
                  <p>&#123;</p>
                  <p className="squareBracket">[</p>
                       
                          {data.outputs.map((output) => {
                            return (
                              <div>
                                {output.newSenderPendingBalance ? (
                                  <div className="inputs">
                                    <p>&#123;</p>
                                    <div className="inputs">
                                      <p>
                                        {" "}
                                        newSenderPendingBalance:{" "}
                                        {output.newSenderPendingBalance}
                                      </p>
                                      <p>address: {output.address}</p>
                                    </div>{" "}
                                    <p>&#125;,</p>
                                  </div>
                                ) : null}
                                 {output.newSenderSafeBalance ? (
                                  <div className="inputs">
                                    <p>&#123;</p>
                                    <div className="inputs">
                                      <p>
                                        {" "}
                                        newSenderSafeBalance:{" "}
                                        {output.newSenderSafeBalance}
                                      </p>
                                      <p>address: {output.address}</p>
                                    </div>{" "}
                                    <p>&#125;,</p>
                                  </div>
                                ) : null}
                                  {output.newSenderConfirmedBalance ? (
                                  <div className="inputs">
                                    <p>&#123;</p>
                                    <div className="inputs">
                                      <p>
                                        {" "}
                                        newSenderConfirmedBalance:{" "}
                                        {output.newSenderConfirmedBalance}
                                      </p>
                                      <p>address: {output.address}</p>
                                    </div>{" "}
                                    <p>&#125;,</p>
                                  </div>
                                ) : null}
                                {output.sentAmount ? (
                                  <div className="inputs">
                                    <p>&#123;</p>
                                    <div className="inputs">
                                      {" "}
                                      <p> sentAmount: {output.sentAmount}</p>
                                      <p>gas: {output.gas}</p>
                                      <p>address: {output.address}</p>
                                    </div>{" "}
                                    <p>&#125;,</p>
                                  </div>
                                ) : null}
                              </div>
                            );
                          })}
    <p className="squareBracket">]</p>
  
                  <p>&#125;</p>
                </div>
                <div className="minedInBlockIndex">
                  {data.minedInBlockIndex ? (
                    <p>minedInBlockIndex: {data.minedInBlockIndex}</p>
                  ) : null}
                  {data.transferSuccessful !== undefined ? (
                    <p>transferSuccessful: {String(data.transferSuccessful)}</p>
                  ) : null}
                </div>
  
                <p>&#125;</p>
                <br></br>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  
  function helperFunction(transaction) {
    // console.log(transaction);
    if (transaction.input.senderSafeBalance) {
      return `senderSafeBalance: ${transaction.input.senderSafeBalance}`;
    } else {
      return `senderConfirmedBalance: ${transaction.input.senderConfirmedBalance}`;
    }
  }
  
  function helperFunction2(transaction) {
    // console.log(transaction);
    if (transaction.outputs[0].newSenderPendingBalance) {
      return `newSenderPendingBalance: ${transaction.outputs[0].newSenderPendingBalance}`;
    } else if (transaction.outputs[0].newSenderConfirmedBalance) {
      return `newSenderConfirmedBalance: ${transaction.outputs[0].newSenderConfirmedBalance}`;
    } else {
      return `newSenderSafedBalance: ${transaction.outputs[0].newSenderSafedBalance}`;
    }
  }