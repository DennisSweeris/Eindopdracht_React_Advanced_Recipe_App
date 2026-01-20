// Bevat alle state transities voor events & categories
// SSOT (Single Source of Truth)

const initialState = {
	events: [],
	categories: [],
	loading: false,
	error: null,
};

export const eventReducer = (state, action) => {
	switch (action.type) {
		case "LOADING":
			return { ...state, loading: true, error: null };
		case "SET_DATA":
			return {};
		case "ADD_EVENT":
			return {};
		case "UPDATE_EVENT":
			return {};
		case "REMOVE_EVENT":
			return {};
		case "ERROR":
			return {};
		default: {
			return state;
		}
	}
};
