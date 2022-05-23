import { FC } from "react";
import {
  Box,
  Group,
  Button,
  Stack,
  Text,
  Title,
  Image,
  Menu,
} from "@mantine/core";
import ThemeSwitch from "../components/ThemeSwitch";
import { Link, useParams } from "react-router-dom";
import { FiChevronLeft, FiMoreVertical, FiEdit } from "react-icons/fi";
import useQueryPokemon from "../api/useQueryPokemon";
import useQueryCurrentUser from "../api/useQueryCurentUser";
import { useDisclosure } from "@mantine/hooks";
import useMutationDeletePokemon from "../api/useMutationDeletePokemon";
import DeleteModal from "../components/DeleteModal";
import PokemonModal from "../components/PokemonModal";

const PokemonView: FC = () => {
  const { id } = useParams();
  const { data } = useQueryPokemon(Number(id));

  const { isSuccess } = useQueryCurrentUser();

  const [deleteModal, deleteModalHandlers] = useDisclosure(false);
  const mutationDelete = useMutationDeletePokemon(Number(id));
  const onDeleteConfirm = () => {
    mutationDelete.mutate(undefined, {
      onSuccess: deleteModalHandlers.close,
    });
  };

  const [createModal, createModalHandlers] = useDisclosure(false);
  const [editModal, editModalHandlers] = useDisclosure(false);

  return (
    <Box p="md">
      <Group position="apart" py="sm">
        <Button
          leftIcon={<FiChevronLeft size={20} />}
          variant="outline"
          component={Link}
          to="../"
        >
          Back
        </Button>
        <ThemeSwitch />
      </Group>
      <Stack align="center" sx={{ position: "relative" }}>
        <Image
          height={300}
          width="auto"
          sx={{ minWidth: 300 }}
          src={data?.imageUrl}
          withPlaceholder
        />
        {isSuccess && (
          <Group sx={{ position: "absolute", top: 0, right: 0 }}>
            <Button
              variant="subtle"
              size="xs"
              leftIcon={<FiEdit size={20} />}
              onClick={editModalHandlers.open}
            >
              Edit
            </Button>
            <Menu
              control={
                <Button
                  variant="subtle"
                  size="xs"
                  leftIcon={<FiMoreVertical size={20} />}
                >
                  More
                </Button>
              }
            >
              <Menu.Item color="red" onClick={deleteModalHandlers.open}>
                Delete pokemon
              </Menu.Item>
              <Menu.Item onClick={createModalHandlers.open}>
                Create pokemon
              </Menu.Item>
            </Menu>
          </Group>
        )}
        <Title
          align="center"
          sx={{ textTransform: "uppercase" }}
          order={3}
          my="sm"
        >
          {data?.name}
        </Title>
        <Group position="apart">
          <Text size="sm" weight={600}>
            Height:{data?.height}
          </Text>
          <Text size="sm" weight={600}>
            Weight:{data?.weight}
          </Text>
        </Group>
      </Stack>
      <DeleteModal
        opened={deleteModal}
        onClose={deleteModalHandlers.close}
        onConfirm={onDeleteConfirm}
        loading={mutationDelete.isLoading}
      />
      <PokemonModal opened={createModal} onClose={createModalHandlers.close} />
      {data && (
        <PokemonModal
          opened={editModal}
          onClose={editModalHandlers.close}
          initialValues={data}
        />
      )}
    </Box>
  );
};

export default PokemonView;
