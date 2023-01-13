import React from "react";
import { useLocation } from "react-router-dom";

function Nodes({ route, navigation }) {
  let connect, info, debug, all, disconnect;
  const { state } = useLocation();
  const { type, result } = state;
  console.log(type);
  console.log(result);

  if (type === "connect") {
    connect = displayConnect(result);
  }
  if (type === "info") {
    info = displayInfo(result);
  }
  if (type === "debug") {
    debug = displayDebug(result);
  }
  if (type === "all") {
    all = displayAll(result);
  }
  if (type === "disconnect") {
    disconnect = displayDisconnect(result);
  }


  return (
    <div className="api">
      <h2>This is the Node Results page</h2>
      <div className="results">
        {connect ? <div>{connect}</div> : null}
        {info ? <div>{info}</div> : null}
        {debug ? <div>{debug}</div> : null}
        {all ? <div>{all}</div> : null}
        {disconnect ? <div>{disconnect}</div> : null}
      </div>
    </div>
  );
}

export default Nodes;

function displayConnect(result) {
  const results = [result];
  return (
  <div className="results">
  <div className="resultsInfo">
  {results.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
          <p>message: {data.message}</p>
          <p>port: {data.port}</p>
          <p>info: Record your port number for using other functions on this site!</p>
            </div>
          </div>
        );
      })}

    </div>
    </div>
  )
}

function displayDisconnect(result) {
  return (
  <div className="results">
  <div className="resultsInfo">
  <div>{result}</div>
  </div>
  </div>)
}

function displayAll(result) {
  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>Peers</strong>
        </p>
      </div>
      {result.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
          <p>id: {data.id}</p>
          <p>url: {data.url}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function displayInfo(result) {
  let results = [result];
  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>Peer Info</strong>
        </p>
      </div>
      {results.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
              <p>about: {data.about}</p>
              <p>nodeID: {data.nodeID}</p>
              <p>nodeURL: {data.nodeURL}</p>
              <p>chainId: {data.chainId}</p>
              <p>port: {data.port}</p>
              <p>sockets: {data.sockets}</p>
              <p>peers:</p>
              <p className="squareBracket">[</p>
              {data.currentPeers.map((data) => (
                <div className="inputs">
                  <p>peer: {data}</p>
                </div>
              ))}
              <p className="squareBracket">]</p>
              <p>currentDifficulty: {data.currentDifficulty}</p>
              <p>cumulativeDifficulty: {data.cumulativeDifficulty}</p>
              <p>blocksCount: {data.blocksCount}</p>
              <p>confirmedTransactions: {data.confirmedTransactions}</p>
              <p>pendingTransactions: {data.pendingTransactions}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function displayDebug(result) {
  let results = [result];
  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>Peer Debug Info</strong>
        </p>
      </div>
      {results.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
              <p>about: {data.about}</p>
              <p>url: {data.url}</p>
              <p>chainId: {data.nodeID}</p>
              <p>peers:</p>
              <p className="squareBracket">[</p>
              {data.currentPeers.map((peer) => (
                <div className="inputs">
                  <p>peer: {peer}</p>
                </div>
              ))}
              <p className="squareBracket">]</p>
              <p>wallets:</p>
              <p className="squareBracket">[</p>
              {data.wallets.map((wallet) => (
                <div className="inputs">
                  <p>&#123;</p>
                  <p>name: {wallet.name}</p>
                  <p>safeBalance: {wallet.safeBalance}</p>
                  <p>confirmedBalance: {wallet.confirmedBalance}</p>
                  <p>pendingBalance: {wallet.pendingBalance}</p>
                  <p>privateKey: {wallet.privateKey}</p>
                  <p>publicKey: {wallet.publicKey}</p>
                  <p>address: {wallet.address}</p>
                  <p>publicKeyCompressed: {wallet.publicKeyCompressed}</p>
                  <p>&#125;,</p>
                </div>
              ))}
              <p className="squareBracket">]</p>

              <p>blockchain:</p>
              <p className="squareBracket">[</p>
              {data.blockchain.map((block) => (
                <div className="inputs">
                  <p>&#123;</p>
                  <p>index: {block.index}</p>
                  <p>blockHash: {block.blockHash}</p>
                  <p>prevBlockHash: {block.prevBlockHash}</p>
                  <p>difficulty: {block.difficulty}</p>
                  <p>minedBy: {block.minedBy}</p>
                  <p>blockDataHash: {block.blockDataHash}</p>
                  <p>nonce: {block.nonce}</p>
                  <p>dateCreated: {block.dateCreated}</p>
                  <p>transactions: {block.publicKeyCompressed}</p>
                  <p className="squareBracket">[</p>
              <div className="inputs">
                {block.transactions.map((data) => {
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
                  <p>&#125;,</p>
                </div>
              ))}
              <p className="squareBracket">]</p>
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