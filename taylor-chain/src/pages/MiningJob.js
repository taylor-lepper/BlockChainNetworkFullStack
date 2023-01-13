import React from "react";
import { useLocation } from "react-router-dom";

function Nodes({ route, navigation }) {
  let job, submit;
  const { state } = useLocation();
  const { type, result } = state;
  console.log(type);
  console.log(result);

  if (type === "job") {
    job = displayJob(result);
  }
  if (type === "submit") {
    submit = displaySubmit(result);
  }

  return (
    <div className="api">
      <h2>This is the Mining Job page</h2>
      <div className="results">
        {job ? <div>{job}</div> : null}
        {submit ? <div>{submit}</div> : null}
      </div>
    </div>
  );
}

export default Nodes;

function displayJob(result) {
  console.log(result);
  const results = [result];
  return (
    <div className="results">
      <div className="resultsInfo">
        <p>
          <strong>Current Job</strong>
        </p>
      </div>
      {results.map((data) => {
        return (
          <div className="transaction">
            <div className="transactionInner">
              <p>index: {data.index}</p>
              <p>timeStamp: {data.timeStamp}</p>
              <p>transactionsIncluded: {data.transactionsIncluded}</p>
              <p>difficulty: {data.difficulty}</p>
              <p>expectedReward: {data.expectedReward}</p>
              <p>rewardAddress: {data.rewardAddress}</p>
              <p>blockDataHash: {data.blockDataHash}</p>
              <p>transactions:</p>

              {data.transactions ? (
                <div>
                  {" "}
                  <p className="squareBracket">[</p>{" "}
                  {data.transactions.map((data) => {
                    return (
                      <div className="inputs">
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
                  <p className="squareBracket">]</p>
                </div>
              ) : (
                <div>
                  {" "}
                  <p className="squareBracket">[</p>
                  <p className="squareBracket">]</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function displaySubmit(result) {
  const results = [result];
  console.log(results);
  return (
    <div className="results">
      {results.map((data) => {
        return (
          <div className="resultsInfo">
            <div>
              <p>
                <strong>message: </strong>
                {data.message}
              </p>
              <p>
                <strong>reward: </strong>
                {data.reward}
              </p>
              <h3>blockchain: </h3>
            </div>
            <div className="transaction">
              <br></br>

              {data.blockchain.map((data) => {
                // console.log(transaction);
                return (
                  <div>
                    <div className="transactionInner">
                      <p>
                        <strong>Block</strong>
                      </p>
                      <p>&#123;</p>
                      <div className="inputs">

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
                                <div className="inputs">
                                <p>&#123;</p>
                                <div className="inputs">
                                  <p>
                                    transactionHash:{" "}
                                    {data.input.transactionHash}
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
                                </div>

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
                                            <p>
                                              {" "}
                                              sentAmount: {output.sentAmount}
                                            </p>
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

                              <p>&#125;,</p>
                            </div>
                          );
                        })}
                      </div>
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
                            <p>&#125;,</p>
                      </div>
                    
                    </div>
              <br/>
                  </div>
                );
              })}
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
