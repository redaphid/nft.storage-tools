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
    describe("when listening for progress events", () => {
      describe("", () => {
        let progressFn;
        beforeEach(() => {
          progressFn = jest.fn();
          uploader.on("progress", progressFn);
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
            it("should update us with the progress re: the frankenstein file", () => {
              expect(progressFn.mock.calls).toEqual(
                expect.arrayContaining([
                  expect.arrayContaining([
                    expect.objectContaining({
                      fileName: "test/data/1-file-directory/frankenstein.txt",
                      ipnft: "frankenstein-nft",
                      url: "frankenstein-url",
                    }),
                  ]),
                ]),
              );
            });
            it("should update us with the progress re: the deep-sibling-2.txt file", () => {
              expect(progressFn.mock.calls).toEqual(
                expect.arrayContaining([
                  expect.arrayContaining([
                    expect.objectContaining({
                      fileName: "test/data/4-nested/2-nested/deep-sibling-2.txt",
                    }),
                  ]),
                ]),
              );
            });
          });
        });
      });
    });
  });
});
