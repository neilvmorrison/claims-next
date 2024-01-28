import { prisma } from "@/config/prisma";
import {
  AuxlyClaimSubmission,
  ClaimSubmission,
  FormInputFieldSubmission,
} from "@prisma/client";

export type CreateClaimSubmissionPayload = ClaimSubmission & {
  formInputFieldSubmissions: FormInputFieldSubmission[];
};

export async function createAuxlyClaimSubmission(payload: any) {
  return prisma.auxlyClaimSubmission.create({ data: payload });
}

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
  payload: Partial<AuxlyClaimSubmission>
) {
  return;
}
