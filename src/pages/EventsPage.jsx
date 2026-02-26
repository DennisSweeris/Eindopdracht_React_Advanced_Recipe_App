import {useState} from "react";
import {Box, Heading, Button, VStack, Skeleton, Text} from "@chakra-ui/react";
import {useEvents} from "../context/EventContext";
import {useUser} from "../context/UserContext";
import {useEventFilters} from "../hooks/useEventFilters";
import {EventList} from "../components/EventList";
import {SearchAndFilter} from "../components/SearchAndFilter";
import {EventFormModal} from "../components/EventFormModal";
import {toaster} from "../components/ui/toaster";
import {HiPlus} from "react-icons/hi";

export const EventsPage = () => {
	const {state, addEvent} = useEvents();
	const {currentUser} = useUser();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	// Create filter controls using our custom hook
	const {filteredEvents, ...filterProps} = useEventFilters(state.events);

	// Handle form submission for new events
	const handleAddEvent = async (eventData) => {
		const result = await addEvent(eventData);
		if (result.success) {
			setIsDialogOpen(false);
		}
		return result;
	};

	if (state.loading) {
		return (
			<Box p={6}>
				<VStack gap={4} align="start">
					<Skeleton height="40px" width="200px" />
					<Skeleton height="60px" width="100%" />
					<Skeleton height="200px" width="100%" />
					<Skeleton height="200px" width="100%" />
				</VStack>
			</Box>
		);
	}

	if (state.error) {
		return (
			<Box p={6}>
				<Text color="red.500">Error Loading Events: {state.error}</Text>
			</Box>
		);
	}

	return (
		<Box p={{base: 4, md: 8}}>
			<Box
				display="flex"
				flexDirection={{base: "column", sm: "row"}}
				justifyContent="space-between"
				alignItems={{base: "flex-start", sm: "center"}}
				gap={4}
				mb={6}>
				<Heading size={{base: "xl", md: "2xl"}}>All Events</Heading>
				<Button
					colorPalette="blue"
					size="lg"
					width={{base: "full", sm: "auto"}}
					onClick={() => {
						if (!currentUser) {
							toaster.error({title: "Authentication required", description: "Please log in to create events"});
							return;
						}
						setIsDialogOpen(true);
					}}
					isDisabled={!currentUser}>
					<HiPlus />
					Add Event
				</Button>
			</Box>

			<SearchAndFilter {...filterProps} categories={state.categories} />

			<Box mb={4}>
				<Text fontSize="sm" color="gray.600">
					Found {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
				</Text>
			</Box>

			{filteredEvents.length === 0 ? (
				<Text textAlign="center" color="red">
					No events found
				</Text>
			) : (
				<EventList events={filteredEvents} categories={state.categories} loading={state.loading} />
			)}

			<EventFormModal
				isOpen={isDialogOpen}
				onClose={() => setIsDialogOpen(false)}
				categories={state.categories}
				onSubmit={handleAddEvent}
			/>
		</Box>
	);
};
