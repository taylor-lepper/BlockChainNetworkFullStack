import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import wallet from "../actions/wallet";
import walletInfo from "../actions/walletInfo";
import walletBalance from "../actions/walletBalance";

const Wallet = (props) => {
  const [message, setMessage] = useState(null);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const navigate = useNavigate();

  const submitNewWallet = async (event) => {
    console.log("submitNewWallet");
    event.preventDefault();

    const result = await wallet("new", name);

    if(result === 'That name already exists, please make a unique name'){
      console.log('Too many requests');
      setMessage(
        result
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    if(result === 'Network Error'){
      console.log('Network Error');
      setMessage(
        "Network Error, please enter a valid, connected port!"
      );
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
          result: result.newWallet,
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

  const loadWallet = async (event) => {
    console.log("submit loadWallet");
    event.preventDefault();

    if(privateKey === ""){
      setMessage(
        "Please enter a valid privateKey"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await walletInfo("info", privateKey);

    if(result === "No wallet found by that private key!"){
      console.log('No matching wallet');
      setMessage(
        result
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "info",
          result: result.wallet,
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

  const loadBalance = async (event) => {
    console.log("submit loadBalance");
    event.preventDefault();
    if(address === ""){
      setMessage(
        "Please enter a valid address"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await walletBalance("balance", address);

    if(result === "No wallet found by that address!"){
      console.log('No matching wallet');
      setMessage(
        result
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "balance",
          result: result.balances,
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

  const loadAllBalances = async (event) => {
    console.log("submit loadAllBalance");
    event.preventDefault();
    const result = await walletBalance("allBalances", "no address needed");

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "allBalances",
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

  // const nagigateToPeers = async (event) => {
  //   console.log("nagigateToPeers");
  //   navigate("/peers");
  // }

  return (
    <div className="float-container">
      <h2>This is the Wallet page</h2>
      <div>
        <h3>Here, you can create a new wallet, load your wallet info, and check your balances.</h3>
        <h4>Please select from the options below...</h4>

      {/* <div className="border">
      <p><strong>Not connected yet???</strong></p>
        <button className="marginButton" type="new" onClick={nagigateToPeers}>
        Click Here
          </button>
      </div> */}
       
      </div>

      <div className="message">{message && <h1>{message}</h1>}</div>

      <div className="float-child2">
        <div>
          <h3>Create a new Wallet</h3>
          <br/>
      
          <h5>If you don't input a name, we will create one for you</h5>
    
            <input
          className="input"
              type="text"
              name="name"
              required
              placeholder="enter a name for your wallet <optional>"
              value={name}
              onChange={(eventObj) => setName(eventObj.target.value)}
            />
                    <br/>
          <button className="marginButton" type="new" onClick={submitNewWallet}>
            Create
          </button>
        </div>
      </div>
      <div className="float-child2">
        <div>
          <h3>Balances</h3>
          <br/>
          <h5>Check Wallet Balance by Address</h5>
          <input
          className="input"
              type="address"
              name="address"
              required
              placeholder="enter your wallet address"
              value={address}
              onChange={(eventObj) => setAddress(eventObj.target.value)}
            />
            <br/>
          <button className="marginButton" type="address" onClick={loadBalance}>
           Load Balances
          </button>

          <h4>Click below to load all Wallet balances </h4>
          <button className="" type="all" onClick={loadAllBalances}>
           Load Balances
          </button>

        </div>
      </div>
      <div className="float-child2">
        <div>
          <h3>Load your Wallet Info and Balances</h3>
     
          <br/>
          <h5>Input your Wallet Private Key below</h5>
       
         
          <input
          className="input"
              type="privateKey"
              name="privateKey"
              required
              placeholder="enter your private key"
              value={privateKey}
              onChange={(eventObj) => setPrivateKey(eventObj.target.value)}
            />
            <br/>
          <button className="marginButton" type="info" onClick={loadWallet}>
           Load Info
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Wallet;
