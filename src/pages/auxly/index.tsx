import { Box, Flex, Grid, Paper, Text } from "@mantine/core";
import classes from "./auxly.module.css";
import { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const documentLinks = [
  {
    title: "Notice of Settlement (EN)",
    href: "",
    buttonText: "Download",
  },
  {
    title: "Notice of Settlement (FR)",
    href: "",
    buttonText: "Télécharger",
  },
  {
    title: "Settlement Agreement",
    href: "",
    buttonText: "Download",
  },
  {
    title: "Plan of Allocation",
    href: "",
    buttonText: "Download",
  },
];

interface ITextProps {
  children: string | ReactNode;
}

function HeaderText({ children }: ITextProps) {
  return (
    <Text c="blue.5" fz="xl" fw="bolder" mb="lg">
      {children}
    </Text>
  );
}

function ParagraphText({ children }: ITextProps) {
  return <Text mb="lg">{children}</Text>;
}

function Auxly() {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";
  return (
    <div>
      <div className={classes.hero}></div>
      <Grid gutter={32} className={classes.content}>
        <Paper className={classes.informationBox} shadow="md" withBorder>
          <Text fz="xl" fw="bolder">
            Auxly Cannabis Group Inc.
          </Text>
          <Text c="dimmed">
            Auxly Cannabis Group Inc. (TSXV: XLY, FRA: 3KF, OTC: CBWTF)
          </Text>
          <Text c="dimmed">
            Ontario Superior Court of Justice, Court File No:
            CV-19-00617136-0000CP
          </Text>
          {!isAuthenticated && (
            <Link href="/login" className={classes.loginButton}>
              Login to submit a claim
            </Link>
          )}
          {isAuthenticated && (
            <Link href="/auxly/claim-form" className={classes.loginButton}>
              Submit a claim
            </Link>
          )}
        </Paper>
        <Grid.Col span={8}>
          <HeaderText>
            Read this notice carefully as it may affect your rights
          </HeaderText>
          <ParagraphText>
            TORONTO — November 15, 2023 –Berger Montague (Canada) today
            announces that the Ontario Superior Court of Justice (the “Court”)
            approved a settlement among all of the parties to the class
            proceeding styled as Daniel Relvas v. Auxly Cannabis Group Inc.,
            bearing Court File No. CV-19-00617136-00CP (the “Action”). The
            decision can be read{" "}
            <a
              href="https://bergermontague.ca/wp-content/uploads/2023/11/Relvas-v.-Auxly-Settlement-Endorsement-2023-ONSC-6394.pdf"
              target="_blank"
            >
              here.
            </a>
          </ParagraphText>
          <Text fw="bolder" fz="xl" mb="lg">
            On December 15, 2023, the Claim Form will be available for
            investors.
          </Text>
          <HeaderText>Background</HeaderText>
          <ParagraphText>
            The Action was commenced on behalf of persons and entities who
            purchased or otherwise acquired Auxly Cannabis Group Inc. common
            shares in the secondary market, on or after November 12, 2018, and
            held some or all of those securities until the close of trading on
            February 6, 2019. In the Action it is alleged that during the Class
            Period, the Defendant made misrepresentations concerning material
            facts regarding the status of its project with FSD Pharma Inc. to
            build-out 220,000 square feet of cannabis cultivation space in
            Cobourg, Ontario. The Defendant denies the allegations and makes no
            admission of liability in connection with the Settlement. At the
            conclusion of a full-day mediation in July 2023, the parties agreed
            to settle the Action to fully, definitively and permanently resolve
            all claims asserted against Auxly.
          </ParagraphText>
          <HeaderText>The Settlement</HeaderText>
          <ParagraphText>
            The terms of settlement (“Settlement”) include the payment of $4
            million CAD on behalf of the Defendant, a full and final release of
            all claims that were asserted or could have been asserted against
            the Defendant by class members in the Action, and the Defendant’s
            express denial of any liability in respect of the claims alleged in
            the Action and of any kind whatsoever.
          </ParagraphText>
          <HeaderText>How to Collect Your Money</HeaderText>
          <ParagraphText>
            On December 15, 2023, we will be publishing Notice and sending the
            Notice to registered investors of the instructions on how Class
            Members can file Claim Forms online to participate in the
            distribution of the net settlement funds and the deadline for doing
            so.
          </ParagraphText>
          <HeaderText>The Class</HeaderText>
          <ParagraphText>
            If you acquired common shares of Auxly, on or after November 12,
            2018, and held some or all of those shares until at least February
            6, 2019, you will likely be entitled to participate in the
            settlement after the Court has approved it.
          </ParagraphText>
          <HeaderText>Questions</HeaderText>
          <ParagraphText>
            Berger Montague (Canada) PC is a law firm that investigates,
            litigates and resolves economic and financial disputes. Questions
            for the Class Members’ lawyers may be directed to: Berger Montague
            (Canada) PC 330 Bay Street, Suite 1302 Toronto, ON M5H 2S8 Tel:
            647.598.8772 ext 2
          </ParagraphText>
        </Grid.Col>
        <Grid.Col span={4}>
          <Paper
            p="md"
            radius="md"
            withBorder
            shadow="md"
            style={{ position: "sticky", top: 70 }}
          >
            <Text fw="bolder">Documents</Text>
            {documentLinks.map((doc) => {
              return (
                <Flex
                  key={doc.title}
                  justify="space-between"
                  align="center"
                  py="md"
                >
                  <Text>{doc.title}</Text>
                  <a href={doc.href} className={classes.downloadButton}>
                    {doc.buttonText}
                  </a>
                </Flex>
              );
            })}
          </Paper>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Auxly;
