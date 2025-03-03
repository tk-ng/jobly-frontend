import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigation } from "./Navigation";
import { RoutesList } from "./RoutesList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { UserContext } from "./UserContext";
import { useState, useEffect } from "react";
import { JoblyApi } from "./api";
import * as jwt from "jsonwebtoken-esm";

function App() {
	const [currentUser, setCurrentUser] = useState({
		infoLoaded: false,
		data: null,
	});
	const [token, setToken] = useLocalStorage("jobly-token");
	const [appliedJobIds, setAppliedJobIds] = useState(new Set([]));

	useEffect(
		function loadUserInfo() {
			async function getCurrentUser() {
				if (token) {
					try {
						let { username } = jwt.decode(token);
						JoblyApi.token = token;
						let currentUser = await JoblyApi.getCurrentUser(username);

						setCurrentUser({
							infoLoaded: true,
							data: currentUser,
						});
						setAppliedJobIds(new Set(currentUser.applications));
					} catch (err) {
						console.error(err);
						setCurrentUser({
							infoLoaded: true,
							data: null,
						});
					}
				} else {
					setCurrentUser({
						data: null,
						infoLoaded: true,
					});
				}
			}
			getCurrentUser();
		},
		[token]
	);

	async function login(loginData) {
		const token = await JoblyApi.login(loginData);
		setToken(token);
	}

	async function logout() {
		setCurrentUser({
			data: null,
			infoLoaded: true,
		});
		setToken(null);
	}

	async function signup(signupData) {
		const token = await JoblyApi.signup(signupData);
		setToken(token);
	}

	function hasAppliedToJob(id) {
		return appliedJobIds.has(id);
	}

	async function applyToJob(id) {
		if (hasAppliedToJob(id)) return;
		await JoblyApi.applyToJob({ username: currentUser.data.username, id });
		setAppliedJobIds((appliedJobIds) => new Set([...appliedJobIds, id]));
	}

	if (!currentUser.infoLoaded) return <div>Loading ...</div>;

	return (
		<UserContext.Provider
			value={{
				currentUser: currentUser.data,
				setCurrentUser,
				applyToJob,
				hasAppliedToJob,
			}}
		>
			<Navigation logout={logout} />
			<RoutesList login={login} signup={signup} />
		</UserContext.Provider>
	);
}

export default App;
