import {createContext, useContext, useEffect, useReducer} from "react";
import {eventReducer, initialState} from "./EventReducer";
import {toaster} from "../components/ui/toaster";

const EventContext = createContext(null);

export const EventProvider = ({children}) => {
	const [state, dispatch] = useReducer(eventReducer, initialState);

	useEffect(() => {
		const fetchData = async () => {
			dispatch({type: "LOADING"});

			try {
				const [events, categories] = await Promise.all([
					fetch("http://localhost:3000/events").then((response) => response.json()),
					fetch("http://localhost:3000/categories").then((response) => response.json()),
				]);

				dispatch({
					type: "SET_DATA",
					payload: {events, categories},
				});
			} catch (error) {
				dispatch({
					type: "ERROR",
					payload: error.message,
				});
			}
		};

		fetchData();
	}, []);

	// CRUD operations
	const actions = {
		// Create new event
		addEvent: async (eventData) => {
			dispatch({type: "LOADING"});
			try {
				const response = await fetch("http://localhost:3000/events", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(eventData),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const newEvent = await response.json();
				dispatch({type: "ADD_EVENT", payload: newEvent});
				toaster.success({title: "Event created successfully!"});
				return {success: true, data: newEvent};
			} catch (error) {
				dispatch({type: "ERROR", payload: error.message});
				toaster.error({title: "Failed to create event", description: error.message});
				return {success: false, error: error.message};
			}
		},

		// Update existing event
		updateEvent: async (id, eventData) => {
			dispatch({type: "LOADING"});
			try {
				const response = await fetch(`http://localhost:3000/events/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(eventData),
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const updatedEvent = await response.json();
				dispatch({type: "UPDATE_EVENT", payload: updatedEvent});
				toaster.success({title: "Event updated successfully!"});
				return {success: true, data: updatedEvent};
			} catch (error) {
				dispatch({type: "ERROR", payload: error.message});
				toaster.error({title: "Failed to update event", description: error.message});
				return {success: false, error: error.message};
			}
		},

		// Delete event
		deleteEvent: async (id) => {
			dispatch({type: "LOADING"});
			try {
				const response = await fetch(`http://localhost:3000/events/${id}`, {
					method: "DELETE",
				});

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				dispatch({type: "DELETE_EVENT", payload: id});
				toaster.success({title: "Event deleted successfully!"});
				return {success: true};
			} catch (error) {
				dispatch({type: "ERROR", payload: error.message});
				toaster.error({title: "Failed to delete event", description: error.message});
				return {success: false, error: error.message};
			}
		},

		// Clear error
		clearError: () => dispatch({type: "CLEAR_ERROR"}),

		// Refresh data from server
		refreshData: async () => {
			dispatch({type: "LOADING"});
			try {
				const [events, categories] = await Promise.all([
					fetch("http://localhost:3000/events").then((res) => res.json()),
					fetch("http://localhost:3000/categories").then((res) => res.json()),
				]);

				dispatch({
					type: "SET_DATA",
					payload: {events, categories},
				});
			} catch (error) {
				dispatch({
					type: "ERROR",
					payload: error.message,
				});
			}
		},
	};

	// Selectors
	const selectors = {
		getCategoryById: (id) => state.categories.find((cat) => String(cat.id) === String(id)),
		getEventCategories: (categoryIds) => {
			if (!categoryIds) return [];
			return categoryIds.map((id) => state.categories.find((cat) => String(cat.id) === String(id))).filter(Boolean);
		},
	};

	return <EventContext.Provider value={{state, dispatch, ...actions, ...selectors}}>{children}</EventContext.Provider>;
};

export const useEvents = () => {
	const context = useContext(EventContext);
	if (!context) {
		throw new Error("useEvents must be used within an EventProvider");
	}
	return context;
};
