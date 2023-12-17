import { getUserProfileByUserId } from "@/lib/user";
import { Avatar, Box, Button, Center, Group, Paper, Text } from "@mantine/core";
import { Profile, User } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

function Profile({ user }: { user: Profile & User }) {
  return (
    <Box maw={1200} mx="auto" mt="xl">
      <Paper p="md" radius="md" withBorder shadow="md" maw={320}>
        <Center mb="xl">
          <Avatar size="xl" />
        </Center>
        <Text fz="lg" fw="bold">
          {user?.givenName} {user?.familyName}
        </Text>
        <Text c="gray.8">{user.email}</Text>
        <Button color="red" onClick={() => signOut()} fullWidth mt="xl">
          Logout
        </Button>
      </Paper>
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  const user = await getUserProfileByUserId(session?.user.id);
  return {
    props: {
      user: {
        ...user,
        email: session.user.email,
      },
    },
  };
}

export default Profile;
