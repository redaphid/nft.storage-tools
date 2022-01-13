
interface NFTStorage {
  store(fileProps: any): Promise<any>;
}
class DirectoryUploader {
    constructor(private client: NFTStorage) {
        // this.directory = directory;
        // this.bucket = bucket;
        // this.options = options;
    }
    upload() {
    //     return __awaiter(this, void 0, void 0, function* () {
    //         const { directory, bucket, options } = this;
    //         const files = yield readdir(directory);
    //         const uploadPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
    //             const filePath = path.join(directory, file);
    //             const fileName = path.basename(filePath);
    //             const fileStream = fs.createReadStream(filePath);
    //             const upload = new s3.ManagedUpload({
    //                 ...options,
    //                 params: {
    //                     Bucket: bucket,
    //                     Key: fileName,
    //                     Body: fileStream,
    //                 },
    //             });
    //             return upload.promise();
    //         }));
    //         return Promise.all(uploadPromises);
    //     });
    // }
}
}
export {DirectoryUploader}