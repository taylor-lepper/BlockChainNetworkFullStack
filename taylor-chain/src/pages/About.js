import React from "react";

class About extends React.Component {
  render() {
    return (
      <div>
           <h2>This is the About page</h2>
        <div className="transaction2">
          <div className="transactionInner3">
         
            <p>
              This website is a fully functioning User Interface to access
              TaylorChain, the world's most innovative blockchain!
            </p>
            <br />
            <h4>Here are some of the resources available:</h4>
            <ul>
       
           
            <li>
              Connect to the network
            </li>
            <li>
              Create a new Wallet
            </li>
            <li>
             Send and recieve transactions
            </li>
            <li>
            Request 1 coin hourly, from the the Faucet
            </li>
            <li>
            Mine new Blocks, and win Block Rewards
            </li>
            <li>
            Explore the Blockchain transactions and Wallets
            </li>
             
            </ul>
           
           
          </div>
        </div>
      </div>
    );
  }
}

export default About;
