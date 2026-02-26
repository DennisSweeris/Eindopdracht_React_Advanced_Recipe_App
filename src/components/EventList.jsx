import {Box, SimpleGrid, Skeleton, Text, Stack} from "@chakra-ui/react";
import {EventItem} from "./EventItem";

export const EventList = ({events, categories, loading}) => {
	if (loading) {
		const skeletonCount = events.length > 0 ? events.length : 8;
		return (
			<SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={6}>
				{[...Array(skeletonCount)].map((_, index) => (
					<Box key={index} borderWidth="1px" borderRadius="xl" overflow="hidden" p={4} bg="white">
						<Skeleton height="200px" mb={4} borderRadius="lg" />
						<Stack gap={3}>
							<Skeleton height="24px" width="80%" />
							<Skeleton height="16px" noOfLines={3} />
							<Box pt={2}>
								<Skeleton height="10px" width="40%" />
							</Box>
						</Stack>
					</Box>
				))}
			</SimpleGrid>
		);
	}

	if (!events.length)
		return (
			<Text textAlign="center" color="red">
				No events found
			</Text>
		);

	return (
		<SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={6} gap={2}>
			{events.map((event) => (
				<EventItem key={event.id} event={event} categories={categories} />
			))}
		</SimpleGrid>
	);
};
