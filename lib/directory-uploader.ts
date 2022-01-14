import { EventEmitter } from "events";
import recursive from "recursive-readdir";
import { TokenInput, Token } from "nft.storage/dist/src/token";
import { File, NFTStorage } from "nft.storage";

interface NFTClient {
  store(token: TokenInput): Promise<Token<TokenInput>>;
}

interface ProgressInfo {
  filesFinished: number;
  filesTotal: number;
  filePercent: number;
  filesPerSecond: number;
}
interface NFTResponse {
  fileName: string;
  ipnft: string;
  url: string;
}
class DirectoryUploader extends EventEmitter {
  constructor(private client: NFTClient) {
    super();
  }
  async upload(directory: string) {
    const files = await recursive(directory);    
    for (const fileName of files) {
      const token = await this.client.store({
        name: fileName,
        description:"whatever",
        image: 'hey'
      });
      const event = {...token, fileName};
      this.emit("file-completed", event);
    }

    return Promise.resolve();
  }
}
export { DirectoryUploader };
