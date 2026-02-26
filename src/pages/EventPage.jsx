import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {
	Box,
	Heading,
	Text,
	Image,
	Stack,
	Badge,
	Button,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Flex,
	Avatar,
	SimpleGrid,
} from "@chakra-ui/react";
import {useEvents} from "../context/EventContext";
import {useUser} from "../context/UserContext";
import {EventFormModal} from "../components/EventFormModal";
import {ConfirmDialog} from "../components/ConfirmDialog";

import {HiInformationCircle, HiArrowLeft} from "react-icons/hi";
import {formatDateForDisplay} from "../utils/dateUtils";
import {FALLBACK_IMAGE} from "../utils/imageUtils";

const DESCRIPTION_WORD_LIMIT = 200;

export const EventPage = () => {
	const {eventId} = useParams();
	const navigate = useNavigate();
	const {state, updateEvent, deleteEvent, getEventCategories} = useEvents();
	const {canEditEvent, canDeleteEvent, getUserById} = useUser();
	const [event, setEvent] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isDeleting, setIsDeleting] = useState(false);
	const [editOpen, setEditOpen] = useState(false);
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [imageSrc, setImageSrc] = useState("");
	const [isExpanded, setIsExpanded] = useState(false);

	// Load event data
	useEffect(() => {
		if (state.loading && state.events.length === 0) {
			setLoading(true);
			return;
		}

		if (isDeleting) return;

		const loadEvent = () => {
			const foundEvent = state.events.find((e) => String(e.id) === String(eventId));

			if (!foundEvent) {
				// Only set error if global data is loaded
				if (!state.loading) {
					if (state.events.length > 0) {
						setError("This event doesn't exist or may have been removed.");
					} else {
						setError("No events available.");
					}
					setLoading(false);
				}
			} else {
				setEvent(foundEvent);
				setImageSrc(foundEvent.image);
				setError(null);
				setLoading(false);
			}
		};

		loadEvent();
	}, [eventId, state.events, state.loading, isDeleting]);

	// Close dialogs when event becomes null (after deletion)
	useEffect(() => {
		if (!event && !loading && state.events.length > 0) {
			setDeleteOpen(false);
			setEditOpen(false);
		}
	}, [event, loading, state.events.length]);

	// Handle event update
	const handleUpdateEvent = async (eventData) => {
		const result = await updateEvent(eventId, eventData);

		if (result.success) {
			setEvent(result.data);
			setImageSrc(result.data.image);
		}

		return result;
	};

	// Handle event deletion
	const handleDeleteEvent = async () => {
		setIsDeleting(true);
		const result = await deleteEvent(eventId);

		if (result.success) {
			navigate("/events");
		} else {
			setIsDeleting(false);
		}

		return result;
	};

	if (loading) {
		return (
			<Box p={6}>
				<Stack gap={6}>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Skeleton height="40px" width="300px" />
						<Stack direction="row" gap={3}>
							<Skeleton height="40px" width="100px" />
							<Skeleton height="40px" width="100px" />
						</Stack>
					</Box>
					<Skeleton height="400px" borderRadius="lg" />
					<Box>
						<Skeleton height="24px" width="150px" mb={2} />
						<Stack direction="row" gap={2} align="center">
							<SkeletonCircle size="6" />
							<Skeleton height="20px" width="100px" />
						</Stack>
					</Box>
					<Stack gap={4}>
						<Box>
							<Skeleton height="24px" width="150px" mb={2} />
							<SkeletonText noOfLines={3} />
						</Box>
					</Stack>
				</Stack>
			</Box>
		);
	}

	if (error) {
		return (
			<Box p={6} display="flex" justifyContent="center" alignItems="center" minH="60vh">
				<Box textAlign="center" p={10} bg="white" boxShadow="xl" borderRadius="lg">
					<Box color="red.500" mb={2} display="flex" justifyContent="center">
						<HiInformationCircle size="4rem" />
					</Box>
					<Heading fontSize="xl" mb={4}>
						Event Not Found
					</Heading>
					<Text color="red.500" mb={4} fontSize="lg">
						{error || "Something went wrong."}
					</Text>
					<Button colorPalette="blue" size="lg" onClick={() => navigate("/events")} display="flex" gap={2} mx="auto">
						<HiArrowLeft /> Back to Events
					</Button>
				</Box>
			</Box>
		);
	}

	if (!event) {
		return null;
	}

	const eventCategories = getEventCategories(event.categoryIds);
	const eventCreator = getUserById(event.createdBy);

	// Description logic
	const descriptionWords = event.description.split(/\s+/);
	const isLongDescription = descriptionWords.length > DESCRIPTION_WORD_LIMIT;
	const displayedDescription =
		isLongDescription && !isExpanded
			? descriptionWords.slice(0, DESCRIPTION_WORD_LIMIT).join(" ") + "..."
			: event.description;

	return (
		<Box p={{base: 4, md: 8}}>
			<Stack gap={8}>
				<Box
					display="flex"
					flexDirection={{base: "column", md: "row"}}
					justifyContent="space-between"
					alignItems={{base: "flex-start", md: "center"}}
					gap={4}>
					<Heading size={{base: "2xl", md: "3xl"}}>{event.title}</Heading>
					<Stack direction="row" gap={2} width={{base: "full", md: "auto"}}>
						{canEditEvent(event) && (
							<Button flex={{base: 1, md: "initial"}} colorPalette="blue" onClick={() => setEditOpen(true)}>
								Edit Event
							</Button>
						)}
						{canDeleteEvent(event) && (
							<Button flex={{base: 1, md: "initial"}} colorPalette="red" onClick={() => setDeleteOpen(true)}>
								Delete Event
							</Button>
						)}
					</Stack>
				</Box>

				<Flex direction={{base: "column", lg: "row"}} gap={6}>
					{/* Left Column: Media & Metadata (40%)*/}
					<Box w={{base: "full", lg: "40%"}}>
						<Image
							src={imageSrc}
							alt={event.title}
							onError={() => setImageSrc(FALLBACK_IMAGE)}
							borderRadius="xl"
							objectFit="cover"
							width="100%"
							maxHeight={{base: "300px", lg: "450px"}}
							boxShadow="xl"
							mb={8}
						/>

						{/* Location & Time Box */}
						<Box p={8} mb={8} bg="blue.50" borderRadius="xl" boxShadow="sm">
							<Stack gap={8}>
								<Box>
									<Heading size="sm" mb={2} textTransform="uppercase" color="gray.500">
										Locatie
									</Heading>
									<Text fontSize="xl" fontWeight="medium">
										{event.location}
									</Text>
								</Box>

								<SimpleGrid columns={{base: 1, md: 2}} gap={8}>
									<Box>
										<Heading size="xs" mb={2} textTransform="uppercase" color="gray.500">
											Begint op
										</Heading>
										<Text fontSize="lg" fontWeight="bold" color="blue.500">
											{formatDateForDisplay(event.startTime)}
										</Text>
									</Box>
									<Box>
										<Heading size="xs" mb={2} textTransform="uppercase" color="gray.500">
											Eindigt op
										</Heading>
										<Text fontSize="lg" fontWeight="bold" color="red.500">
											{formatDateForDisplay(event.endTime)}
										</Text>
									</Box>
								</SimpleGrid>
							</Stack>
						</Box>

						{/* Organizer & Categories */}
						<Stack gap={8} p={8} bg="white" borderRadius="xl" boxShadow="sm">
							{eventCreator && (
								<Box>
									<Heading size="sm" mb={4} textTransform="uppercase" color="gray.500">
										Organisator
									</Heading>
									<Flex align="center" gap={4}>
										<Avatar.Root size="md">
											<Avatar.Fallback name={eventCreator.name} />
											<Avatar.Image src={eventCreator.image} />
										</Avatar.Root>
										<Text fontSize="xl" fontWeight="medium">
											{eventCreator.name}
										</Text>
									</Flex>
								</Box>
							)}

							<Box>
								<Heading size="sm" mb={4} textTransform="uppercase" color="gray.500">
									Categorieën
								</Heading>
								<Flex gap={2} flexWrap="wrap">
									{eventCategories && eventCategories.length > 0 ? (
										eventCategories.map((category) => (
											<Badge
												key={category.id}
												colorPalette="blue"
												size="md"
												variant="surface"
												borderRadius="full"
												textTransform="capitalize">
												{category.name}
											</Badge>
										))
									) : (
										<Text color="gray.500">Geen categorieën</Text>
									)}
								</Flex>
							</Box>
						</Stack>
					</Box>

					{/* Right Column: Information (60%) */}
					<Box flex="1">
						<Stack gap={8}>
							<Box bg="white" p={8} borderRadius="xl" boxShadow="md">
								<Heading size="lg" mb={6} color="blue.500">
									Beschrijving
								</Heading>
								<Text fontSize="lg" whiteSpace="pre-wrap">
									{displayedDescription}
								</Text>

								{isLongDescription && (
									<Button
										mt={4}
										variant="subtle"
										colorPalette="blue"
										size="sm"
										onClick={() => setIsExpanded(!isExpanded)}>
										{isExpanded ? "Toon minder" : "Lees meer"}
									</Button>
								)}
							</Box>
						</Stack>
					</Box>
				</Flex>
			</Stack>

			{/* Edit Modal */}
			<EventFormModal
				isOpen={editOpen}
				onClose={() => setEditOpen(false)}
				event={event}
				categories={state.categories}
				onSubmit={handleUpdateEvent}
			/>

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				isOpen={deleteOpen}
				onClose={() => setDeleteOpen(false)}
				onConfirm={handleDeleteEvent}
				title="Delete Event"
				message={`Are you sure you want to delete "${event.title}"? This action cannot be undone.`}
			/>
		</Box>
	);
};
