
module.exports = (s3fs, path, fs, removeFile, lowQualitySavePath, video,  nameAndType, amazonPath) => {
    const stream = fs.createReadStream(lowQualitySavePath);
    return s3fs.writeFile(nameAndType, stream)
              .then((file) => {
                video.low = amazonPath;
              })
      .then(() => removeFile(lowQualitySavePath))
};
