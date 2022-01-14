import { EventEmitter } from "events";
import recursive from "recursive-readdir";
import { TokenInput, Token } from "nft.storage/dist/src/token";
import { File, NFTStorage } from "nft.storage";
import { readFile } from "fs/promises";

// interface FileTokenInput extends TokenInput {
//   properties: {
//     file: typeof File;
//   };
// }
interface NFTClient {
  store(token: TokenInput): Promise<Token<TokenInput>>;
}

interface ProgressInfo {
  filesFinished: number;
  filesTotal: number;
  filePercent: number;
  filesPerSecond: number;
}
class DirectoryUploader extends EventEmitter {
  constructor(private client: NFTClient) {
    super();
  }
  async upload(directory: string) {
    const files = await recursive(directory);
    const thingsToUpload = files.map(async (fileName) => {
      return this.client
        .store({
          name: fileName,
          description: "whatever",
          image: new File([await readFile(fileName)], fileName, { type: "image/jpg" }),
          properties: {
            file: new File([await readFile(fileName)], fileName),
          },
        })
        .then((token) => {
          const event = { ...token, fileName };
          this.emit("file-completed", event);
        });
    });
    return await Promise.all(thingsToUpload);
  }
}
export { DirectoryUploader };
