import { EventEmitter } from "events";
import recursive from "recursive-readdir";
import { TokenInput} from "nft.storage/dist/src/token";
import {File} from 'nft.storage'

interface NFTClient {
  store(token: TokenInput): Promise<TokenInput>
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
    // this.client.store({
      
    // })
    for (const fileName of files){
      const fileInfo:NFTResponse ={
        fileName,
        ipnft:"frankenstein-nft",
        url:"frankenstein-url",        
      }
      this.emit("file-completed", fileInfo);
    }

    return Promise.resolve();
  }
}
export { DirectoryUploader };
