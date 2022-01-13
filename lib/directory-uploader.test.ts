import { DirectoryUploader } from "./directory-uploader";
describe("Upload Directory", () => {
  it("should exist", () => {
    expect(DirectoryUploader).toBeDefined();
  });
  describe("when created with a nftstorage client", () => {
    let uploader: DirectoryUploader;
    let client: any;
    beforeEach(() => {
      client = {
        store: jest.fn().mockResolvedValue({}),
      };
      uploader = new DirectoryUploader(client);
    });
    describe("when upload is called with", () => {});
    it("still should exist", () => {
      expect(uploader).toBeDefined();
    });
  });
});
