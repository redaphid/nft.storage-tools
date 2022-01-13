import { EventEmitter } from "events";
interface NFTClient {
  store(fileProps: any): Promise<any>;
}
class DirectoryUploader extends EventEmitter {
  constructor(private client: NFTClient) {
    super();
  }
  upload(directory: string) {
    this.client.store({});
    return Promise.resolve();
  }
}
export { DirectoryUploader };
