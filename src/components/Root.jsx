import {Outlet} from "react-router-dom";
import {Navigation} from "./Navigation";
import {Box} from "@chakra-ui/react";
import {Toaster} from "./ui/toaster";

export const Root = () => {
	return (
		<Box bg="gray.50" minH="100vh">
			<Navigation />
			<Box maxW="80rem" mx="auto">
				<Outlet />
			</Box>
			<Toaster />
		</Box>
	);
};
