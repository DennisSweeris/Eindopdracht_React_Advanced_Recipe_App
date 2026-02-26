export const initialState = {
	events: [],
	categories: [],
	loading: true,
	error: null,
};

export function eventReducer(state, action) {
	switch (action.type) {
		case "LOADING": {
			return {
				...state,
				loading: true,
				error: null,
			};
		}

		case "SET_DATA": {
			return {
				...state,
				events: action.payload.events,
				categories: action.payload.categories,
				loading: false,
				error: null,
			};
		}

		case "ADD_EVENT": {
			return {
				...state,
				events: [...state.events, action.payload],
				loading: false,
				error: null,
			};
		}

		case "UPDATE_EVENT": {
			return {
				...state,
				events: state.events.map((event) => (String(event.id) === String(action.payload.id) ? action.payload : event)),
				loading: false,
				error: null,
			};
		}

		case "DELETE_EVENT": {
			const filteredEvents = state.events.filter((event) => String(event.id) !== String(action.payload));

			return {
				...state,
				events: filteredEvents,
				loading: false,
				error: null,
			};
		}

		case "ERROR": {
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		}

		case "CLEAR_ERROR": {
			return {
				...state,
				error: null,
			};
		}

		default: {
			return state;
		}
	}
}
