import { Box, Text } from "@mantine/core";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

function Claims() {
  return (
    <Box maw={1200} mx="auto" mt="xl">
      <Text>My claims!</Text>
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default Claims;
