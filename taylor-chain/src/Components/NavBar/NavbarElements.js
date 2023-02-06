import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
	background: rgb(77, 166, 255);
	height: 85px;
	display: flex;
	width: (100vw - 175px)
	justify-content: space-between;
	align-items: center;
	padding-left: 195px;
	z-index: 12;

	@media screen and (max-width: 768) {
		padding: 0;
	}


	
`;
export const NavLogo = styled(Link)`
	cursor: pointer;
	color: rgb(255, 236, 194);
	font-size: 25px;

	text-decoration: none;

	&:hover {
		color: lightGreen;
	}
	@media screen and (max-width: 768px) {
		padding-left: 10px;
		text-align: left;
		float: left;
	}
	@media screen and (max-width: 900px) {
		font-size: 11px;
		padding-left: 4px;
	}
	@media screen and (max-width: 1000px) {
		font-size: 16px;
		padding-left: 6px;
	}
	@media screen and (max-width: 1100px) {
		font-size: 20px;
		padding-left: 8px;
	}
	@media screen and (max-width: 1400px) {
		font-size: 25px;
		padding-left: 15px;
	}
`;

export const NavLink = styled(Link)`
	color: rgb(255, 255, 153);
	display: flex;

	align-items: center;
	font-size: 20px;
	text-decoration: none;
	padding: 0 0.5rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: rgb(132, 225, 132);
	}
	&:hover {
		color: red;
	}
	@media screen and (max-width: 900) {
		font-size: 8;
		padding: 1px;
	}
	@media screen and (max-width: 1100px) {
		font-size: 10px;
		padding: 2px;
	}
	@media screen and (max-width: 1100px) {
		font-size: 13px;
		padding: 4px;
	}
	@media screen and (max-width: 1400px) {
		font-size: 15px;
		padding: 8px;
	}
`;

export const Bars = styled(FaBars)`
	display: none;
	color: #fff;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	padding-left: 35%;
	padding-right: 25px;
	float: right;
	@media screen and (max-width: 768px) {
		display: none;
	}
	@media screen and (max-width: 1000) {
		padding-left: 5px;
		padding-right: 5px;
		float: none;
	}
	@media screen and (max-width: 1100) {
		padding-left: 20px;
		padding-right: 15px;
		float: none;
	}
`;

export const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-right: 24px;
	font-size: 15px;
`;

export const NavBtnLink = styled(Link)`
	border-radius: 4px;
	background: transparent;
	padding: 10px 22px;
	color: #fff;
	outline: none;
	border: 1px solid #fff;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	margin-left: 24px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: blue;
		color: rgb(255, 255, 153);
	}
	@media screen and (max-width: 1000px) {
		padding: 1px 2px;
		margin-left: 1px;
	}
	@media screen and (max-width: 1100px) {
		padding: 2px 6px;
		margin-left: 2px;
	}
	@media screen and (max-width: 1400px) {
		padding: 6px 12px;
	}
`;
