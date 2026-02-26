import {Dialog, Button, Stack, Box, Heading, Text, Flex, Badge} from "@chakra-ui/react";
import {
	HiCode,
	HiOutlineServer,
	HiOutlineViewGrid,
	HiOutlineDocumentText,
	HiOutlinePuzzle,
	HiLightningBolt,
	HiAcademicCap,
} from "react-icons/hi";

const ArchitectureStep = ({title, components, description, icon: Icon, isLast}) => (
	<Flex gap={4} position="relative">
		{!isLast && <Box position="absolute" left="1.25rem" top="2.5rem" bottom="-1rem" w="2px" bg="blue.100" />}
		<Box
			flexShrink={0}
			boxSize="2.5rem"
			borderRadius="full"
			bg="blue.500"
			color="white"
			display="flex"
			alignItems="center"
			justifyContent="center"
			zIndex={1}>
			<Icon size="1.25rem" />
		</Box>
		<Stack gap={2} pb={6}>
			<Heading size="sm" color="blue.700">
				{title}
			</Heading>
			<Flex gap={2} wrap="wrap">
				{components.map((comp) => (
					<Badge key={comp} variant="subtle" colorPalette="blue" size="sm">
						{comp}
					</Badge>
				))}
			</Flex>
			<Text fontSize="sm" color="gray.600">
				{description}
			</Text>
		</Stack>
	</Flex>
);

export const ArchitectureModal = ({isOpen, onClose}) => {
	return (
		<Dialog.Root open={!!isOpen} onOpenChange={(e) => !e.open && onClose()} size="lg">
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content maxH="80vh" overflowY="auto" borderRadius="2xl">
					<Dialog.Header bg="blue.600" color="white" py={6} px={8} display="flex" justifyContent="center">
						<Dialog.Title fontSize="2xl">App-Architectuur & Flow</Dialog.Title>
					</Dialog.Header>

					<Dialog.Body p={8}>
						<Stack gap={2}>
							<ArchitectureStep
								title="1. Fundament"
								components={["Main.jsx"]}
								description="Verbindt React met de browser en zet de basis hiërarchie en routes op."
								icon={HiCode}
							/>
							<ArchitectureStep
								title="2. Data & Sessie"
								components={["EventContext", "UserContext"]}
								description="Slaat alle events en gebruikers centraal op voor de hele app."
								icon={HiOutlineServer}
							/>
							<ArchitectureStep
								title="3. Hooks & Utils"
								components={["useEventFilters", "dateUtils", "imageUtils"]}
								description="Rekenwerk voor filters, data-formatting en image-fallbacks."
								icon={HiLightningBolt}
							/>
							<ArchitectureStep
								title="4. Layout"
								components={["Root.jsx", "Navigation.jsx"]}
								description="Zorgt voor navigatie en een consistente layout op elk scherm."
								icon={HiOutlinePuzzle}
							/>
							<ArchitectureStep
								title="5. Pagina's"
								components={["EventsPage", "EventPage", "AboutPage"]}
								description="Halen de nodige data op en sturen sub-componenten aan."
								icon={HiOutlineDocumentText}
							/>
							<ArchitectureStep
								title="6. UI"
								components={["EventList", "EventItem"]}
								description="Zorgt ervoor dat events er als mooie, duidelijke kaarten uitzien."
								icon={HiOutlineViewGrid}
							/>
							<ArchitectureStep
								title="7. Interactie"
								components={["SearchAndFilter", "EventFormModal", "ConfirmDialog"]}
								description="Zoeken, filteren, aanmaken en verwijderen van content."
								icon={HiAcademicCap}
								isLast
							/>
						</Stack>
					</Dialog.Body>

					<Dialog.Footer p={6}>
						<Button colorPalette="blue" onClick={onClose} width="full">
							Sluiten
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};
