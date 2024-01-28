import { prisma } from "@/config/prisma";
import { ClassAction, FormInputField } from "@prisma/client";

export type ClassActionPayload = ClassAction & {
  formFields: FormInputField;
};

export async function createClassAction(
  payload: ClassActionPayload
): Promise<ClassAction> {
  const classActionPayload = {
    ...payload,
    formFields: {
      create: payload.formFields,
    },
  };
  return prisma.classAction.create({ data: classActionPayload });
}
