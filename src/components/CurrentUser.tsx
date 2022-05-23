import { Button, Skeleton } from "@mantine/core";
import { FC } from "react";
import useMutationLogout from "../api/useMutationLogout";
import useQueryCurrentUser from "../api/useQueryCurentUser";
import { FiUser } from "react-icons/fi";
import { useDisclosure } from "@mantine/hooks";
import LoginModal from "./LoginModal";

const CurrentUser: FC = () => {
  const { isLoading, isSuccess } = useQueryCurrentUser();
  const [opened, handlers] = useDisclosure(false);

  const logout = useMutationLogout();
  const onClick = () => logout.mutate();

  return (
    <>
      <Skeleton visible={isLoading} width={110} height={36}>
        {isSuccess ? (
          <Button
            variant="outline"
            onClick={onClick}
            loading={logout.isLoading}
            rightIcon={<FiUser />}
          >
            Logout
          </Button>
        ) : (
          <Button
            variant="outline"
            rightIcon={<FiUser />}
            onClick={handlers.open}
          >
            Login
          </Button>
        )}
      </Skeleton>
      <LoginModal opened={opened} onClose={handlers.close} />
    </>
  );
};

export default CurrentUser;
