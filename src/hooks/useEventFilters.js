import {useState, useMemo} from "react";

export const useEventFilters = (events) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [sortOrder, setSortOrder] = useState("");

	// Reset all filters
	const clearFilters = () => {
		setSearchTerm("");
		setSelectedCategories([]);
		setSortOrder("");
	};

	const toggleCategory = (categoryId, isChecked) => {
		if (isChecked) {
			setSelectedCategories((prev) => [...prev, categoryId]);
		} else {
			setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
		}
	};

	// Filtering logic
	const filteredEvents = useMemo(() => {
		if (!events) return [];
		let filtered = [...events];

		// Date sorting
		if (sortOrder) {
			filtered.sort((a, b) => {
				const dateA = new Date(a.startTime);
				const dateB = new Date(b.startTime);
				return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
			});
		}

		// By Search term
		if (searchTerm) {
			const searchLower = searchTerm.toLowerCase();
			filtered = filtered.filter((event) => {
				const titleMatch = event.title.toLowerCase().includes(searchLower);
				const descriptionMatch = event.description?.toLowerCase().includes(searchLower) || false;
				const locationMatch = event.location?.toLowerCase().includes(searchLower) || false;
				return titleMatch || descriptionMatch || locationMatch;
			});
		}

		// By selected categories
		if (selectedCategories.length > 0) {
			filtered = filtered.filter((event) =>
				selectedCategories.some((selectedId) => event.categoryIds.includes(selectedId)),
			);
		}

		return filtered;
	}, [events, searchTerm, selectedCategories, sortOrder]);

	return {
		filteredEvents,
		searchTerm,
		setSearchTerm,
		selectedCategories,
		sortOrder,
		setSortOrder,
		clearFilters,
		toggleCategory,
		// Helper to check if any filter is active and avoid false positives
		hasActiveFilters: !!searchTerm || !!sortOrder || selectedCategories.length > 0,
	};
};
