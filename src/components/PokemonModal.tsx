import { Button, Modal, Stack, TextInput, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { FC } from "react";
import { Pokemon } from "../api/useQueryPokemons";
import useMutationCreatePokemon, {
  CreatePokemonPayload,
} from "../api/useMutationCreatePokemon";
import useMutationEditPokemon from "../api/useMutationEditPokemon";
import ImageUpload from "./ImageUpload";

interface Props {
  opened: boolean;
  onClose: () => void;
  initialValues?: Pokemon;
}

const PokemonModal: FC<Props> = ({ onClose, opened, initialValues }) => {
  const { name = "", weight = 0, height = 0, imageUrl } = initialValues ?? {};
  const form = useForm({
    initialValues: {
      name,
      weight,
      height,
      image: imageUrl ?? "",
    },
  });

  const mutationCreate = useMutationCreatePokemon();
  const mutationEdit = useMutationEditPokemon(initialValues?.id);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = (data: CreatePokemonPayload) => {
    data.image = typeof data.image === "string" ? undefined : data.image;
    if (initialValues) {
      mutationEdit.mutate(data, {
        onSuccess: () => {
          handleClose();
        },
      });
    } else {
      mutationCreate.mutate(data, {
        onSuccess: () => {
          handleClose();
        },
      });
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={initialValues ? "Edit Pokemon" : "Create A Pokemon"}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack spacing="md" p="md">
          <ImageUpload label="Pokemon Image" {...form.getInputProps("image")} />
          <TextInput
            required
            label="Pokemon Name"
            placeholder="Ex. Billisaurus"
            {...form.getInputProps("name")}
          />

          <NumberInput
            required
            label="Pokemon Height"
            placeholder="Ex. 45"
            {...form.getInputProps("height")}
          />

          <NumberInput
            required
            label="Pokemon Weight"
            placeholder="Ex. 125"
            {...form.getInputProps("weight")}
          />

          <Button
            variant="outline"
            type="submit"
            mt="lg"
            loading={mutationCreate.isLoading || mutationEdit.isLoading}
          >
            Save
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};

export default PokemonModal;
