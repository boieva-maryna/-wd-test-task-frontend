import {
  Box,
  Grid,
  Group,
  Space,
  Button,
  Skeleton,
  Alert,
} from "@mantine/core";
import { FiPlusCircle, FiSearch } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import { FC, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useMutationDeletePokemon from "../api/useMutationDeletePokemon";
import useQueryPokemons, {
  FilterParams,
  Pokemon,
} from "../api/useQueryPokemons";
import useQueryCurrentUser from "../api/useQueryCurentUser";
import DeleteModal from "../components/DeleteModal";
import Pagination from "../components/Pagination";
import PokemonCard from "../components/PokemonCard";
import ThemeSwitch from "../components/ThemeSwitch";
import PokemonModal from "../components/PokemonModal";

const PokemonsList: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const filters = useMemo(() => {
    const { limit, rangeFrom, rangeTo, page, ...filters } = params;
    return {
      ...filters,
      limit: Number.isNaN(Number(limit)) ? 10 : Number(limit),
      page: Number.isNaN(Number(page)) ? 0 : Number(page),
      rangeFrom: Number.isNaN(Number(rangeFrom))
        ? undefined
        : Number(rangeFrom),
      rangeTo: Number.isNaN(Number(rangeTo)) ? undefined : Number(rangeTo),
    } as FilterParams;
  }, [params]);

  const onPageChange = (page: number) => {
    setSearchParams({ ...params, page: String(page) });
  };

  const { data, isLoading } = useQueryPokemons(filters);
  const [selectedItem, setSelectedItem] = useState<Pokemon>();

  const { isError } = useQueryCurrentUser();

  const mutationDelete = useMutationDeletePokemon(selectedItem?.id);
  const [opened, handlers] = useDisclosure(false);
  const onDelete = (item: Pokemon) => {
    setSelectedItem(item);
    handlers.open();
  };
  const onDeleteConfirm = () => {
    mutationDelete.mutate(undefined, {
      onSuccess: handlers.close,
    });
  };

  const [openedCreate, handlersCreate] = useDisclosure(false);

  return (
    <Box p="md">
      <Group position="apart" py="sm">
        {isError ? (
          <Space w={100} />
        ) : (
          <Button
            variant="subtle"
            onClick={handlersCreate.open}
            leftIcon={<FiPlusCircle size={20} />}
          >
            Create Pokemon
          </Button>
        )}
        <Pagination
          limit={filters.limit ?? 10}
          total={data?.total ?? 10}
          page={filters.page ?? 0}
          onPageChange={onPageChange}
        />
        <ThemeSwitch />
      </Group>
      {isLoading ? (
        <Grid gutter="lg" my="sm">
          {[1, 2, 3, 4].map((i) => (
            <Grid.Col key={i} lg={3} md={4} sm={6}>
              <Skeleton height={400} />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Grid gutter="lg" my="sm">
          {data?.data.map((item) => (
            <Grid.Col key={item.id} lg={3} md={4} sm={6}>
              <PokemonCard data={item} onDelete={onDelete} />
            </Grid.Col>
          ))}
          {!data?.data?.length && (
            <Grid.Col xs={12}>
              <Alert
                icon={<FiSearch size={20} />}
                title="No data found"
                color="blue"
              >
                No data were found for your request
              </Alert>
            </Grid.Col>
          )}
        </Grid>
      )}

      <Group position="center" p="xs">
        <Pagination
          limit={filters.limit ?? 10}
          total={data?.total ?? 10}
          page={filters.page ?? 0}
          onPageChange={onPageChange}
        />
      </Group>
      <DeleteModal
        opened={opened}
        onClose={handlers.close}
        onConfirm={onDeleteConfirm}
        loading={mutationDelete.isLoading}
      />
      <PokemonModal opened={openedCreate} onClose={handlersCreate.close} />
    </Box>
  );
};

export default PokemonsList;
