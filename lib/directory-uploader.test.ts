import { DirectoryUploader } from "./directory-uploader";
describe("Upload Directory", () => {
  describe("when created with a nftstorage client", () => {
    let uploader: DirectoryUploader;
    let client: any;
    beforeEach(() => {
      client = {
        store: jest.fn(),
      };
      uploader = new DirectoryUploader(client);
    });
    it("should exist", () => {
      expect(uploader).toBeDefined();
    });
    describe("when listening for file completed events", () => {
      describe("", () => {
        let fileInfoFn;
        beforeEach(() => {
          fileInfoFn = jest.fn();
          uploader.on("file-completed", fileInfoFn);
        });
        describe("when uploading a directory", () => {
          let uploaderPromise;
          beforeEach(async () => {
            uploaderPromise = uploader.upload("./test/data");
          });
          describe("when the store method resolves", () => {
            beforeEach(async () => {
              client.store.mockResolvedValue({ ipnft: "frankenstein-nft", url: "frankenstein-url" });
              await uploaderPromise;
            });
            it("should tell us the frankenstein file is complete, w/the nft info", () => {
              expect(fileInfoFn).toHaveBeenCalledWith({
                fileName: "test/data/1-file-directory/frankenstein.txt",
                ipnft: "frankenstein-nft",
                url: "frankenstein-url",
              });
            });
            it("should tell us the deep-sibling-2.txt file is complete, w/the nft info", () => {
              expect(fileInfoFn).toHaveBeenCalledWith({
                fileName: "test/data/4-nested/2-nested/deep-sibling-2.txt",
                ipnft: "deep-sibling-2-nft",
                url: "deep-sibling-2-url",
              });
            });           
            });
          });
        });
      });
    });
  });
