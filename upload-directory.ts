/**
 * Upload all files in a directory. Recursively searches subdirectories and uploads async.
 *
 * Usage:
 *     MAX_CONCURRENT_UPLOADS=5 API_KEY="<whatever>" node upload-directory.js ./test/data/1-file-directory

 */
import { readFile } from "fs/promises";
import { promisify } from "util";

import dotenv from "dotenv";
import { Semaphore } from "await-semaphore";
import chalk from "chalk";

import {DirectoryUploader} from "./lib/directory-uploader";
import { NFTStorage, File } from "nft.storage";

const timeout = promisify(setTimeout);

const MAX_TIMEOUT = 15000;
const storeFiles = async ({ endpoint, token, path, maxConcurrentUploads }) => {  
  
  const client = new NFTStorage({ endpoint, token });
  const uploader = new DirectoryUploader(client);
  uploader.on("file-completed", console.table)

  await uploader.upload(path)  
};

dotenv.config();

async function main() {
  const token = process.env.API_KEY;
  if (!token) {
    throw new Error("missing nft.storage API key");
  }

  const filePath = process.argv[2];
  if (!filePath) {
    throw new Error("missing file argument");
  }

  const endpoint = process.env.ENDPOINT || "https://api.nft.storage";
  const maxConcurrentUploads = process.env.MAX_CONCURRENT_UPLOADS || 3;
  await storeFiles({ endpoint, token, path: filePath, maxConcurrentUploads });
}

main();
