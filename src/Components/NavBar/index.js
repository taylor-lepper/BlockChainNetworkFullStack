import React from "react";

import {
	Nav,
	NavLogo,
	NavLink,
	Bars,
	NavMenu,
	// NavBtn,
	// NavBtnLink,
} from "./NavbarElements";

class Navbar extends React.Component {
	render() {
		console.log(this.props);


			return (
				<>
					<Nav>
						<NavLogo to="/">Taylor's BlockChain</NavLogo>
						<Bars />

						<NavMenu>
							<NavLink to="/" activestyle="true">
								Home
							</NavLink>
							<NavLink to="/about" activestyle="true">
								About
							</NavLink>

							<NavLink to="/wallet" activestyle="true">
								Wallet
							</NavLink>
					
							<NavLink to="/miner" activestyle="true">
								Miner
							</NavLink>
							
							<NavLink to="/peers" activestyle="true">
								Peers
							</NavLink>

							<NavLink to="/faucet" activestyle="true">
								Faucet
							</NavLink>
						
							<NavLink to="/explorer" activestyle="true">
								Explorer
							</NavLink>
						</NavMenu>
					</Nav>
				</>
			);
		} 
	}
export default Navbar;
