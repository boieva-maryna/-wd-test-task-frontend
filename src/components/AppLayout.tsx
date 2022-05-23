import { AppShell, Box, Header } from "@mantine/core";
import { FC } from "react";
import { Outlet } from "react-router";
import HeaderContent from "./HeaderContent";

const AppLayout: FC = () => {
  return (
    <AppShell
      padding="md"
      header={
        <Header fixed height={70} p="sm">
          <HeaderContent />
        </Header>
      }
    >
      <Box component="main" sx={{ marginTop: 70 }}>
        <Outlet />
      </Box>
    </AppShell>
  );
};

export default AppLayout;
