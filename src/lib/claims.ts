import { prisma } from "@/config/prisma";

export async function createAuxlyClaimSubmission(payload: any) {
  await prisma.auxlyClaimSubmission.create({ data: payload });
}
