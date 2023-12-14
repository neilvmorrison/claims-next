import { getUserProfileByUserId } from "@/lib/user";
import { Button } from "@mantine/core";
import { Profile } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

function Profile({ user }: { user: Profile }) {
  return (
    <div>
      Welcome, {user.givenName}
      <Button color="red" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
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
      user,
    },
  };
}

export default Profile;
