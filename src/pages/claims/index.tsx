import { Box, Table, Text } from "@mantine/core";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { prisma } from "@/config/prisma";
import { getUserProfileByUserId } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/router";

function Claims({ claims }: { claims: any[] }) {
  const router = useRouter();
  const userHasClaims = !!claims.length;

  const rows = claims.map((claim) => {
    const handleClick = () => {
      const href = `/claims/${claim.id}`;
      router.push(href);
    };
    return (
      <Table.Tr key={claim.id} onClick={handleClick}>
        <Table.Td>Auxly Cannabis Group Inc.</Table.Td>
        <Table.Td>{claim.status}</Table.Td>
        <Table.Td>{claim.createdAt}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Box maw={1200} mx="auto" mt="xl">
      <Text fz="xl" fw="bold">
        My claims
      </Text>
      <Table
        stickyHeader
        stickyHeaderOffset={60}
        striped
        withTableBorder
        highlightOnHover
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Td>Class Action</Table.Td>
            <Table.Td>Claim Status</Table.Td>
            <Table.Td>Date Submitted</Table.Td>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody style={{ cursor: "pointer" }}>{rows}</Table.Tbody>
      </Table>
    </Box>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  const profile = await getUserProfileByUserId(session?.user.id);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const claims = await prisma.auxlyClaimSubmission.findMany({
    where: { profileId: profile?.id },
  });
  return {
    props: {
      claims: JSON.parse(JSON.stringify(claims)),
    },
  };
}

export default Claims;
