import {
  Box,
  Button,
  Modal,
  PasswordInput,
  SegmentedControl,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { FC, useState } from "react";
import { FiUser } from "react-icons/fi";
import useMutationLogin, { LoginPayload } from "../api/useMutationLogin";
import useMutationRegister from "../api/useMutationRegister";

interface Props {
  opened: boolean;
  onClose: () => void;
}

const LoginModal: FC<Props> = ({ onClose, opened }) => {
  const [value, setValue] = useState<string>("login");

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });

  const login = useMutationLogin();
  const register = useMutationRegister();

  const onSubmit = (data: LoginPayload) => {
    if (value === "login") {
      login.mutate(data, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    } else {
      register.mutate(data, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <Stack align="center" spacing="md" p="md">
        <Box color="blue" size={200} component={FiUser} />
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { label: "Login", value: "login" },
            { label: "Register", value: "register" },
          ]}
        />
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack>
            <TextInput
              required
              placeholder="example@mail.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              required
              placeholder="Password"
              {...form.getInputProps("password")}
            />
            <Button
              variant="outline"
              type="submit"
              sx={{ textTransform: "capitalize" }}
              mt="lg"
              loading={login.isLoading || register.isLoading}
            >
              {value}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};

export default LoginModal;
