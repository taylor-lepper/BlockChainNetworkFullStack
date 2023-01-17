import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import connectPeer from "../actions/connectPeer";
import peerInfo from "../actions/peerInfo";
import peerDebug from "../actions/peerDebug";
import peerAll from "../actions/peerAll";
import disconnectPeer from "../actions/disconnectPeer";

const Peers = (props) => {
  const [message, setMessage] = useState(null);
  const [disconnect, setDisconnect] = useState("");
  const navigate = useNavigate();

  const submitConnect = async (event) => {
    console.log("submmitConnect");
    event.preventDefault();
    const result = await connectPeer();

    if (result) {
      console.log(result);

      navigate("nodes", {
        state: {
          type: "connect",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Error contacting the node");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitInfo = async (event) => {
    console.log("submmitInfo");
    event.preventDefault();
    const result = await peerInfo();

    if (result) {
      console.log(result);

      if (result === "There is currently no connected peers") {
        setMessage("There is currently no connected peers");
        setTimeout(() => {
          setMessage("");
        }, 4000);
        return;
      }

      navigate("nodes", {
        state: {
          type: "info",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Error contacting the node");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitDebug = async (event) => {
    console.log("submitDebug");
    event.preventDefault();
    const result = await peerDebug();

    if (result) {
      console.log(result);

      navigate("nodes", {
        state: {
          type: "debug",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Error contacting the node");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitAllPeers = async (event) => {
    console.log("submitAllPeers");
    event.preventDefault();
    const result = await peerAll();

    if (result) {
      console.log(result);

      navigate("nodes", {
        state: {
          type: "all",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Error contacting the node");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitDisconnect = async (event) => {
    console.log("submitDisconnect");
    event.preventDefault();

    if(disconnect === "" || isNaN(disconnect)){
      setMessage(
        "Please enter a valid HTTP port to disconnect (ex. 3002)"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await disconnectPeer(disconnect);

    if (result) {
      console.log(result);

      navigate("nodes", {
        state: {
          type: "disconnect",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Error contacting the node");
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  return (
    <div className="float-container">
      <h2>This is the Peers page</h2>
      <div>
        <h3>
          Here, you can find info about your peers, and connect to the
          BlockChain!
        </h3>
        <h4>Please select from the options below...</h4>
      </div>

      <div className="message">{message && <h1>{message}</h1>}</div>
     
        <div className="float-child">
          <div>
            <h4>Info</h4>
            <button type="info" onClick={submitInfo}>
              Get Peer Info
            </button>
          </div>
          <div>
            <h4>Debug</h4>
            <button type="debug" onClick={submitDebug}>
              Get Peer Debug Info
            </button>
          </div>
          <div>
            <h4>All Peers</h4>
            <button type="allPeers" onClick={submitAllPeers}>
              List all Peers
            </button>
          </div>
        </div>

        <div className="float-child">
          <div>
            <h4>Connect</h4>
            <button type="connect" onClick={submitConnect}>
              Connect to the BlockChain
            </button>
          </div>

          <div className="paddingTop">
            <h4>Disconnect</h4>
       
            <input
             className="input2"
              type="text"
              name="disconnect"
              required
              placeholder="enter your HTTP port number"
              value={disconnect}
              onChange={(eventObj) => setDisconnect(eventObj.target.value)}
            />
          
            <br/>
            <button className="marginButton" type="disconnect" onClick={submitDisconnect}>
              Disconnect from the BlockChain
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default Peers;
