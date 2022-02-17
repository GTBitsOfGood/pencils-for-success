import React from 'react';
import {
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Button,
  Text,
  Flex,
  Spacer,
  Divider,
  Modal,
} from '@chakra-ui/react';

interface EditConfirmationProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirmation: () => void;
}

const EditConfirmationModal = ({
  isOpen,
  onClose,
  onConfirmation,
  message,
}: EditConfirmationProps) => {
  const onCancel = () => onClose();
  const onConfirm = () => {
    onConfirmation();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalBody pb="5" mt="5" textAlign="center">
          <Text fontSize="4xl" my="5">
            Are you sure?
          </Text>
          <Text color="gray.500">{message}</Text>
          <Text color="gray.500">This action cannot be undone</Text>
          <Divider my="5" />
          <Flex>
            <Button colorScheme="blue" onClick={onConfirm}>
              Update
            </Button>
            <Spacer />
            <Button onClick={onCancel}>Cancel</Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditConfirmationModal;
