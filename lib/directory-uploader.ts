import { EventEmitter } from "events";
import recursive from "recursive-readdir";
interface NFTClient {
  store(fileProps: any): Promise<any>;
}
interface ProgressInfo {
  filesFinished: number,
  filesTotal: number,
  filePercent: number
  filesPerSecond: number
  
}
interface NFTResponse {
  fileName: string,
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
      const progressInfo:NFTResponse ={
        fileName: f,
        ipnft:"frankenstein-nft",
        url:"frankenstein-url",        
      }
      this.emit("file-completed", progressInfo);
    }

    return Promise.resolve();
  }
}
export { DirectoryUploader };
