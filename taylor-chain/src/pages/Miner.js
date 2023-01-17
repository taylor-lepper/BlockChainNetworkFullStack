import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mining from "../actions/mining";

const Miner = (props) => {
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const navigate = useNavigate();

  const job = async (event) => {
    event.preventDefault();

    if(address === ""){
      setMessage(
        "Please enter a valid wallet address to get a mining job"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await mining("job", address);

    if(result.errorMsg){
      console.log('Submit mining job error');
      setMessage(
        result.errorMsg
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    if (result) {
      console.log(result);
      navigate("jobs", {
        state: {
          type: "job",
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

  const submit = async (event) => {
    event.preventDefault();

    if(address2 === ""){
      setMessage(
        "Please enter a valid wallet address to submit your mining job"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    const result = await mining("submit", address2);

    if(result.errorMsg){
      console.log('Submit block error');
      setMessage(
        result.errorMsg
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }



    if(result ==='Network Error'){
      console.log('Network Error');
      setMessage(
       "Network Error, make sure you are connected on that port!"
      );
      setTimeout(() => {
        setMessage("");
      }, 4000);
      return;
    }

    if (result) {
      console.log(result);
      navigate("jobs", {
        state: {
          type: "submit",
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
    <div className="float-container">
      <h2>This is the Mining page</h2>
      <div>
        <h3>
          Here, you can request a new mining job, and submit proof of work!
        </h3>
      </div>

      <div className="message">{message && <h1>{message}</h1>}</div>

      <div className="float-child">
        <div className="paddingTop2">
          <h3>Jobs</h3>
          <h4>Click below to get a new mining job!</h4>

          <h5>Please enter your wallet address</h5>
          <input
          className="input2"
              type="text"
              name="address"
              required
              placeholder="enter your wallet address"
              value={address}
              onChange={(eventObj) => setAddress(eventObj.target.value)}
            />
            <br/>
          <button className="marginButton" type="job" onClick={job}>
            Get a Job
          </button>
        </div>
      </div>

      <div className="float-child">
        <div className="paddingTop2">
          <h3>Submit</h3>
          <h4>Click below to get solve and submit your current job!</h4>

          <h5>Please enter your wallet address</h5>
          <input
          className="input2"
              type="text"
              name="address2"
              required
              placeholder="enter your wallet address"
              value={address2}
              onChange={(eventObj) => setAddress2(eventObj.target.value)}
            />
              <br/>
          <button className="marginButton" type="submit" onClick={submit}>
            Submit Proof
          </button>
        </div>
      </div>
    </div>
  );
};

export default Miner;
