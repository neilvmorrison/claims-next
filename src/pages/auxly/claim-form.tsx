import {
  Text,
  Group,
  rem,
  Button,
  TextInput,
  InputBase,
  Box,
  NumberInput,
  Paper,
  InputWrapper,
  FileInput,
} from "@mantine/core";
import { IMaskInput } from "react-imask";
import classes from "./auxly.module.css";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FormEvent, useState } from "react";
import { User } from "next-auth";
import { email_regex } from "../../../utils/regex";
import { DatePickerInput } from "@mantine/dates";
import { getUserProfileByUserId } from "@/lib/user";
import { Profile } from "@prisma/client";

function FileUpload({ onDrop, ...props }: any) {
  return (
    <Dropzone
      onDrop={(files) => onDrop(files)}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={5 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
      mt="sm"
      {...props}
    >
      <Group
        justify="center"
        gap="xl"
        mih={220}
        style={{ pointerEvents: "none" }}
      >
        <Dropzone.Accept>
          <IconUpload
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-blue-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-red-6)",
            }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconPhoto
            style={{
              width: rem(52),
              height: rem(52),
              color: "var(--mantine-color-dimmed)",
            }}
            stroke={1.5}
          />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag supporting documents here, or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many brokerage statements as possible. Documents should
            not exceed 1Mb.
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}

const initialFormValues = (user: User) => ({
  fullName: user.name || "",
  email: user.email || "",
  phoneNumber: "",
  streetAddress: "",
  addressLine2: "",
  city: "",
  province: "",
  postalCode: "",
  country: "",
  purchaseDates: [],
  sellDates: [],
  securityQty: 0,
});

const validation = {
  fullName: (value: string) =>
    !!value.length ? null : "This field is required",
  email: (value: string) => (email_regex.test(value) ? null : "Invalid email"),
  phoneNumber: (value: string) =>
    value.length < 10 ? "Enter a valid phone number" : null,
};

function AuxlyClaimForm({ user, profile }: { user: User; profile: Profile }) {
  const minSelectionDate = new Date(2018, 10, 12);
  const maxSelectionDate = new Date(2019, 1, 6);
  // const [file, setFile] = useState<null | File>(null);
  const initValues = initialFormValues(user);
  const form = useForm({
    initialValues: initValues,
    validate: validation,
  });

  const onSubmit = async (values: any) => {
    const payload = {
      ...values,
      profileId: profile.id,
    };
    const submission = await fetch("/api/claims", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const result = await submission.json();
    console.log(result);
  };

  return (
    <div>
      <div className={classes.hero} />
      <div className={classes.content}>
        <Text fz={32} fw="bolder" mb="lg">
          Auxly Cannabis Group Inc. Settlement Claim Form
        </Text>
        <Text mb="md">
          Only shares purchased during the identified Class Period and held
          until after February 6, 2019, will be considered to be included within
          the Settlement.
        </Text>
        <Text mb="md">
          Class Period:{" "}
          <Text fw="bold" display="inline" component="span">
            ONLY SHARES PURCHASED BETWEEN NOVEMBER 12, 2018 THROUGH FEBRUARY 6,
            2019.
          </Text>
        </Text>
        <Text mb="md">
          You must complete the form below before April 13, 2024, so you can
          register to receive a distribution of the Settlement Funds.
        </Text>
        <form
          onSubmit={form.onSubmit((values) => onSubmit(values))}
          className={classes.claimContainer}
        >
          <Paper p="md" radius="md" shadow="md" className={classes.claimForm}>
            <Text c="blue.5" fz="xl" fw="bolder">
              Submit a claim
            </Text>
            <TextInput
              withAsterisk
              label={"Full name"}
              placeholder={"Frances McFarland"}
              {...form.getInputProps("fullName")}
            />
            <TextInput
              withAsterisk
              label={"Email"}
              placeholder={"my@email.com"}
              {...form.getInputProps("email")}
            />
            <InputBase
              withAsterisk
              label={"Phone number"}
              placeholder={"(647) 123 4567"}
              mask="(000) 000-0000"
              component={IMaskInput}
              {...form.getInputProps("phoneNumber")}
            />
            <TextInput
              label={"Street address"}
              placeholder={"1 Avenue Street West"}
              {...form.getInputProps("streetAddress")}
            />
            <TextInput
              label={"Address line 2"}
              placeholder={"Unit 2B"}
              {...form.getInputProps("addressLine2")}
            />
            <TextInput
              label={"Postal / ZIP code"}
              placeholder={"A1B2C3"}
              {...form.getInputProps("postalCode")}
            />
            <TextInput
              label={"City"}
              placeholder={"Montreal"}
              {...form.getInputProps("city")}
            />
            <TextInput
              label={"Country"}
              placeholder={"Canada"}
              {...form.getInputProps("country")}
            />
            <DatePickerInput
              withAsterisk
              type="multiple"
              label="Purchase Dates"
              description="Select all puchase dates"
              valueFormat="DD MMM YYYY"
              minDate={minSelectionDate}
              maxDate={maxSelectionDate}
              hideOutsideDates
              {...form.getInputProps("purchaseDates")}
              value={form.values.purchaseDates}
            />
            <DatePickerInput
              withAsterisk
              type="multiple"
              label="Sell dates"
              description="Select all sell dates"
              valueFormat="DD MMM YYYY"
              minDate={minSelectionDate}
              maxDate={maxSelectionDate}
              hideOutsideDates
              {...form.getInputProps("sellDates")}
              value={form.values.sellDates}
            />
            <NumberInput
              withAsterisk
              label="Securities ownership"
              description="Number of securities owned after 6 Feb, 2019"
              placeholder="Input placeholder"
              {...form.getInputProps("securityQty")}
            />
            <FileInput
              label="Government-issued identification"
              description="You Must provide government-issued identification which matches
                your brokerage account statements below"
              withAsterisk
              placeholder="Upload identification document"
            />
            <InputWrapper
              label="Brokerage statements"
              description="Please upload as many brokerage statements as possible to
                support your claim. Please note that your February 2019
                brokerage statement is required."
              withAsterisk
            >
              <FileUpload
                // onDrop={(files: File[]) => setFile(files[0])}
                label="Brokerage statements"
              />
            </InputWrapper>
            <Button type="submit" variant="filled">
              Submit claim
            </Button>
          </Paper>
        </form>
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
  const profile = await getUserProfileByUserId(session.user.id);
  console.log(profile);
  return {
    props: {
      user: session.user,
      profile,
    },
  };
}

export default AuxlyClaimForm;
