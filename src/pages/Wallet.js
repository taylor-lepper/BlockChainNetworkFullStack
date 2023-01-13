import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import wallet from "../actions/wallet";

const Wallet = (props) => {
  const [message, setMessage] = useState(null);
  const [port, setPort] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const submitNewWallet = async (event) => {
    console.log("submitNewWallet");
    event.preventDefault();
    const result = await wallet("new", port, name);

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

  return (
    <div className="float-container">
      <h2>This is the Wallet page</h2>
      <div>
        <h3>Here, you can create a new wallet etc.</h3>
        <h4>Please select from the options below...</h4>
      </div>

      <div className="message">{message && <h1>{message}</h1>}</div>

      <div className="float-child">
        <div>
          <h4>Create a new Wallet</h4>
          <input
          className="input2"
              type="text"
              name="port"
              required
              placeholder="enter your HTTP port number"
              value={port}
              onChange={(eventObj) => setPort(eventObj.target.value)}
            />
            <br/>
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
          <button type="new" onClick={submitNewWallet}>
            Create
          </button>
        </div>
      </div>
      <div className="float-child">
        <div>
          <h4>New Wallet</h4>
          <button type="info" onClick={submitNewWallet}>
            Get Peer Info
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default Wallet;
