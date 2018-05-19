

module.exports = (command, highQualitySavePath, removeFile, highQualityShowPath, video, uuid, callback) =>
  command
      .clone()
      .size('896x504')
      .save(highQualitySavePath)
    .on('error', err => {
      removeFile(highQualitySavePath);
      console.log(`An error occurred: ${err.message}`);
      callback(err, null);
    })
    .on('end', () => {
      video.high = `${highQualityShowPath}${uuid}.mp4`;
      callback(null,video);
    });
