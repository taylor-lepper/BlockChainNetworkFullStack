import React from "react";
import { useLocation } from "react-router-dom";

function Results({ route, navigation }) {
  let index, address, transactionHash, blockchain, pending, confirmed;
  const { state } = useLocation();
  const { type, result } = state;
  console.log(type);
  console.log(result);

  if (type === "index") {
    index = displayIndex(result);
  }

  if (type === "address") {
    address = displayAddress(result);
  }

  if (type === "transactionHash") {
    transactionHash = displayTransactionHash(result);
  }

  if (type === "blockchain") {
    blockchain = displayBlockchain(result);
  }

  if (type === "pending") {
    pending = displayPending(result);
  }

  if (type === "confirmed") {
    confirmed = displayConfirmed(result);
  }
  return (
    <div className="api">
      <h2>This is the Results page</h2>
      <p>And here are your results!</p>
      <div className="results">
        {index ? <div>{index}</div> : null}
        {blockchain ? <div>{blockchain}</div> : null}
        {pending ? <div>{pending}</div> : null}
        {confirmed ? <div>{confirmed}</div> : null}
        {address ? <div>{address}</div> : null}
        {transactionHash ? <div>{transactionHash}</div> : null}
      </div>
    </div>
  );
}

export default Results;

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

function displayAddress(results) {
  console.log(results);
  return (
    <div className="results">
      {results.map((data) => {
        return (
          <div className="resultsInfo">
            <div key={data.info}>
              <p>
                <strong>Info: </strong>
                {data.info}
              </p>
              <p>
                <strong>Quantity: </strong>
                {data.quantity}
              </p>
              <h3>Transactions: </h3>
            </div>
            <div className="transaction">
              <br></br>
              <div className="transactionInner">
                {data.transactions.map((data) => {
                  // console.log(transaction);
                  return (
                    <div key={data.input.transactionHash}>
                      <h3>Transaction: </h3>
                      <p>&#123;</p>
                      <div className="eachTransaction">
                        <p>Inputs:</p>
                        <p>&#123;</p>
                        <div className="inputs">
                          <p>
                            transactionHash: {data.input.transactionHash}
                          </p>
                          <p>dateCreated: {data.input.dateCreated}</p>
                          {helperFunction(data)}
                          <p>
                            senderAddress: {data.input.senderAddress}
                          </p>
                          <p>{data.input.senderPubpcKey}</p>
                          <div className="signature">
                            <p>Signature:</p>
                            <p>&#123;</p>
                            <div className="innerSig">
                              <p>r: {data.input.signature.r}</p>
                              <p>s: {data.input.signature.s}</p>
                              <p>
                                recoveryParam:{" "}
                                {data.input.signature.recoveryParam}
                              </p>
                            </div>
                            <p>&#125;</p>
                          </div>
                        </div>

                        <p>&#125;</p>

                        <p>Outputs:</p>
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
                          <p>
                            minedInBlockIndex: {data.minedInBlockIndex}
                          </p>
                        ) : null}
                        {data.transferSuccessful !== undefined ? (
                          <p>
                            transferSuccessful:{" "}
                            {String(data.transferSuccessful)}
                          </p>
                        ) : null}
                      </div>
                      <p>&#125;</p>
                      <br></br>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function displayBlockchain(results) {
  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>BlockChain</strong>
        </p>
      </div>

      {results.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
              <h3>Block</h3>
              <p>index: {data.index}</p>
              <p>blockHash: {data.blockHash}</p>
              <p>prevBlockHash: {data.prevBlockHash}</p>
              <p>difficulty: {data.difficulty}</p>
              <p>minedBy: {data.minedBy}</p>
              <p>blockDataHash: {data.blockDataHash}</p>
              <p>nonce: {data.nonce}</p>
              <p>dateCreated: {data.dateCreated}</p>
              <p>transactions:</p>
              <p className="squareBracket">[</p>
              <div className="inputs">
                {data.transactions.map((data) => {
                  return (
                    <div key={data.input.transactionHash}>
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
                              <p>
                                recoveryParam:{" "}
                                {data.input.signature.recoveryParam}
                              </p>
                            </div>
                            <p>&#125;</p>
                          </div>
                        </div>

                        <p>&#125;</p>

                        <p>Outputs:</p>
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
                          <p>
                            transferSuccessful:{" "}
                            {String(data.transferSuccessful)}
                          </p>
                        ) : null}
                      </div>

                      <p>&#125;,</p>
                    </div>
                  );
                })}
              </div>
              <p className="squareBracket">]</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function displayPending(results) {
  console.log(results);
  if(results.length === 0){
    return (<div>There are currently no pending transactions!</div>)
  }
  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>Pending Transactions</strong>
        </p>
      </div>

      {results.map((data) => {
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

function displayConfirmed(results) {
  console.log(results);
  let result = [results];
  return (
    <div className="results">
      {result.map((data) => {
        return (
          <div key={data.info}>
            <div className="resultsInfo">
              <p>
                <strong>Info: </strong>
                {data.info}
              </p>
              <p>
                <strong>Quantity: </strong>
                {data.quantity}
              </p>
              <h3>Transactions: </h3>
            </div>

            {data.confirmedTransactions.map((transaction) => {
              // console.log(transaction);
              return (
                <div className="transaction">
                  <br></br>
                  <div className="transactionInner">
                    <div key={transaction.input.transactionHash}>
                      <h4>Transaction: </h4>
                      <p>&#123;</p>
                      <div className="eachTransaction">
                        <p>Inputs:</p>
                        <p>&#123;</p>
                        <div className="inputs">
                          <p>
                            transactionHash: {transaction.input.transactionHash}
                          </p>
                          <p>dateCreated: {transaction.input.dateCreated}</p>
                          {helperFunction(transaction)}
                          <p>
                            senderAddress: {transaction.input.senderAddress}
                          </p>
                          <p>{transaction.input.senderPubpcKey}</p>
                          <div className="signature">
                            <p>Signature:</p>
                            <p>&#123;</p>
                            <div className="innerSig">
                              <p>r: {transaction.input.signature.r}</p>
                              <p>s: {transaction.input.signature.s}</p>
                              <p>
                                recoveryParam:{" "}
                                {transaction.input.signature.recoveryParam}
                              </p>
                            </div>
                            <p>&#125;</p>
                          </div>
                        </div>

                        <p>&#125;</p>

                        <p>Outputs:</p>

                        <p>&#123;</p>
                        <p className="squareBracket">[</p>
                     
                     {transaction.outputs.map((output) => {
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
                        {transaction.minedInBlockIndex ? (
                          <p>
                            minedInBlockIndex: {transaction.minedInBlockIndex}
                          </p>
                        ) : null}
                        {transaction.transferSuccessful !== undefined ? (
                          <p>
                            transferSuccessful:{" "}
                            {String(transaction.transferSuccessful)}
                          </p>
                        ) : null}
                      </div>
                      <p>&#125;</p>
                      <br></br>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

function displayIndex(results) {
  let result = [results];

  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>Block</strong>
        </p>
      </div>
      {result.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
              <p>index: {data.index}</p>
              <p>blockHash: {data.blockHash}</p>
              <p>prevBlockHash: {data.prevBlockHash}</p>
              <p>difficulty: {data.difficulty}</p>
              <p>minedBy: {data.minedBy}</p>
              <p>blockDataHash: {data.blockDataHash}</p>
              <p>nonce: {data.nonce}</p>
              <p>dateCreated: {data.dateCreated}</p>
              <p>transactions:</p>
              <p className="squareBracket">[</p>
              <div className="inputs">
                {data.transactions.map((data) => {
                  return (
                    <div key={data.input.transactionHash}>
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
                              <p>
                                recoveryParam:{" "}
                                {data.input.signature.recoveryParam}
                              </p>
                            </div>
                            <p>&#125;</p>
                          </div>
                        </div>

                        <p>&#125;</p>

                        <p>Outputs:</p>
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
                     
                      </div>
                      <div className="minedInBlockIndex">
                        {data.minedInBlockIndex ? (
                          <p>minedInBlockIndex: {data.minedInBlockIndex}</p>
                        ) : null}
                        {data.transferSuccessful !== undefined ? (
                          <p>
                            transferSuccessful:{" "}
                            {String(data.transferSuccessful)}
                          </p>
                        ) : null}
                      </div>

                      <p>&#125;,</p>
                    </div>
                  );
                })}
              </div>
              <p className="squareBracket">]</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function displayTransactionHash(results) {
  let result = [results];
  console.log(result);
  return (
    <>
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>Transaction</strong>
          </p>
        </div>
        <div className="transaction">
          <div className="transactionInner">
            {result.map((data) => {
              return (
                <div key={data.input.transactionHash}>
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
                      <p>senderPublicKey: {data.input.senderPublicKey}</p>
                      <div className="signature">
                        <p>Signature:</p>
                        <p>&#123;</p>
                        <div className="innerSig">
                          <p>r: {data.input.signature.r}</p>
                          <p>s: {data.input.signature.s}</p>
                          <p>
                            recoveryParam: {data.input.signature.recoveryParam}
                          </p>
                        </div>
                        <p>&#125;</p>
                      </div>
                    </div>

                    <p>&#125;</p>

                    <p>Outputs:</p>
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
                  </div>
                  <div className="minedInBlockIndex">
                    {data.minedInBlockIndex ? (
                      <p>minedInBlockIndex: {data.minedInBlockIndex}</p>
                    ) : null}
                    {data.transferSuccessful !== undefined ? (
                      <p>
                        transferSuccessful: {String(data.transferSuccessful)}
                      </p>
                    ) : null}
                  </div>

                  <p>&#125;</p>
                  <br></br>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
