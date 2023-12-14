import { Paper, Text } from "@mantine/core";
import classes from "./auxly.module.css";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useForm } from "@mantine/form";

function AuxlyClaimForm() {
  const form = useForm({});
  return (
    <div>
      <div className={classes.hero}></div>
      <div className={classes.content}>
        <Paper className={classes.informationBox} shadow="md" withBorder>
          <Text fz="xl" fw="bolder">
            Auxly Cannabis Group Inc.
          </Text>
          <Text c="gray.7">
            Auxly Cannabis Group Inc. (TSXV: XLY, FRA: 3KF, OTC: CBWTF)
          </Text>
          <Text c="gray.7">
            Ontario Superior Court of Justice, Court File No:
            CV-19-00617136-0000CP
          </Text>
        </Paper>
        <Text size="xl">Submit a claim</Text>
        <form
          onSubmit={form.onSubmit((val) => alert(JSON.stringify(val)))}
        ></form>
      </div>
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
  return {
    props: {},
  };
}

export default AuxlyClaimForm;
