import { Navbar, Nav, NavbarBrand, NavItem } from "reactstrap";
import { NavLink, Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import "./Navigation.css";

export const Navigation = ({ logout }) => {
	const { currentUser } = useContext(UserContext);
	return (
		<div className="Navigation">
			<Navbar expand="md">
				<NavbarBrand href="/">Jobly</NavbarBrand>
				<Nav navbar>
					{currentUser ? (
						<>
							<NavItem>
								<NavLink className="nav-link" to="/companies">
									Companies
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link" to="/jobs">
									Jobs
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link" to="/profile">
									Profile
								</NavLink>
							</NavItem>
							<NavItem>
								<Link className="nav-link" to="/" onClick={logout}>
									Log out
								</Link>
							</NavItem>
						</>
					) : (
						<>
							<NavItem>
								<NavLink className="nav-link" to="/login">
									Login
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink className="nav-link" to="/signup">
									Sign Up
								</NavLink>
							</NavItem>
						</>
					)}
				</Nav>
			</Navbar>
		</div>
	);
};
