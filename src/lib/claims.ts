import { prisma } from "@/config/prisma";
import { AuxlyClaimSubmission } from "@prisma/client";

export async function createAuxlyClaimSubmission(payload: any) {
  return prisma.auxlyClaimSubmission.create({ data: payload });
}

export async function getClaimById(
  claimId: string
): Promise<AuxlyClaimSubmission | null> {
  return prisma.auxlyClaimSubmission.findFirst({ where: { id: claimId } });
}

export async function getClaimsByProfileId(
  profileId: string
): Promise<AuxlyClaimSubmission[]> {
  return prisma.auxlyClaimSubmission.findMany({ where: { profileId } });
}
