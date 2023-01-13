import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mining from "../actions/mining";

const Miner = (props) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const job = async (event) => {
    event.preventDefault();
    const result = await mining("job");

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
    const result = await mining("submit");

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
      setMessage("You need to get a job Spicoli!\n Click the button to your left!");
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
          <button type="job" onClick={job}>
            Get a Job
          </button>
        </div>
      </div>

      <div className="float-child">
        <div className="paddingTop2">
          <h3>Submit</h3>
          <h4>Click below to get solve and submit your current job!</h4>
          <button type="submit" onClick={submit}>
            Submit Proof
          </button>
        </div>
      </div>
    </div>
  );
};

export default Miner;
