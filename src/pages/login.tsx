import { useForm } from "@mantine/form";
import { email_regex } from "../../utils/regex";
import { Button, Group, Paper, Text, TextInput } from "@mantine/core";
import { APP_NAME } from "../../constants";
import { signIn } from "next-auth/react";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (email_regex.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 5 ? null : "Invalid password"),
    },
  });

  async function authenticateUser(values: any) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });
    if (!res?.ok) {
      if (res?.status === 401) {
        return notifications.show({
          color: "red",
          title: "Invalid Credentials",
          message:
            "Please ensure your email and password are correct and then try again",
        });
      }
      if (res?.status === 404) {
        return notifications.show({
          color: "red",
          title: "User does not exist",
          message:
            "We don't have a user who matches those credentials in our database. Have you registered?",
        });
      }
      return notifications.show({
        color: "red",
        title: "Something went wrong",
        message:
          "We are unable to log you in at this time. Please try again later",
      });
    }
    router.push("/");
    return notifications.show({
      color: "green",
      title: "Login Successful",
      message: "You have been logged in successfully!",
    });
  }

  return (
    <Paper maw={340} mx="auto" p="md" radius="md" withBorder>
      <Text>Log in to {APP_NAME}</Text>
      <form onSubmit={form.onSubmit((values) => authenticateUser(values))}>
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
        <Text>
          Need an account? <Link href="/register">Register Here</Link>
        </Text>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Login</Button>
        </Group>
      </form>
    </Paper>
  );
}

export default LoginPage;
