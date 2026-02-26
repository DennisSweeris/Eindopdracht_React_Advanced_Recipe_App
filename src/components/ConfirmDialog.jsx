// Confirmation dialog for delete operations using Chakra Modal
// Provides yes/no confirmation with customizable message

import {Dialog, Button} from "@chakra-ui/react";
import {Text} from "@chakra-ui/react";
import {toaster} from "./ui/toaster";

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("ConfirmDialog: Error during confirm:", error);
      toaster.error({
        title: "Error",
        description: error.message || "Failed to delete",
      });
    }
  };

  return (
    <Dialog.Root
      open={!!isOpen}
      onOpenChange={open => !open && onClose()}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body>
            <Text>{message}</Text>
          </Dialog.Body>

          <Dialog.Footer>
            <Button onClick={onClose}>No</Button>
            <Button
              colorPalette="red"
              onClick={handleConfirm}
              ml={3}>
              Yes
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};
