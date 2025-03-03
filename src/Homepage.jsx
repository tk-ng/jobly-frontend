import { Button } from "reactstrap";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router";
import "./Homepage.css";

export const Homepage = () => {
	const { currentUser } = useContext(UserContext);
	return (
		<div className="Homepage">
			<h1 className="mb-4 fw-bold">Jobly</h1>
			<p className="lead">All the jobs in one, covenient place.</p>
			{currentUser ? (
				<h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
			) : (
				<p>
					<Link to="/login" className="btn btn-primary fw-bold me-3">
						Log in
					</Link>
					<Link to="/signup" className="btn btn-primary fw-bold">
						Sign up
					</Link>
				</p>
			)}
		</div>
	);
};
