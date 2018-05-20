
module.exports = (command, lowQualitySavePath, removeFile, lowQualityShowPath, video, uuid, callback) =>
  command
    .clone()
    .size('512x288')
    .save(lowQualitySavePath)
    .on('error', err => {
      removeFile(lowQualitySavePath);
      console.log(`An error occurred: ${err.message}`);
      callback(err, null);
    })
    .on('end', () => {
      video.low = `${lowQualityShowPath}${uuid}.mp4`;
      callback(null,video);
    });
