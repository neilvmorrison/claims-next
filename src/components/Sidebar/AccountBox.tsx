import { Flex, Box, UnstyledButton, Avatar, Text, Group } from "@mantine/core";
import { useRouter } from "next/router";
import { IconLogin2 } from "@tabler/icons-react";
import classes from "./AccountBox.module.css";

interface IAccountBox {
  isAuthenticated: boolean;
  name: string;
  email: string;
}

function AuthContent({ name, email }: Partial<IAccountBox>) {
  return (
    <Flex direction="column">
      <Text>{name}</Text>
      <Text>{email}</Text>
    </Flex>
  );
}

function UnauthContent() {
  return <Box>Login</Box>;
}

function AccountBox({ isAuthenticated, name, email }: IAccountBox) {
  const router = useRouter();

  const handleClick = () => {
    router.push(isAuthenticated ? "/profile" : "/login");
  };
  return (
    <UnstyledButton pt="md" onClick={handleClick} className={classes.root}>
      <Flex gap={12} align="center" justify="space-between">
        <Group>
          <Avatar />
          {isAuthenticated ? (
            <AuthContent name={name} email={email} />
          ) : (
            <UnauthContent />
          )}
        </Group>
        <IconLogin2 />
      </Flex>
    </UnstyledButton>
  );
}

export default AccountBox;
