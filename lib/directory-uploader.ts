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
    this.client.store({});
    this.emit("progress", {
      fileName: 'test/data/1-file-directory/frankenstein.txt',
      ipnft: "frankenstein-nft",
      url: "frankenstein-url",
    });
    return Promise.resolve();
  }
}
export { DirectoryUploader };
