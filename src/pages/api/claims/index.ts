import { createAuxlyClaimSubmission } from "@/lib/claims";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { body } = req;
    const payload = JSON.parse(body);
    try {
      const claim = await createAuxlyClaimSubmission(payload);
      return res
        .status(200)
        .json({ message: "This is claim submission", claim });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message:
          "There was an error creating your claim, please try again later",
      });
    }
  }
}
