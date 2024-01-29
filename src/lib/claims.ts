import { prisma } from "@/config/prisma";
import { ClaimSubmission, FormFieldSubmission } from "@prisma/client";

export type CreateClaimSubmissionPayload = ClaimSubmission & {
  formInputFieldSubmissions: FormFieldSubmission[];
};

export async function createClaimSubmission(
  payload: CreateClaimSubmissionPayload
): Promise<ClaimSubmission> {
  const claimSubmissionPayload = {
    ...payload,
    formInputFieldSubmissions: {
      create: payload.formInputFieldSubmissions,
    },
  };
  return prisma.claimSubmission.create({ data: claimSubmissionPayload });
}

export async function getClaimById(
  claimId: string
): Promise<ClaimSubmission | null> {
  return prisma.claimSubmission.findFirst({ where: { id: claimId } });
}

export async function getClaimsByProfileId(
  profileId: string
): Promise<ClaimSubmission[]> {
  return prisma.claimSubmission.findMany({ where: { profileId } });
}

export async function updateClaim(
  claimId: string,
  payload: Partial<ClaimSubmission>
) {
  return;
}
