import { EventEmitter } from "events";
interface NFTClient {
  store(fileProps: any): Promise<any>;
}
interface NFTResponse {
  ipnft: string;
  url: string;
}
class DirectoryUploader extends EventEmitter {
  constructor(private client: NFTClient) {
    super();
  }
  upload(directory: string) {
    this.client.store({});
    this.emit("progress", {})
    return Promise.resolve();
  }
}
export { DirectoryUploader };
