import { ActionIcon, Box, Drawer, Group, MediaQuery } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FC } from "react";
import { FiFilter } from "react-icons/fi";
import CurrentUser from "./CurrentUser";
import Filters from "./Filters";

const HeaderContent: FC = () => {
  const [opened, handlers] = useDisclosure(false);

  return (
    <Group position="apart" align="center">
      <MediaQuery smallerThan="md" styles={{ display: "none" }}>
        <Box sx={{ flex: 1 }}>
          <Filters />
        </Box>
      </MediaQuery>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Box>
          <ActionIcon onClick={handlers.toggle}>
            <FiFilter />
          </ActionIcon>
          <Drawer
            padding="xs"
            title="Filters"
            opened={opened}
            onClose={handlers.close}
          >
            <Filters />
          </Drawer>
        </Box>
      </MediaQuery>
      <CurrentUser />
    </Group>
  );
};

export default HeaderContent;
