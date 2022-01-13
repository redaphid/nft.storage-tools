import { DirectoryUploader } from "./directory-uploader";
describe("Upload Directory", () => {
  describe("when created with a nftstorage client", () => {
    let uploader: DirectoryUploader;
    let client: any;
    beforeEach(() => {
      client = {
        store: jest.fn().mockResolvedValue({}),
      };
      uploader = new DirectoryUploader(client);
    });
    it("should exist", () => {
      expect(uploader).toBeDefined();
    });
    describe("when upload is called with a directory", () => {
      beforeEach(async () => {
        await uploader.upload("/tmp");
      })
      it("should resove a promise", () => {
        expect(uploader).toBeDefined();
      });
    });
  });
});
