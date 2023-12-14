import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { email_regex } from "../../../utils/regex";

const prisma = new PrismaClient();

const registerUserSchema = z.object({
  email: z.string().regex(email_regex),
  password: z.string().min(8, "password should be a minimum of 5 characters"),
  givenName: z.string(),
  familyName: z.string(),
});

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password, givenName, familyName } = registerUserSchema.parse(
    req.body
  );
  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    return res.send({ user: null, message: "User already exists" });
  }
  const hashedPass = await bcrypt.hash(password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email,
      password: hashedPass,
      name: `${givenName} ${familyName}`,
      role: "CLASS_MEMBER",
    },
  });
  if (createdUser) {
    const createdProfile = await prisma.profile.create({
      data: {
        userId: createdUser.id,
        givenName,
        familyName,
      },
    });
    return res.send({
      user: createdProfile,
      message: "User created successfully!",
    });
  }
  throw new Error();
}
