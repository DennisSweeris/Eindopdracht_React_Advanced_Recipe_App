import {useState} from "react";
import {Box, Heading, Text, Stack, Container, Badge, SimpleGrid, Flex, Button} from "@chakra-ui/react";
import {HiCode, HiDatabase, HiColorSwatch, HiAcademicCap} from "react-icons/hi";
import {ArchitectureModal} from "../components/ArchitectureModal";

const TechCard = ({title, description, icon: IconComponent, color}) => (
	<Box p="1.5rem" borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm" position="relative" overflow="hidden">
		<Stack gap="1rem">
			<Box color={color}>
				<IconComponent size="1rem" />
			</Box>
			<Heading size="md">{title}</Heading>
			<Text fontSize="0.875rem" color="gray.500">
				{description}
			</Text>
		</Stack>
	</Box>
);

const EvolutionStep = ({step, title, description, badgeColor}) => (
	<Flex gap="1.5rem" position="relative" pb="2rem">
		<Box flexShrink={0}>
			<Badge colorPalette={badgeColor} borderRadius="full" px="0.75rem" py="0.25rem" variant="solid">
				Fase {step}
			</Badge>
		</Box>
		<Stack gap="0.5rem">
			<Heading size="sm" display="flex" align="center" gap="0.5rem">
				{title}
			</Heading>
			<Text fontSize="0.875rem" color="gray.600">
				{description}
			</Text>
		</Stack>
	</Flex>
);

