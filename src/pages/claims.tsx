import { Box, Table, Text } from "@mantine/core";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/config/prisma";

function Claims({ claims }: { claims: any[] }) {
  const userHasClaims = !!claims.length;
  console.log({ userHasClaims, claims });
  return (
    <Box maw={1200} mx="auto" mt="xl">
      <Text fz="xl" fw="bold">
        My claims
      </Text>
      <Table stickyHeader stickyHeaderOffset={60}>
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Class Action</Table.Td>
            <Table.Td>Claim Status</Table.Td>
            <Table.Td>Date Submitted</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody></Table.Tbody>
      </Table>
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
  const claims = await prisma.auxlyClaimSubmission.findMany();

  return {
    props: {
      claims: JSON.parse(JSON.stringify(claims)),
    },
  };
}

export default Claims;
