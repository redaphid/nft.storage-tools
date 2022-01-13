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
      let progressFn
      beforeEach(async () => {
        progressFn = jest.fn();
        uploader.on("progress", progressFn)
        await uploader.upload("/tmp");
      })
      it("should resolve a promise", () => {
        expect(uploader).toBeDefined();
      });
      it("should have called the nftstorage client", () => {
        expect(client.store).toHaveBeenCalled();
      })
      it("should have updated us with some progress", () => {
        expect(progressFn).toHaveBeenCalled();
      })
    });
  });
});
