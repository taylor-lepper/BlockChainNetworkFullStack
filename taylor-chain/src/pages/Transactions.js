import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import address from "../actions/address";
import addressByName from "../actions/addressByName";
import transaction from "../actions/transaction";

const Transaction = (props) => {
  const [message, setMessage] = useState(null);
  const [message2, setMessage2] = useState("");
  const [port, setPort] = useState("");
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [gas, setGas] = useState("");
  const [results, setResults] = useState("");
  const navigate = useNavigate();

  const getAddressByName = async (event) => {
    event.preventDefault();

    if(name === ""){
        setMessage(
          "Please enter a wallet name to load your address"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }
    const result = await addressByName(name);

    if (result === "No wallet found by that name!") {
      console.log("No wallet by that name");
      setMessage(result);
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

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

    if(port === "" || isNaN(port)){
        setMessage(
          "Please enter a valid HTTP port to load your address (ex. 3002)"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }

    const result = await address(port);

    if (result === "Network Error") {
        console.log(result);
        setMessage("Invalid port, Network Error");
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }

    if (result) {
      console.log(result);
      setFrom(result.address);
    }

    if (!result) {
      setMessage("Error contacting the blockchain");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitNewTransaction = async (event) => {
    console.log("submitNewTransaction");
    event.preventDefault();

    if(from === ""){
        setMessage(
          "Please enter a valid from address or load it using an option below"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }
    
      if(recipient === ""){
        setMessage(
          "Please enter a valid recipient address"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }

      if(amount === "" || isNaN(amount)){
        setMessage(
          "Please enter a valid amount to send (number)"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }

      if(gas === "" || isNaN(gas)){
        setMessage(
          "Please enter a valid gas amount to send (number greater than or equal to 10)"
        );
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }


    const result = await transaction("new", from, recipient, amount, gas);

    if (result.errorMsg) {
        setMessage(result.errorMsg);
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "new",
          result: result,
        },
      });
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
    <div className="">
      <h2>This is the Transactions page</h2>
      <div>
        <h3>Here, you can send coins by creating a new Transaction!</h3>
        <h4>All amounts are to be input in Micro-Coins</h4>
        <h4>!!! Transactions are deducted from safeBalance !!!</h4>
      </div>

      <div className="message">{message && <h1>{message}</h1>}</div>
      <div>
        <div className="message2">{message2 && <h1>{message2}</h1>}</div>
      </div>

      <div className="transaction3">
        <div className="transactionInner4">
         
            <h4>Create a Transaction</h4>
            <input
              className="input"
              type="from"
              name="from"
              required
              placeholder="enter your wallet address"
              value={from}
              onChange={(eventObj) => setFrom(eventObj.target.value)}
            />
     
            <input
              className="input"
              type="recipient"
              name="recipient"
              required
              placeholder="enter a valid recipient address"
              value={recipient}
              onChange={(eventObj) => setRecipient(eventObj.target.value)}
            />
         
            <input
              className="input"
              type="amount"
              name="amount"
              required
              placeholder="enter the amount to send"
              value={amount}
              onChange={(eventObj) => setAmount(eventObj.target.value)}
            />
            <input
              className="input"
              type="gas"
              name="gas"
              required
              placeholder="enter a gas amount over 10"
              value={gas}
              onChange={(eventObj) => setGas(eventObj.target.value)}
            />
            <button
              className="marginButton"
              type="info"
              onClick={submitNewTransaction}
            >
              Create Transaction
            </button>
        
        </div>

        {results ? resultFunction(results) : null}
      </div>

      <div className="float-container2">
        <div className="float-child">
          <h3>Need your address?</h3>
          <p>Load your default wallet address by port number</p>
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

        <div className="float-child">
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
    </div>
  );
};

export default Transaction;
