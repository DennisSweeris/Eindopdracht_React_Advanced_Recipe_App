import {useMemo, useCallback} from "react";
import {Menu, Portal, Avatar, Flex, Text, IconButton} from "@chakra-ui/react";
import {useUser} from "../context/UserContext";
import {HiUser, HiChevronDown, HiLogout} from "react-icons/hi";

const UserMenuItem = ({user, isCurrent, onSelect, ...rest}) => (
	<Menu.Item
		key={user.id}
		value={user.id}
		disabled={isCurrent}
		onSelect={onSelect}
		_highlighted={{bg: "blue.50", borderColor: "blue.500", color: "blue.700"}}
		_hover={{bg: "blue.50", cursor: "pointer"}}
		_focus={{bg: "blue.50", outline: "none", boxShadow: "none"}}
		transition="all 0.1s"
		{...rest}>
		<Flex align="center" gap={3} w="full">
			<Avatar.Root size="xs">
				<Avatar.Fallback name={user.name} />
				<Avatar.Image src={user.image} />
			</Avatar.Root>
			<Flex direction="column">
				<Text fontSize="sm" color="black">
					{user.name}
				</Text>
				<Text fontSize="xs" color="gray.600">
					{user.role === "admin" ? "Admin" : "User"}
				</Text>
			</Flex>
			{isCurrent && (
				<Text fontSize="xs" color="green.600" ml="auto">
					Current
				</Text>
			)}
		</Flex>
	</Menu.Item>
);

export const UserDropdown = () => {
	const {currentUser, users, setCurrentUser, logoutUser, getUserById} = useUser();

	const handleLogout = useCallback(() => {
		logoutUser();
	}, [logoutUser]);

	const userInfo = useMemo(() => {
		if (!currentUser) return null;
		return getUserById(currentUser.id) || currentUser;
	}, [currentUser, getUserById]);

	const userSelectHandlers = useMemo(() => {
		const handlers = {};
		users.forEach((u) => {
			handlers[u.id] = () => setCurrentUser(u);
		});
		return handlers;
	}, [users]);

	return (
		<Menu.Root positioning={{placement: "bottom-end"}}>
			<Menu.Trigger asChild>
				<IconButton variant="ghost" color="white" value="user" bg="transparent" aria-label="User menu" size="sm">
					<Flex align="center" gap={2}>
						{userInfo ? (
							<Avatar.Root size="sm">
								<Avatar.Fallback name={userInfo.name} />
								<Avatar.Image src={userInfo.image} />
							</Avatar.Root>
						) : (
							<HiUser />
						)}
						<HiChevronDown />
					</Flex>
				</IconButton>
			</Menu.Trigger>

			<Portal>
				<Menu.Positioner>
					<Menu.Content minW="200px">
						{users.map((user) => (
							<UserMenuItem
								key={user.id}
								user={user}
								isCurrent={userInfo?.id === user.id}
								onSelect={userSelectHandlers[user.id]}
							/>
						))}

						{userInfo && (
							<Menu.Item
								value="logout"
								onSelect={handleLogout}
								color="red.500"
								_highlighted={{bg: "red.50", borderColor: "red.500"}}
								_hover={{bg: "red.50", cursor: "pointer"}}>
								<Flex align="center" gap={2}>
									<HiLogout />
									<Text>Logout</Text>
								</Flex>
							</Menu.Item>
						)}
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
