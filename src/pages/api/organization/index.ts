import { createOrganization } from "@/lib/organization";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { id } = req.query;

  if (method === "POST") {
    const { body } = req;
    try {
      const organization = await createOrganization(body);
      return res.status(200).json(organization);
    } catch (err) {
      return res.status(500).json({ message: "Creation failed!" });
    }
  }

  if (method === "GET") {
    return res.status(200).json({ message: "Class actions!" });
  }
  if (method === "PATCH") {
  }
  if (method === "PUT") {
  }
  if (method === "DELETE") {
  }
}
