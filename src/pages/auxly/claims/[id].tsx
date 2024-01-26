import {
  Timeline,
  Text,
  Flex,
  Box,
  ThemeIcon,
  Paper,
  Button,
  Group,
  Grid,
  List,
} from "@mantine/core";
import { getClaimById } from "@/lib/claims";
import { getUserProfileByUserId } from "@/lib/user";
import { AuxlyClaimSubmission, UserRole } from "@prisma/client";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { modals } from "@mantine/modals";
import { AuxlyClaimForm, validation } from "../claim-form";
import { User } from "next-auth";

const getActiveIndex = (claim: AuxlyClaimSubmission) => {
  switch (claim.status) {
    case "UNDER_REVIEW":
      return 2;
    case "ACCEPTED":
      return 3;
    case "REJECTED":
      return 3;
    default:
      return 1;
  }
};
const getFinalStepDetails = (claim: AuxlyClaimSubmission) => {
  switch (claim.status) {
    default:
      return {
        title: "Claim approval/rejection",
        text: "Your claim will be approved or rejected by our administration team. Please check back often to monitor your claim&apos;s status",
        icon: <IconCheck size={12} />,
        color: "blue",
      };
    case "ACCEPTED":
      return {
        title: "Approved!",
        text: "Your claim has been approved! We will email you with next steps.",
        color: "green",
        icon: (
          <ThemeIcon size={24} color="green" radius="xl">
            <IconCheck />
          </ThemeIcon>
        ),
      };
    case "REJECTED":
      return {
        title: "Rejected",
        text: "Your claim has been rejected. Please consult the administrator's notes for more information",
        color: "red",
        icon: (
          <ThemeIcon size={24} color="red" radius="xl">
            <IconX />
          </ThemeIcon>
        ),
      };
  }
};

function FieldDetail({
  title,
  value,
}: {
  title: string;
  value: string | string[] | null | number;
}) {
  if (value instanceof Array) {
    return (
      <Grid.Col span={3}>
        <Text fw="bold" fz="sm" color="gray.7">
          {title}
        </Text>
        <List>
          {value.map((val) => (
            <List.Item key={val}>{val}</List.Item>
          ))}
        </List>
      </Grid.Col>
    );
  }
  return (
    <Grid.Col span={3}>
      <Text fw="bold" fz="sm" color="gray.7">
        {title}
      </Text>
      <Text mb="md" fz="sm">
        {value || "-"}
      </Text>
    </Grid.Col>
  );
}

const initialFormValues = (claim: AuxlyClaimSubmission) => ({
  fullName: claim.fullName || "",
  email: claim.email || "",
  phoneNumber: claim.phoneNumber || "",
  streetAddress: claim.streetAddress || "",
  addressLine2: claim.addressLine2 || "",
  postalCode: claim.postalCode || "",
  city: claim.city || "",
  province: claim.province || "",
  country: claim.country || "",
  // purchaseDates: claim.purchaseDates || [],
  // sellDates: claim.sellDates || [],
  purchaseDates: [],
  sellDates: [],
  securityQty: claim.securityQty || 0,
});

function ClaimDetail({
  claim,
  user,
}: {
  claim: AuxlyClaimSubmission;
  user: User;
}) {
  const activeIndex = getActiveIndex(claim);
  const finalStepDetails = getFinalStepDetails(claim);
  const initValues = initialFormValues(claim);
  const handleEdit = () => {
    modals.open({
      title: (
        <Text c="blue" fw="bolder" fz="xl">
          Edit Claim
        </Text>
      ),
      size: "lg",
      children: (
        <AuxlyClaimForm
          onSubmit={() => {}}
          user={user}
          initialValues={initValues}
          validation={validation}
        />
      ),
    });
  };

  const formattedPurchaseDates = claim.purchaseDates.map((date: Date) =>
    new Date(date).toDateString()
  );
  const formattedSellDates = claim.sellDates.map((date: Date) =>
    new Date(date).toDateString()
  );

  return (
    <Grid mt="xl" maw={1200} mx="auto">
      <Grid.Col span={4}>
        <Text fz="lg" fw="bold" mb="lg">
          Claim Status
        </Text>
        <Timeline
          active={activeIndex}
          bulletSize={24}
          lineWidth={2}
          maw={320}
          color={finalStepDetails.color}
        >
          <Timeline.Item
            title="Claim Submitted"
            bullet={<IconCheck size={12} />}
          >
            <Text c="dimmed" size="sm">
              You&apos;ve submitted your claim
            </Text>
          </Timeline.Item>
          <Timeline.Item
            title="Pending Review"
            bullet={<IconCheck size={12} />}
          >
            <Text c="dimmed" size="sm">
              Your claim is currently pending administrator action
            </Text>
          </Timeline.Item>
          <Timeline.Item title="Under Review" bullet={<IconCheck size={12} />}>
            <Text c="dimmed" size="sm">
              Your claim is currently being reviewed by an administrator,
              they&apos;ll arrive at a decision shortly
            </Text>
          </Timeline.Item>
          <Timeline.Item
            title={finalStepDetails.title}
            bullet={finalStepDetails.icon}
          >
            <Text c="dimmed" size="sm">
              {finalStepDetails.text}
            </Text>
          </Timeline.Item>
        </Timeline>
      </Grid.Col>
      <Grid.Col span={8}>
        <Paper p="md" radius="md">
          <div>
            <Group>
              <Text size="xl" fw="bold">
                Claim Details
              </Text>
              <Button variant="subtle" onClick={handleEdit}>
                Edit claim
              </Button>
            </Group>
            <Text mb="md" c="dimmed" fz="sm">
              View or edit the details of your claim
            </Text>
          </div>
          <Box mb="lg">
            <Text mb="md" fw="bold">
              Personal Information
            </Text>
            <Grid>
              <FieldDetail title="Full name" value={claim.fullName} />
              <FieldDetail title="Email" value={claim.email} />
              <FieldDetail title="Phone number" value={claim.phoneNumber} />
              <FieldDetail title="Street address" value={claim.streetAddress} />
              <FieldDetail title="Address line 2" value={claim.addressLine2} />
              <FieldDetail title="Postal code" value={claim.postalCode} />
              <FieldDetail title="City" value={claim.city} />
              <FieldDetail title="Province" value={claim.province} />
              <FieldDetail title="Country" value={claim.country} />
            </Grid>
          </Box>
          <Box mb="lg">
            <Text mb="md" fw="bold">
              Claim Information
            </Text>
            <Grid>
              <FieldDetail
                title="Purchase Dates"
                value={formattedPurchaseDates}
              />
              <FieldDetail title="Sell Dates" value={formattedSellDates} />
              <FieldDetail
                title="Total Securities Owned"
                value={claim.securityQty}
              />
            </Grid>
          </Box>
          <Box mb="lg">
            <Text mb="md" fw="bold">
              Documents
            </Text>
          </Box>
        </Paper>
      </Grid.Col>
    </Grid>
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
      user: session.user,
    },
  };
}

export default ClaimDetail;
