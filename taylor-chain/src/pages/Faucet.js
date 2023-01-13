import React, { useRef, useState } from "react";
import address from "../actions/address";
import addressByName from "../actions/addressByName";
import faucet from "../actions/faucet";

import ReCAPTCHA from "react-google-recaptcha";

const Faucet = (props) => {
  const [walletAddress, setWalletAddress] = useState("");
  const [port, setPort] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");
  const [results, setResults] = useState("");
  const reRef = useRef();

  const getAddress = async (event) => {
    event.preventDefault();
    const result = await address(3001);

    if (result) {
      console.log(result);
      setWalletAddress(result.address);
    }

    if (!result) {
      setMessage("Error contacting the blockchain");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const getAddressByName = async (event) => {
    event.preventDefault();
    const result = await addressByName(name);

    if (result) {
      console.log(result);
      setWalletAddress(result.address);
    }

    if (!result) {
      setMessage("Error contacting the blockchain");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const getAddressByPort = async (event) => {
    event.preventDefault();
    const result = await address(port);

    if (result) {
      console.log(result);
      setWalletAddress(result.address);
    }

    if (!result) {
      setMessage("Error contacting the blockchain");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const getCoins = async (event) => {
    event.preventDefault();

    const token = await reRef.current.executeAsync();
    reRef.current.reset();
    console.log("token", token);
    const result = await faucet(token);
    if (result) {
      console.log(result);
      setResults(result);
      setMessage2(
        "Transaction created, You will recieve the coins when the next block is mined"
      );
      setTimeout(() => {
        setMessage2("");
      }, 4000);
      return;
    }

    if (!result) {
      setMessage("Error contacting the blockchain");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  return (
    <div className="faucet">
      <h2>Need some coins???</h2>
      <div className="float-container">
        <div>
          <div className="message2">{message2 && <h1>{message2}</h1>}</div>
        </div>
        <div>
          <div className="message">{message && <h1>{message}</h1>}</div>
        </div>
        <div className="float-child2">
          <h2>Faucet</h2>
          <h3>Enter address below to recieve 1 TaylorCoin</h3>
          <input
            className="input"
            type="text"
            name="address"
            placeholder="enter a valid wallet address"
            required
            value={walletAddress}
            onChange={(eventObj) => setWalletAddress(eventObj.target.value)}
          />
          <br />

          <button className="marginButton" type="address" onClick={getAddress}>
            Click here to load default Address
          </button>
          <br />
          <button type="faucet" onClick={getCoins}>
            Get Coins
          </button>
          <br />

          <ReCAPTCHA
            sitekey={process.env.REACT_APP_SITE_KEY}
            size="invisible"
            ref={reRef}
          />
        </div>

        <div className="float-child2">
          <h3>Need your address?</h3>
          <p>Load your address by port number</p>
          <input
            className="input"
            type="port"
            name="port"
            placeholder="enter a valid HTTP port (example 3002)"
            required
            value={port}
            onChange={(eventObj) => setPort(eventObj.target.value)}
          />
          <br />

          <button
            className="marginButton"
            type="address"
            onClick={getAddressByPort}
          >
            Load Address
          </button>
          <br />
          <br />
        </div>

        <div className="float-child2">
          <h3>Need your address?</h3>
          <p>Load your address by wallet name</p>
          <input
            className="input"
            type="name"
            name="name"
            placeholder="enter a valid wallet name"
            required
            value={name}
            onChange={(eventObj) => setName(eventObj.target.value)}
          />
          <br />

          <button
            className="marginButton"
            type="address"
            onClick={getAddressByName}
          >
            Load Address
          </button>
          <br />
          <br />
        </div>
      </div>
      {results ? resultFunction(results) : null}
    </div>
  );
};

export default Faucet;

function resultFunction(results) {
  let result = [results.transaction];
  console.log(result);
  return (
    <>
      <div className="results">
        <div className="resultsInfo">
          <p>
            <strong>Transaction</strong>
          </p>
          <p>You will recieve your coins when the next block is mined!</p>
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
                      <p>
                        senderConfirmedBalance:{" "}
                        {data.input.senderConfirmedBalance}
                      </p>
                      <p>senderAddress: {data.input.senderAddress}</p>
                      <p>publicKey: {data.input.senderPublicKey}</p>
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
