import React, { useState, useEffect } from 'react';
import explore from "../actions/explore";

const Main =  (props) => {

  const [message, setMessage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [transactions, setTransactions] = useState([]);


  function loadBlocks() {
    var recentBlocks = [];
    useEffect(() => async function submitBlockchain(){
      
    const result = await explore("blockchain", null);
    if (result) {
      // console.log(result);
      if(result.length > 3){
        let i = result.length -3;
        // console.log(i);
        for(i; i < result.length; i++){
          const block = result[i];
          // console.log(block);
          recentBlocks.push(block);
        }
              // console.log(recentBlocks);
      setBlocks(recentBlocks);
      }
      else{
        for(let i=0; i < result.length; i++){
          const block = result[i];
          // console.log(block);
          recentBlocks.push(block);
        }
        setBlocks(recentBlocks);
      }

    }

    if (!result) {
      setMessage("Error contacting the blockchain");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
    }, []);
    return;
  }

  function loadTransactions() {
    var recentTransactions = [];
    useEffect(() => async function submitConfirmed(){
      const result = await explore("confirmed", null);
  
      if (result) {
   
  
        // console.log(result.confirmedTransactions);

        if(result.confirmedTransactions.length > 3){
          let i = result.confirmedTransactions.length -3;
          // console.log(i);
          for(i; i < result.confirmedTransactions.length; i++){
            const transaction = result.confirmedTransactions[i];
            // console.log(transaction);
            recentTransactions.push(transaction);
          }
                 // console.log(recentTransactions);
        setTransactions(recentTransactions);
        } else{
          for(let i = 0; i < result.confirmedTransactions.length; i++){
            const transaction = result.confirmedTransactions[i];
            // console.log(transaction);
            recentTransactions.push(transaction);
          }
                 // console.log(recentTransactions);
        setTransactions(recentTransactions);
        }
 
      }
  
      if (!result) {
        setMessage("Error contacting the blockchain");
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }
    }, []);
    return;
  }


loadBlocks();
loadTransactions();
console.log(blocks);
console.log(transactions);

const displayBlocks = displayBlockchain(blocks);
const displayTransactions = displayConfirmed(transactions);

    return (
      <div className="main">

        <h2>Welcome to the Home Page</h2>
        <p>This is TaylorChain</p>
        <p> A tailored solution to your blockchain needs!</p>
        <div className="message">{message && <h1>{message}</h1>}</div>
        <img src="blockchain-2.webp" alt="a blockchain pic" />

        <div className="results">
          <br/>
          <h2>See the most recent blocks and transactions below</h2>
        {displayBlocks ? <div>{displayBlocks}</div> : null}
        {displayTransactions ? <div>{displayTransactions}</div> : null}

      </div>
      </div>

      
    );
}

export default Main;


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


function displayBlockchain(results) {
  return (
    <div className="">
      <div className="resultsInfo">
        <p>
          <strong>Most Recent Blocks</strong>
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
                          <p>senderPublicKey: {data.input.senderPublicKey}</p>
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


function displayConfirmed(results) {
  // console.log(results);
  return (
    <div className="results">
      <div className="resultsInfo">
        <br/>
      <strong>Most Recent Transactions</strong>
      <br/>
      <br/>
      </div>
      {results.map((transaction) => {
        console.log(transaction);
        return (
          <div className="transaction">
            <div className="transactionInner">
     
                  <br></br>
                
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
              </div>)
      }
      )
    }
 </div>
  );
}