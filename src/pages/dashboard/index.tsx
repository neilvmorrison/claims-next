import { prisma } from "@/config/prisma";
import { UserRole } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Dashboard() {
  return <div>Administrator Dashboard</div>;
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
  if (session.user.role === UserRole.INTERNAL_ADMINISTRATOR) {
    return {
      props: {
        organizationId: "abcd",
      },
    };
  }
  return {
    redirect: {
      destination: "/404",
      permanent: false,
    },
  };
}