export const AboutPage = () => {
	const [isArchOpen, setIsArchOpen] = useState(false);

	return (
		<Container maxW="80rem" py={{base: "2.5rem", md: "4rem"}} px={{base: "1.25rem", md: "2rem"}}>
			<Stack gap={{base: "2.5rem", md: "4rem"}}>
				<Box textAlign="center">
					<Heading size={{base: "2xl", md: "4xl"}} mb="1rem">
						De Evolutie van dit Project
					</Heading>
					<Text fontSize={{base: "md", md: "xl"}} color="gray.600" maxW="40rem" mx="auto">
						Van een basis React-opzet naar een robuust en schaalbaar platform. Hier lees je hoe ik dit project stap voor
						stap heb opgebouwd en verbeterd.
					</Text>
				</Box>

				<Box bg="gray.50" p={{base: "1.5rem", md: "2.5rem"}} borderRadius="2xl">
					<Heading size="xl" mb="2.5rem" display="flex" align="center" gap="0.75rem">
						Ontwikkelingsproces
					</Heading>
					<Stack gap={0}>
						<EvolutionStep
							step="1"
							badgeColor="gray"
							title="De Basis & Placeholders"
							description="Het project begon met een simpele structuur en placeholder content (zoals afbeeldingen en teksten). De focus lag hier op de basis functionaliteit en het koppelen van de JSON-server."
						/>
						<EvolutionStep
							step="2"
							badgeColor="blue"
							title="Complexere Logica & Context"
							description="Om de app schaalbaar te maken, heb ik de Context API geïntroduceerd. Hierdoor konden properties overal in de app gebruikt worden zonder ze constant door te geven (prop-drilling)."
						/>
						<EvolutionStep
							step="3"
							badgeColor="purple"
							title="Modulariteit & Custom Hooks"
							description="Door filters en sorteerfuncties te verplaatsen naar Custom Hooks en Utils, werd de code een stuk leesbaarder en makkelijker te onderhouden."
						/>
						<EvolutionStep
							step="4"
							badgeColor="green"
							title="AI Controle & Fine-tuning"
							description="Als laatste heb ik AI ingezet als een soort mentor. Ik heb gevraagd om feedback op performance en refactor tips, waardoor de app nu nog strakker in elkaar zit."
						/>
					</Stack>
				</Box>

				<Box p="2rem" borderRadius="2xl" border="1px solid" borderColor="blue.100" bg="blue.50/30">
					<Stack direction={{base: "column", md: "row"}} gap="2rem" align="center">
						<Box color="blue.500" display="flex" justify="center">
							<HiAcademicCap size="4rem" />
						</Box>
						<Stack gap="1rem">
							<Heading size="lg">AI als Mentor</Heading>
							<Text fontSize="md" lineHeight="relaxed">
								Tijdens de afronding heb ik AI gevraagd om de code te controleren alsof het een docent was. De nadruk
								lag hierbij op <strong>tips voor verbetering</strong>. Ik wilde niet alleen dat de code werkte, maar ook
								begrijpen <em>waarom</em> bepaalde aanpassingen beter waren voor de performance of leesbaarheid. Zo heb
								ik onder andere geleerd om logica uit de UI-componenten te halen en te werken met meer dynamische
								CSS-eenheden.
							</Text>
						</Stack>
					</Stack>
				</Box>

				<Box>
					<Heading size="xl" mb="2.5rem" display="flex" align="center" gap="0.75rem">
						Technische Pilaren
					</Heading>
					<SimpleGrid columns={{base: 1, md: 3}} gap="2rem">
						<TechCard
							title="Context API"
							color="blue.500"
							icon={HiDatabase}
							description="Het brein van de app. Beheert de globale staat van Events en Users, zodat data overal toegankelijk is."
						/>
						<TechCard
							title="Custom Hooks"
							color="purple.500"
							icon={HiCode}
							description="Het logica-centrum. Centraliseert zaken als filtering en sortering, waardoor componenten 'lean' blijven."
						/>
						<TechCard
							title="Chakra UI v3"
							color="teal.500"
							icon={HiColorSwatch}
							description="Het design-systeem. Zorgt voor een premium uitstraling en volledige responsiviteit op elk apparaat."
						/>
					</SimpleGrid>
				</Box>

				{/* Learning */}
				<SimpleGrid columns={{base: 1, lg: 2}} gap="3rem" bg="blue.50" p="2rem" borderRadius="2xl">
					<Stack gap="1.5rem">
						<Heading size="lg" display="flex" align="center" gap="0.5rem">
							Belangrijke Concepten
						</Heading>

						<Box>
							<Heading size="sm" mb="0.5rem" color="blue.700">
								Lifting State Up
							</Heading>
							<Text fontSize="0.875rem">
								Staat wordt beheerd in de Context of op pagina-niveau, terwijl de onderliggende componenten data
								ontvangen via props voor een duidelijke &apos;Source of Truth&apos;.
							</Text>
						</Box>

						<Box>
							<Heading size="sm" mb="0.5rem" color="blue.700">
								Controlled Components
							</Heading>
							<Text fontSize="0.875rem">
								Inputs in formulieren en zoekvelden zijn direct gesynchroniseerd met de React-state, wat realtime
								filtering mogelijk maakt.
							</Text>
						</Box>

						<Box>
							<Heading size="sm" mb="0.5rem" color="blue.700">
								DRY Principes
							</Heading>
							<Text fontSize="0.875rem">
								&apos;Don&apos;t Repeat Yourself&apos;. Door herbruikbare functies in de /utils en /hooks folders te
								plaatsen, is de code een stuk efficiënter geworden.
							</Text>
						</Box>
					</Stack>

					<Stack gap="1.5rem">
						<Heading size="lg" display="flex" align="center" gap="0.5rem">
							Verantwoordelijkheden
						</Heading>
						<Stack gap="0.75rem">
							<Flex align="center" gap="0.75rem">
								<Badge colorPalette="blue" w="6.5rem" textAlign="center">
									Pages
								</Badge>
								<Text fontSize="0.875rem">De regisseurs: Bepalen de layout en sturen data door.</Text>
							</Flex>
							<Flex align="center" gap="0.75rem">
								<Badge colorPalette="purple" w="6.5rem" textAlign="center">
									Hooks
								</Badge>
								<Text fontSize="0.875rem">De motoren: Voeren het zware rekenwerk en de filtering uit.</Text>
							</Flex>
							<Flex align="center" gap="0.75rem">
								<Badge colorPalette="green" w="6.5rem" textAlign="center">
									Components
								</Badge>
								<Text fontSize="0.875rem">De werkers: Zorgen voor de visuele weergave.</Text>
							</Flex>
							<Flex align="center" gap="0.75rem">
								<Badge colorPalette="orange" w="6.5rem" textAlign="center">
									Context
								</Badge>
								<Text fontSize="0.875rem">Het archief: Voor centrale opslag en sessies.</Text>
							</Flex>
						</Stack>
						<Box mt="1rem" p="1rem" bg="white" borderRadius="lg" borderLeft="0.25rem solid" borderColor="blue.400">
							<Text fontSize="0.75rem" fontStyle="italic">
								&quot;Leer wat je leren kan.&quot; - Opa
							</Text>
						</Box>
					</Stack>
				</SimpleGrid>

				<Box textAlign="center" pt="2rem">
					<Button
						colorPalette="blue"
						variant="outline"
						size="lg"
						onClick={() => setIsArchOpen(true)}
						borderRadius="full"
						px={8}>
						Bekijk de Architectuur
					</Button>
				</Box>

				{/* Future implementations */}
				<Box>
					<Heading size="xl" mb="2.5rem" display="flex" align="center" gap="0.75rem">
						Toekomstige Verbeteringen
					</Heading>
					<SimpleGrid columns={{base: 1, md: 2, lg: 4}} gap="1.5rem">
						<Box p="1.5rem" bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
							<Heading size="sm" mb="0.75rem">
								Dark Mode
							</Heading>
							<Text fontSize="0.875rem" color="gray.600">
								Een volledige Dark Mode integratie voor een betere kijkervaring.
							</Text>
						</Box>

						<Box p="1.5rem" bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
							<Heading size="sm" mb="0.75rem">
								Gebruikersbeheer
							</Heading>
							<Text fontSize="0.875rem" color="gray.600">
								Admin interface om gebruikers aan te maken, te bewerken of te verwijderen uit het systeem.
							</Text>
						</Box>

						<Box p="1.5rem" bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
							<Heading size="sm" mb="0.75rem">
								Categoriebeheer
							</Heading>
							<Text fontSize="0.875rem" color="gray.600">
								Mogelijkheid voor admins om nieuwe categorieën toe te voegen of bestaande te wijzigen.
							</Text>
						</Box>

						<Box p="1.5rem" bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
							<Heading size="sm" mb="0.75rem">
								Rechtenbeheer
							</Heading>
							<Text fontSize="0.875rem" color="gray.600">
								Gebruikers kunnen alleen eigen events verwijderen, terwijl admins alles beheren.
							</Text>
						</Box>
						<Box p="1.5rem" bg="gray.50" borderRadius="xl" border="1px solid" borderColor="gray.100">
							<Heading size="sm" mb="0.75rem">
								TanStack Query
							</Heading>
							<Text fontSize="0.875rem" color="gray.600">
								Integratie van TanStack Query voor state management en data fetching.
							</Text>
						</Box>
					</SimpleGrid>
				</Box>

				<Box textAlign="center" pt="2rem">
					<Heading size="sm" mb="1rem" color="gray.500" textTransform="uppercase" letterSpacing="widest">
						Gebouwd met Moderne Standaarden
					</Heading>
					<Stack direction="row" justify="center" gap="1rem" wrap="wrap">
						<Badge variant="surface">React</Badge>
						<Badge variant="surface">React Router</Badge>
						<Badge variant="surface">Chakra UI</Badge>
						<Badge variant="surface">Context API</Badge>
					</Stack>
				</Box>
			</Stack>

			<ArchitectureModal isOpen={isArchOpen} onClose={() => setIsArchOpen(false)} />
		</Container>
	);
};
