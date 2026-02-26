import {Box, Input, Stack, Button, SimpleGrid, Field, Flex} from "@chakra-ui/react";
import {HiSearch, HiSortAscending, HiFilter, HiX} from "react-icons/hi";

export const SearchAndFilter = ({
	searchTerm,
	setSearchTerm,
	selectedCategories,
	toggleCategory,
	categories,
	sortOrder,
	setSortOrder,
	clearFilters,
	hasActiveFilters,
}) => {
	return (
		<Box mb={8}>
			<Box p={{base: 4, md: 6}} borderWidth="1px" borderRadius="xl" bg="white" boxShadow="sm">
				<Stack gap={6}>
					<SimpleGrid columns={{base: 1, md: 2, lg: 3}} gap={6} alignItems="flex-end">
						<Field.Root>
							<Field.Label fontWeight="bold" mb={2}>
								<Flex align="center" gap={2}>
									<HiSearch /> Search Events
								</Flex>
							</Field.Label>
							<Input
								placeholder="By title, description or location..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								size="md"
								borderRadius="md"
								_focus={{borderColor: "blue.500", outline: "none"}}
							/>
						</Field.Root>

						<Field.Root>
							<Field.Label fontWeight="bold" mb={2}>
								<Flex align="center" gap={2}>
									<HiSortAscending /> Sort by Date
								</Flex>
							</Field.Label>
							<Box
								as="select"
								w="100%"
								height="40px"
								padding="0 12px"
								borderRadius="lg"
								border="1px solid"
								borderColor="gray.200"
								backgroundColor="white"
								fontSize="14px"
								cursor="pointer"
								value={sortOrder || ""}
								onChange={(e) => setSortOrder(e.target.value)}
								_focus={{
									borderColor: "blue.500",
									outline: "none",
								}}>
								<option value="">Default order</option>
								<option value="newest">Newest first</option>
								<option value="oldest">Oldest first</option>
							</Box>
						</Field.Root>

						<Box>
							<Button
								colorPalette={hasActiveFilters ? "red" : "gray"}
								variant={hasActiveFilters ? "subtle" : "ghost"}
								onClick={clearFilters}
								size="md"
								width="full"
								display="flex"
								gap={2}
								transition="all 0.2s"
								isDisabled={!hasActiveFilters}>
								<HiX /> Clear all filters
							</Button>
						</Box>
					</SimpleGrid>

					<Box pt={4} borderTop="1px solid" borderColor="gray.100">
						<Field.Root>
							<Field.Label fontWeight="bold" mb={3}>
								<Flex align="center" gap={2}>
									<HiFilter /> Filter by Categories
								</Flex>
							</Field.Label>
							<Stack direction="row" gap={3} wrap="wrap">
								{categories.map((category) => {
									const isSelected = selectedCategories.includes(category.id);
									return (
										<Button
											key={category.id}
											size="sm"
											variant={isSelected ? "solid" : "ghost"}
											colorPalette={isSelected ? "blue" : "gray"}
											borderRadius="full"
											onClick={() => toggleCategory(category.id, !isSelected)}
											px={5}
											transition="all 0.2s"
											textTransform="capitalize"
											transform={isSelected ? "scale(1.05)" : "scale(1)"}
											boxShadow={isSelected ? "md" : "none"}>
											{category.name}
										</Button>
									);
								})}
							</Stack>
						</Field.Root>
					</Box>
				</Stack>
			</Box>
		</Box>
	);
};
