import { Group, useMantineColorScheme, Text, Switch } from "@mantine/core";
import { FC } from "react";

const ThemeSwitch: FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const onChange = () => toggleColorScheme();

  return (
    <Group position="right" spacing="xs">
      <Text size="sm">Light Mode</Text>
      <Switch size="sm" checked={colorScheme === "dark"} onChange={onChange} />
      <Text size="sm">Dark Mode</Text>
    </Group>
  );
};

export default ThemeSwitch;
