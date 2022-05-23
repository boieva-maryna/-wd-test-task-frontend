import { Grid, NumberInput, Select, TextInput } from "@mantine/core";
import { useDebouncedValue, useInputState } from "@mantine/hooks";
import { FC, useEffect, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams, useParams } from "react-router-dom";

const perPageOptions = ["10", "20", "50"];
const sortOptions = [
  { value: "name;asc", label: "From A-Z" },
  { value: "name;desc", label: "From Z-A" },
  { value: "weight;asc", label: "Weight, low to hight" },
  { value: "weight;desc", label: "Weight, hight to low" },
  { value: "height;asc", label: "Height, low to hight" },
  { value: "height;desc", label: "Height, hight to low" },
];

const rangeOptions = [
  { value: "weight", label: "Weight" },
  { value: "height", label: "Height" },
];

const Filters: FC = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams(
    !id
      ? {
          limit: "10",
          orderBy: "name",
          order: "asc",
        }
      : {}
  );

  const filters = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  const [search, setSearch] = useInputState(filters.name ?? "");
  const [debouncedSearch] = useDebouncedValue(search, 300);

  const handleSortChange = (value: string) => {
    const [orderBy, order] = value.split(";");
    setSearchParams({
      ...filters,
      order,
      orderBy,
    });
  };

  const handleFilterChange = (name: string) => (value: string) => {
    setSearchParams({
      ...filters,
      [name]: value,
    });
  };

  const handleRangeChange = (name: string) => (value: number) => {
    setSearchParams({
      ...filters,
      [name]: String(value),
    });
  };

  useEffect(() => {
    if (!id) {
      setSearchParams({ ...filters, name: debouncedSearch });
    }
  }, [id, filters, debouncedSearch, setSearchParams]);

  return (
    <Grid justify="center">
      <Grid.Col md={1.5}>
        <Select
          value={filters.limit?.toString() ?? "10"}
          onChange={handleFilterChange("limit")}
          data={perPageOptions.map((value) => ({
            value,
            label: `Show ${value} result`,
          }))}
        />
      </Grid.Col>
      <Grid.Col md={3}>
        <TextInput
          type="search"
          placeholder="Search Items"
          onChange={setSearch}
          value={search}
          icon={<FiSearch />}
        />
      </Grid.Col>
      <Grid.Col md={2}>
        <Select
          value={
            filters.orderBy
              ? filters.orderBy + ";" + filters.order
              : sortOptions[0].value
          }
          onChange={handleSortChange}
          data={sortOptions}
        />
      </Grid.Col>
      <Grid.Col md={1.5}>
        <Select
          placeholder="Range By"
          value={filters.rangeBy}
          onChange={handleFilterChange("rangeBy")}
          data={rangeOptions}
        />
      </Grid.Col>

      <Grid.Col lg={1} md={1.5}>
        <NumberInput
          placeholder="Range From"
          onChange={handleRangeChange("rangeFrom")}
          value={
            Number.isNaN(Number(filters.rangeFrom))
              ? 0
              : Number(filters.rangeFrom)
          }
        />
      </Grid.Col>
      <Grid.Col lg={1} md={1.5}>
        <NumberInput
          placeholder="Range To"
          onChange={handleRangeChange("rangeTo")}
          value={
            Number.isNaN(Number(filters.rangeTo)) ? 0 : Number(filters.rangeTo)
          }
        />
      </Grid.Col>
    </Grid>
  );
};

export default Filters;
