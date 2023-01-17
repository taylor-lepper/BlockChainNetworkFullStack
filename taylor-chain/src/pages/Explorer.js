import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import explore from "../actions/explore";

const Explorer = (props) => {
  const [exploreType, setExploreType] = useState("");
  const [address, setAddress] = useState("");
  const [index, setIndex] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // console.log(props);
  const clearIndex = (event) => {
    setIndex("");
    setExploreType("");
    return;
  };
  const clearAddress = (event) => {
    setAddress("");
    setExploreType("");
    return;
  };
  const clearTransaction = (event) => {
    setTransactionHash("");
    setExploreType("");
    return;
  };

  const submitBlockchain = async (event) => {
    event.preventDefault();
    const result = await explore("blockchain", null);

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "blockchain",
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

  const submitPending = async (event) => {
    event.preventDefault();
    const result = await explore("pending", null);

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "pending",
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

  const submitConfirmed = async (event) => {
    event.preventDefault();
    const result = await explore("confirmed", null);

    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "confirmed",
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

  const submitIndex = async (event) => {
    event.preventDefault();

    if(index === "" || isNaN(index)){
      setMessage(
        "Please enter a valid index of the blockchain!"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await explore("index", index);
    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "index",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Please enter a valid index in the text box.");

      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitAddress = async (event) => {
    event.preventDefault();

    if(address === ""){
      setMessage(
        "Please enter a valid wallet address to search the blockchain!"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await explore("address", address);
    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "address",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Please enter a valid address in the text box.");

      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  const submitTransactionHash = async (event) => {
    event.preventDefault();


    if(transactionHash === ""){
      setMessage(
        "Please enter a valid transactionHash to search the blockchain!"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await explore("transactionHash", transactionHash);
    if (result) {
      console.log(result);

      navigate("results", {
        state: {
          type: "transactionHash",
          result: result,
        },
      });
    }

    if (!result) {
      setMessage("Please enter a valid transactionHash in the text box.");

      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }
  };

  return (
    <div className="height">
      <div className="message">{message && <h1>{message}</h1>}</div>
      <h2>This is the TaylorChain Block Explorer page</h2>

      <div className="float-container">
        <div className="float-child2">
          <div>
            <h3>View the entire blockchain:</h3>
            <button type="blockchain" onClick={submitBlockchain}>
              View Chain
            </button>
            <br />
          </div>

          <div>
            <h3>Search by block index:</h3>
            <input
       
              type="text"
              name="index"
              required
              value={index}
              placeholder="enter a valid block index"
              onChange={(eventObj) => setIndex(eventObj.target.value)}
            />
            <br />
          
            <button className="marginButton" type="index" onClick={submitIndex}>
              Get Block
            </button>
            <button className="marginButton" type="clear" onClick={clearIndex}>
              Clear
            </button>
          </div>
        </div>

        <div className="float-child2">
          <div>
            <h3>Search for transactions by address:</h3>
            <input
             className="input"
              type="text"
              name="address"
              required
              placeholder="enter a valid wallet address"
              value={address}
              onChange={(eventObj) => setAddress(eventObj.target.value)}
            />
            <br />
        
            <button className="marginButton" type="address" onClick={submitAddress}>
              Search Address
            </button>
            <button className="marginButton" type="clear" onClick={clearAddress}>
              Clear
            </button>
          </div>

          <div>
            <h3>Search for a transaction by hash:</h3>
            <input
             className="input"
              type="text"
              name="transactionHash"
              required
              placeholder="enter a valid transaction hash"
              value={transactionHash}
              onChange={(eventObj) => setTransactionHash(eventObj.target.value)}
            />
            <br />
      
            <button className="marginButton" type="transactionHash" onClick={submitTransactionHash}>
              Search Hash
            </button>
            <button className="marginButton" type="clear" onClick={clearTransaction}>
              Clear
            </button>
          </div>
        </div>

        <div className="float-child2">
          <div>
            <h3>View the pending transactions:</h3>
            <button type="pending" onClick={submitPending}>
              View Pending
            </button>
            <br />
          </div>
          <div>
            <h3>View the confirmed transactions:</h3>
            <button type="confirmed" onClick={submitConfirmed}>
              View Confirmed
            </button>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
