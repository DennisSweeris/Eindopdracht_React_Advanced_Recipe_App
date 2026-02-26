// Event item component
// Displays event card with link to detail page

import {useState} from "react";
import {Box, Heading, Text, Image, Stack, Badge, LinkBox, LinkOverlay} from "@chakra-ui/react";
import {Link} from "react-router-dom";

import {formatDateForDisplay} from "../utils/dateUtils";
import {FALLBACK_IMAGE} from "../utils/imageUtils";

export const EventItem = ({event, categories}) => {
	const [imageSrc, setImageSrc] = useState(event.image);
	const eventCategories = event.categoryIds.map((id) => categories.find((cat) => cat.id === id)).filter(Boolean);

	return (
		<LinkBox as="article">
			<Box
				borderWidth="1px"
				borderRadius="xl"
				overflow="hidden"
				p="1.25rem"
				bg="white"
				h="100%"
				transition="transform 0.3s"
				_hover={{transform: "translateY(-4px)", boxShadow: "xl"}}>
				<Image
					src={imageSrc}
					alt={event.title}
					onError={() => setImageSrc(FALLBACK_IMAGE)}
					mb="1rem"
					borderRadius="md"
					objectFit="cover"
					width="100%"
					height="12.5rem"
				/>

				<Stack gap="0.5rem">
					<Heading size="md" lineClamp={2}>
						<LinkOverlay as={Link} to={`/event/${event.id}`}>
							{event.title}
						</LinkOverlay>
					</Heading>

					<Text lineClamp={3}>{event.description}</Text>

					<Text fontSize="0.875rem">
						<strong>Start:</strong> {formatDateForDisplay(event.startTime)}
					</Text>
					<Text fontSize="0.875rem">
						<strong>End:</strong> {formatDateForDisplay(event.endTime)}
					</Text>

					<Text fontSize="0.875rem" color="gray.500" display="flex" alignItems="center" mt="0.5rem">
						{event.location}
					</Text>

					<Stack direction="row" gap="0.5rem" mt="0.5rem">
						{eventCategories.map((category) => (
							<Badge key={category.id} colorPalette="blue" textTransform="capitalize">
								{category.name}
							</Badge>
						))}
					</Stack>
				</Stack>
			</Box>
		</LinkBox>
	);
};
