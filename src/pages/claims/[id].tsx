import { getClaimById } from "@/lib/claims";
import { getUserProfileByUserId } from "@/lib/user";
import { AuxlyClaimSubmission, UserRole } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

function ClaimDetail({ claim }: { claim: AuxlyClaimSubmission }) {
  return <div>This is claim {claim.id}</div>;
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
  const claim = await getClaimById(context.params.id);
  if (session?.user.role === UserRole.INTERNAL_ADMINISTRATOR) {
    return {
      props: {
        claim: JSON.parse(JSON.stringify(claim)),
      },
    };
  }
  if (claim?.profileId !== profile?.id) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
  return {
    props: {
      claim: JSON.parse(JSON.stringify(claim)),
    },
  };
}

export default ClaimDetail;
