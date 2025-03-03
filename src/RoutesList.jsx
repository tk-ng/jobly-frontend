import { Routes, Route, Navigate } from "react-router";
import { Homepage } from "./Homepage";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";
import { UserContext } from "./UserContext";
import { CompanyList } from "./CompanyList";
import { CompanyDetail } from "./CompanyDetail";
import { JobList } from "./JobList";
import { ProfileForm } from "./ProfileForm";
import { useContext } from "react";

export const RoutesList = ({ login, signup }) => {
	const { currentUser } = useContext(UserContext);
	return (
		<div className="pt-5">
			<Routes>
				<Route path="/" element={<Homepage />} />
				{!currentUser ? (
					<>
						<Route path="/login" element={<LoginForm login={login} />} />
						<Route path="/signup" element={<SignupForm signup={signup} />} />
					</>
				) : (
					<>
						<Route path="/companies" element={<CompanyList />} />
						<Route path="/jobs" element={<JobList />} />
						<Route path="/companies/:handle" element={<CompanyDetail />} />
						<Route path="/profile" element={<ProfileForm />} />
					</>
				)}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
};
