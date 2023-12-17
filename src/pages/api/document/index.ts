import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { uploadDocument } from "./s3client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({});
    form.parse(req, (err, fields, files) => {
      console.log(fields, files);
    });
    console.log({ form });
    // const documentUpload = await uploadDocument(file, "test-key");
    // console.log(documentUpload);
    res.status(200).json({ message: "This is the document endpoint" });
  }

  if (req.method === "GET") {
    res.status(200).json({ message: "This is the document endpoint" });
  }
}
