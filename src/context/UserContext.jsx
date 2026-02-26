// User authentication and authorization context
// Manages current user state and permissions

import {createContext, useContext, useEffect, useReducer} from "react";
import {toaster} from "../components/ui/toaster";

// Initial state
const getInitialState = () => {
	const storedUser = localStorage.getItem("selectedUser");
	const storedUsers = localStorage.getItem("users");

	let currentUser = null;
	let users = [];

	try {
		if (storedUser) currentUser = JSON.parse(storedUser);
		if (storedUsers) users = JSON.parse(storedUsers);
	} catch (e) {
		console.error("Failed to parse stored user data", e);
	}

	return {
		currentUser,
		users,
		loading: false,
		error: null,
	};
};

// Action types
const SET_LOADING = "SET_LOADING";
const SET_USERS = "SET_USERS";
const SET_CURRENT_USER = "SET_CURRENT_USER";
const SET_ERROR = "SET_ERROR";

// Reducer
const userReducer = (state, action) => {
	switch (action.type) {
		case SET_LOADING:
			return {...state, loading: action.payload};
		case SET_USERS:
			return {...state, users: action.payload, loading: false};
		case SET_CURRENT_USER:
			return {...state, currentUser: action.payload};
		case SET_ERROR:
			return {...state, error: action.payload, loading: false};
		default:
			return state;
	}
};

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({children}) => {
	const [state, dispatch] = useReducer(userReducer, null, getInitialState);

	// Fetch users from API on mount
	useEffect(() => {
		const fetchUsers = async () => {
			// Even if we have cached users, we should fetch fresh data from the server
			dispatch({type: SET_LOADING, payload: true});
			try {
				const users = await fetch("http://localhost:3000/users").then((res) => res.json());
				dispatch({type: SET_USERS, payload: users});

				// Update storage with fresh list
				localStorage.setItem("users", JSON.stringify(users));

				// If we have a stored user, make sure they still exist in the fresh list
				if (state.currentUser) {
					const stillExists = users.find((u) => String(u.id) === String(state.currentUser.id));
					if (!stillExists) {
						dispatch({type: SET_CURRENT_USER, payload: null});
						localStorage.removeItem("selectedUser");
					} else {
						// Update stored user data in case it changed on server
						dispatch({type: SET_CURRENT_USER, payload: stillExists});
						localStorage.setItem("selectedUser", JSON.stringify(stillExists));
					}
				}
			} catch (error) {
				// If we already have users from cache, don't show error as primary state
				if (state.users.length === 0) {
					dispatch({type: SET_ERROR, payload: error.message});
				}
				console.error("API Fetch failed, using cache if available", error);
			} finally {
				dispatch({type: SET_LOADING, payload: false});
			}
		};

		fetchUsers();
	}, []);

	// Set current user (fictive login)
	const setCurrentUser = (user) => {
		if (user) {
			localStorage.setItem("selectedUser", JSON.stringify(user));
			toaster.success({
				title: "Ingelogd",
				description: `Welkom terug, ${user.name}!`,
			});
		} else {
			localStorage.removeItem("selectedUser");
			toaster.info({
				title: "Uitgelogd",
				description: "Je bent succesvol uitgelogd.",
			});
		}
		dispatch({type: SET_CURRENT_USER, payload: user});
	};

	// Logout user
	const logoutUser = () => {
		setCurrentUser(null);
	};

	// Permission checks
	const canEditEvent = () => {
		if (!state.currentUser) return false;
		return true;
	};

	const canDeleteEvent = () => {
		return canEditEvent();
	};

	const getUserById = (id) => {
		return state.users.find((user) => String(user.id) === String(id));
	};

	const value = {
		...state,
		setCurrentUser,
		logoutUser,
		canEditEvent,
		canDeleteEvent,
		getUserById,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook
export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
};
