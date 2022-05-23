import { Button, Card, Group, Image, Stack, Text, Title } from "@mantine/core";
import { FC } from "react";
import { Link } from "react-router-dom";
import useQueryCurrentUser from "../api/useQueryCurentUser";
import { Pokemon } from "../api/useQueryPokemons";

const PokemonCard: FC<{
  data: Pokemon;
  onDelete: (data: Pokemon) => void;
}> = ({ data, onDelete }) => {
  const { isError } = useQueryCurrentUser();

  return (
    <Card shadow="md" p="lg" radius="lg">
      <Stack align="center">
        <Image
          height={200}
          width="auto"
          sx={{ minWidth: 200 }}
          src={data.imageUrl}
          withPlaceholder
        />
      </Stack>

      <Title
        align="center"
        sx={{ textTransform: "uppercase" }}
        order={3}
        my="sm"
      >
        {data.name}
      </Title>
      <Group position="apart">
        <Text size="sm" weight={600}>
          Height
        </Text>
        <Text size="sm">{data.height}</Text>
      </Group>
      <Group position="apart">
        <Text size="sm" weight={600}>
          Weight
        </Text>
        <Text size="sm">{data.weight}</Text>
      </Group>

      <Card.Section mt="xl">
        <Group position="apart">
          <Button
            size="lg"
            sx={{ flex: 1 }}
            component={Link}
            to={`${data.id}`}
            variant="subtle"
          >
            See Detalils
          </Button>
          <Button
            sx={{ flex: 1 }}
            size="lg"
            variant="subtle"
            color="red"
            onClick={() => onDelete(data)}
            disabled={isError}
          >
            Delete
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default PokemonCard;
