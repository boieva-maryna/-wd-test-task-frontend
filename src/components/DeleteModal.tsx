import { Box, Button, Modal, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface Props {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const DeleteModal: FC<Props> = ({ onClose, onConfirm, opened, loading }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Delete pokemon?">
      <Stack align="center" spacing="md">
        <Box color="red" size={200} component={FiAlertTriangle} />
        <Text size="sm">
          Are you sure want to delete the Pokemon from your list? This action is
          irreversible
        </Text>
        <Button
          color="red"
          variant="outline"
          onClick={onConfirm}
          loading={loading}
        >
          Delete
        </Button>
      </Stack>
    </Modal>
  );
};

export default DeleteModal;
