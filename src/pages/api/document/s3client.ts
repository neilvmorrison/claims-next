import { S3, S3ClientConfig } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";

const s3Client = new S3({
  forcePathStyle: false,
  endpoint: "https://claims-admin-bucket.sfo2.digitaloceanspaces.com",
  region: "us-east-1",
  credentials: {
    accessKeyId: "DO00NJ8HACNKF37R4WTJ",
    secretAccessKey: "ndd+CR65E8U4Y4BSnIbMH3xf7kgrcWcbYFYpP00ye9k",
  },
});

export async function uploadDocument(file: any, key: string) {
  const fileStream = fs.createReadStream(file);
  const params = {
    Bucket: "claims-admin-bucket",
    Key: key,
    Body: fileStream,
  };
  const upload = new Upload({
    client: s3Client,
    params,
    leavePartsOnError: false,
  });
  upload.on("httpUploadProgress", (progress) => {
    console.log(progress);
  });
  await upload.done();
  // const docUpload = await s3Client.putObject(params);
  // console.log(docUpload);
}

export { s3Client };
