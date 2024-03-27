import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

import { Hono } from "hono";
import { handle } from "hono/aws-lambda";

import { authMiddleware } from "@my-expenses-app/core/auth";

const app = new Hono();

const s3 = new S3Client({});

const randomString = (length: number) =>
  crypto.randomBytes(length).toString("hex");

app.post("/signed-url", authMiddleware, async (c) => {
  const userId = c.var.userId;
  const { contentType, contentLength, checksum } = await c.req.json();

  if (contentLength > 1024 * 1024 * 10 * 10) {
    return c.json({ error: "File too large" }, 400);
  }

  const imageName = randomString(16);
  const putCommand = new PutObjectCommand({
    ACL: "public-read",
    Bucket: process.env.ASSETS_BUCKET_NAME!,
    Key: imageName,
    ContentType: contentType,
    ContentLength: contentLength,
    ChecksumSHA256: checksum,
  });

  const url = await getSignedUrl(s3, putCommand, { expiresIn: 60 * 5 });

  // generate an s3 signed url
  return c.json({ url });
});

export const handler = handle(app);
