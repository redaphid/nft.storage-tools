import { EventEmitter } from "events";
import recursive from "recursive-readdir";
interface NFTClient {
  store(fileProps: any): Promise<any>;
}
interface ProgressInfo extends NFTResponse {
  fileName: string,
  filesFinished: number,
  filesTotal: number,
  filePercent: number
  filesPerSecond: number
  
}
interface NFTResponse {
  ipnft: string;
  url: string;
}
class DirectoryUploader extends EventEmitter {
  constructor(private client: NFTClient) {
    super();
  }
  async upload(directory: string) {
    const files = await recursive(directory);
    console.log({files})
    this.client.store({})
    for (const f of files){
      this.emit("progress", {
        fileName: f,
        ipnft: "frankenstein-nft",
        url: "frankenstein-url",
      });
    }

    return Promise.resolve();
  }
}
export { DirectoryUploader };
