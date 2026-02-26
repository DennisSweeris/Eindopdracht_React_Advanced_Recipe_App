import {useState, useEffect} from "react";
import {Dialog, Stack, Field, Input, Textarea, Button, Portal} from "@chakra-ui/react";
import {toaster} from "./ui/toaster";
import {useUser} from "../context/UserContext";

import {formatDateForInput} from "../utils/dateUtils";

export const EventFormModal = ({isOpen, onClose, categories, onSubmit, event = null}) => {
	const {currentUser} = useUser();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		location: "",
		startTime: "",
		endTime: "",
		categoryIds: [],
		image: "",
	});

	// Update form data when event prop changes (for edit mode)
	useEffect(() => {
		if (event) {
			setFormData({
				title: event.title || "",
				description: event.description || "",
				location: event.location || "",
				startTime: event.startTime ? formatDateForInput(event.startTime) : "",
				endTime: event.endTime ? formatDateForInput(event.endTime) : "",
				categoryIds: event.categoryIds || [],
				image: event.image || "",
			});
		} else {
			setFormData({
				title: "",
				description: "",
				location: "",
				startTime: "",
				endTime: "",
				categoryIds: [],
				image: "",
			});
		}
	}, [event]);

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// RED TEAM: Validation checks
		if (new Date(formData.endTime) <= new Date(formData.startTime)) {
			toaster.error({
				title: "Invalid Dates",
				description: "End time must be after start time.",
			});
			return;
		}

		if (formData.title.length > 100) {
			toaster.error({
				title: "Title too long",
				description: "Please keep the title under 100 characters.",
			});
			return;
		}

		setIsSubmitting(true);

		try {
			const finalFormData = {
				...formData,
				categoryIds: formData?.categoryIds.length > 0 ? formData.categoryIds : [4],
				createdBy: currentUser?.id || 1,
			};

			const result = await onSubmit(finalFormData);
			if (result.success) {
				// Only reset form if it's a new event (not editing)
				if (!event) {
					setFormData({
						title: "",
						description: "",
						location: "",
						startTime: "",
						endTime: "",
						categoryIds: [],
						image: "",
					});
				}
				setIsSubmitting(false);
				onClose();
			}
		} catch (error) {
			setIsSubmitting(false);
			toaster.error({
				title: "Error",
				description: error.message || "Failed to save event",
			});
		}
	};

	// Handle category selection
	const handleCategoryChange = (categoryId, isChecked) => {
		setFormData((prev) => {
			if (isChecked) {
				// Check if category already exists to prevent duplicates
				if (prev.categoryIds.includes(categoryId)) {
					return prev;
				}

				const newCategoryIds = [...prev.categoryIds, categoryId];
				return {
					...prev,
					categoryIds: newCategoryIds,
				};
			}

			// Check if category exists before removing
			if (!prev.categoryIds.includes(categoryId)) {
				return prev;
			}

			const newCategoryIds = prev.categoryIds.filter((id) => id !== categoryId);
			return {
				...prev,
				categoryIds: newCategoryIds,
			};
		});
	};

	return (
		<Portal>
			<Dialog.Root open={isOpen} onOpenChange={(open) => !open && setIsSubmitting(false)}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<form onSubmit={handleSubmit}>
							<Dialog.Header>
								<Dialog.Title>{event ? "Edit Event" : "Create Event"}</Dialog.Title>
							</Dialog.Header>
							<Dialog.Body>
								<Stack spacing={4}>
									<Field.Root>
										<Field.Label htmlFor="title">Title</Field.Label>
										<Input
											id="title"
											value={formData.title}
											onChange={(e) => setFormData((prev) => ({...prev, title: e.target.value}))}
											required
											_focus={{borderColor: "blue.500", boxShadow: "none", outline: "none"}}
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label htmlFor="description">Description</Field.Label>
										<Textarea
											id="description"
											value={formData.description}
											onChange={(e) => setFormData((prev) => ({...prev, description: e.target.value}))}
											rows={4}
											required
											_focus={{borderColor: "blue.500", boxShadow: "none", outline: "none"}}
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label htmlFor="image">Image URL</Field.Label>
										<Input
											id="image"
											value={formData.image || ""}
											onChange={(e) => setFormData((prev) => ({...prev, image: e.target.value}))}
											placeholder="Enter image URL"
											required
											_focus={{borderColor: "blue.500", boxShadow: "none", outline: "none"}}
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label htmlFor="location">Location</Field.Label>
										<Input
											id="location"
											value={formData.location}
											onChange={(e) => setFormData((prev) => ({...prev, location: e.target.value}))}
											required
											_focus={{borderColor: "blue.500", boxShadow: "none", outline: "none"}}
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label htmlFor="startTime">Start Time</Field.Label>
										<Input
											id="startTime"
											type="datetime-local"
											value={formData.startTime}
											onChange={(e) => setFormData((prev) => ({...prev, startTime: e.target.value}))}
											required
											_focus={{borderColor: "blue.500", boxShadow: "none", outline: "none"}}
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label htmlFor="endTime">End Time</Field.Label>
										<Input
											id="endTime"
											type="datetime-local"
											value={formData.endTime}
											onChange={(e) => setFormData((prev) => ({...prev, endTime: e.target.value}))}
											required
											_focus={{borderColor: "blue.500", boxShadow: "none", outline: "none"}}
										/>
									</Field.Root>

									<Field.Root>
										<Field.Label mb={3}>Categories</Field.Label>
										<Stack direction="row" gap={3} wrap="wrap">
											{categories.map((category) => {
												const isSelected = formData.categoryIds.includes(category.id);
												return (
													<Button
														key={category.id}
														size="sm"
														variant={isSelected ? "solid" : "ghost"}
														colorPalette={isSelected ? "blue" : "gray"}
														borderRadius="full"
														onClick={() => handleCategoryChange(category.id, !isSelected)}
														px={4}
														type="button"
														textTransform="capitalize"
														borderWidth={isSelected ? "0" : "1px"}>
														{category.name}
													</Button>
												);
											})}
										</Stack>
									</Field.Root>
								</Stack>
							</Dialog.Body>
							<Dialog.Footer>
								<Button variant="ghost" mr={3} onClick={onClose}>
									Cancel
								</Button>
								<Button colorPalette="blue" type="submit" isLoading={isSubmitting}>
									{event ? "Update Event" : "Create Event"}
								</Button>
							</Dialog.Footer>
						</form>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</Portal>
	);
};
