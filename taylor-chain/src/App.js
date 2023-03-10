import React from "react";
import { Routes, Route } from "react-router-dom";

// css
import './App.css';



//pages
import Main from "./pages/Main";
import About from "./pages/About";
import Miner from "./pages/Miner";
import MiningJob from "./pages/MiningJob";
import Peers from "./pages/Peers";
import Nodes from "./pages/Nodes";
import Faucet from "./pages/Faucet";
import Explorer from "./pages/Explorer";
import ExplorerResults from "./pages/ExplorerResults";
import Wallet from "./pages/Wallet";
import WalletResults from "./pages/WalletResults";
import Transactions from "./pages/Transactions";
import TransactionsResults from "./pages/TransactionsResults";

class App extends React.Component {
  render(){
    console.log(this.props);
  
  return (
    <div className="App">
      <Routes>
      <Route
						exact
						path="/"
						element={
							<Main/>
						}
					/>
          <Route path="/about" element={<About />} />
          <Route path="/miner" element={<Miner />} />
          <Route path="/miner/jobs" element={<MiningJob />} />
          <Route path="/peers" element={<Peers />} />
          <Route path="/peers/nodes" element={<Nodes />} />
          <Route path="/faucet" element={<Faucet />} />
          <Route path="/explorer" element={<Explorer />} />
          <Route path="/explorer/results" element={<ExplorerResults />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/results" element={<WalletResults />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/results" element={<TransactionsResults />} />
      </Routes>
      
       
    </div>
  );
}
}
export default App;
