import {Flex, Box, Heading, chakra} from "@chakra-ui/react";
import {NavLink as RouterNavLink} from "react-router-dom";
import {UserDropdown} from "./UserDropdown";
import {HiHome, HiCalendar, HiInformationCircle} from "react-icons/hi";

const NavLink = chakra(RouterNavLink);

export const Navigation = () => {
	const navItems = [
		{path: "/", label: "Events", icon: HiHome},
		{path: "/about", label: "About", icon: HiInformationCircle},
	];

	return (
		<Box bg="blue.500" p={4} color="white" position="sticky" top={0} zIndex="sticky" boxShadow="xl">
			<Flex maxW="80rem" mx="auto" justify="space-between" align="center" px={{base: 4, md: 8}}>
				<Heading size="md" display="flex" alignItems="center" gap={1}>
					<HiCalendar />
					<Box as="span" display={{base: "none", md: "inline"}}>
						Event Manager
					</Box>
				</Heading>

				<Flex gap={2} align="center" flexWrap="nowrap" justify="flex-end">
					{navItems.map((item) => (
						<NavLink
							key={item.path}
							to={item.path}
							end={item.path === "/"}
							display="flex"
							alignItems="center"
							gap={2}
							py={2}
							px={3}
							borderRadius="md"
							transition="all 0.2s"
							_hover={{fontWeight: "bold"}}
							css={{
								"&[aria-current='page']": {
									fontWeight: "bold",
								},
							}}>
							<item.icon />
							<Box as="span" display={{base: "none", sm: "inline"}}>
								{item.label}
							</Box>
						</NavLink>
					))}
					<UserDropdown />
				</Flex>
			</Flex>
		</Box>
	);
};
