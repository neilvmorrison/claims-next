import "@/styles/globals.css";
import type { AppProps } from "next/app";
import {
  AppShell,
  MantineProvider,
  Burger,
  createTheme,
  Flex,
  Text,
  Drawer,
  Button,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/dates/styles.css";
import { SessionProvider, useSession } from "next-auth/react";
import { APP_NAME } from "../../constants";
import { Notifications } from "@mantine/notifications";
import AccountBox from "@/components/Sidebar/AccountBox";
import Logo from "@/components/Logo";
import Link from "next/link";

const theme = createTheme({});

function Layout({ children }: any) {
  const session = useSession();
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell header={{ height: 60 }} padding="md" bg="gray.1">
      <AppShell.Header>
        <Flex align="center" h={60} px={24} gap={8}>
          <Burger opened={opened} onClick={toggle} size="sm" />
          <Logo />
        </Flex>
      </AppShell.Header>
      <Drawer opened={opened} onClose={toggle} title={APP_NAME}>
        <AppShell.Navbar p="md" style={{ width: "100%" }}>
          <AppShell.Section grow component={ScrollArea}>
            <AppShell.Section mb="xl">
              <Text fw="bold" c="gray.7">
                Active Class Actions
              </Text>
              <Link href="/auxly">Auxly Cannabis Group Inc.</Link>
            </AppShell.Section>
            <AppShell.Section>
              <Text fw="bold" c="gray.7">
                Application
              </Text>
              <Link href="/claims">My Claims</Link>
            </AppShell.Section>
          </AppShell.Section>
          <AppShell.Section>
            <AccountBox
              isAuthenticated={session.status === "authenticated"}
              name={session.data?.user.name}
              email={session.data?.user.email}
            />
          </AppShell.Section>
        </AppShell.Navbar>
      </Drawer>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Notifications />
        <ModalsProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ModalsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
