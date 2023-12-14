import { useForm } from "@mantine/form";
import { email_regex } from "../../utils/regex";
import { Button, Group, Paper, TextInput, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { NextPageContext } from "next";

function RegistrationPage() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      givenName: "",
      familyName: "",
    },
    validate: {
      email: (value) => (email_regex.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 5 ? null : "Invalid password"),
      givenName: (value) => (!value ? "This field is required" : null),
      familyName: (value) => (!value ? "This field is required" : null),
    },
  });

  async function registerUser(values: any): Promise<any> {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        familyName: values.familyName,
        givenName: values.givenName,
      }),
    });
    const results = await res.json();
    if (!results.user) {
      return notifications.show({
        id: "registration-fail",
        title: "Registration failed",
        color: "red",
        message:
          "There was an error registering your account, please try again later",
      });
    }
    notifications.show({
      id: "registration-success",
      title: "Registration successful!",
      color: "green",
      message: "Your account was successfully created",
    });
    await signIn("credentials", {
      email: values.email,
      password: values.password,
    });
  }

  return (
    <Paper maw={340} mx="auto" p="md" radius="md" withBorder>
      <form onSubmit={form.onSubmit((values) => registerUser(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Password"
          placeholder="Password"
          type="password"
          {...form.getInputProps("password")}
        />
        <TextInput
          withAsterisk
          label="Given Name"
          placeholder="Frances"
          {...form.getInputProps("givenName")}
        />
        <TextInput
          withAsterisk
          label="Family Name"
          placeholder="McFarland"
          {...form.getInputProps("familyName")}
        />
        <Text>
          Already have an account? <Link href="/login">Login Here</Link>
        </Text>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Paper>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default RegistrationPage;
