import crypto from "crypto";
import fs from "fs";

const algorithm = "aes-256-cbc";

const getSecretKey = () => {
  if (!process.env.FILE_SECRET) {
    throw new Error("FILE_SECRET is missing in environment variables");
  }

  return crypto
    .createHash("sha256")
    .update(String(process.env.FILE_SECRET))
    .digest();
};

export const encryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const secretKey = getSecretKey();
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);

    output.write(iv);

    input
      .pipe(cipher)
      .pipe(output)
      .on("finish", resolve)
      .on("error", reject);
  });
};

export const decryptFile = (inputPath, outputPath) => {
  return new Promise((resolve, reject) => {
    const secretKey = getSecretKey();
    const input = fs.createReadStream(inputPath);

    input.once("readable", () => {
      const iv = input.read(16);
      const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);

      const output = fs.createWriteStream(outputPath);

      input
        .pipe(decipher)
        .pipe(output)
        .on("finish", resolve)
        .on("error", reject);
    });

    input.on("error", reject);
  });
};

