import { prisma } from "@/config/prisma";
import { Organization } from "@prisma/client";

export async function createOrganization(
  payload: Organization
): Promise<Organization> {
  return prisma.organization.create({ data: payload });
}
