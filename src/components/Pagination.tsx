import { Button, Group, Text } from "@mantine/core";
import { FC, useMemo } from "react";

interface Props {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<Props> = ({ page, total, limit, onPageChange }) => {
  const lastPage = useMemo(() => Math.ceil(total / limit), [total, limit]);

  const onNext = () => {
    onPageChange(page + 1);
  };

  const onPrev = () => {
    onPageChange(page - 1);
  };

  return (
    <Group>
      <Button variant="subtle" disabled={page === 0} onClick={onPrev} size="sm">
        Previous page
      </Button>
      <Text size="sm">
        {page + 1}/{lastPage}
      </Text>
      <Button
        variant="subtle"
        disabled={page + 1 === lastPage}
        onClick={onNext}
        size="sm"
      >
        Next page
      </Button>
    </Group>
  );
};

export default Pagination;
