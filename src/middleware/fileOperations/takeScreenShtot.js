
module.exports = (ffmpeg, file, path, takeScreenshotTime, uuid, imageSavePath, video, callback) =>
  ffmpeg(path.join(file.path))
    .takeScreenshots({
        count: 1,
        size: '200x200',
        timemarks: ['5'],
        filename: `${uuid}.png`,
      },
      imageSavePath,
      err => {
        callback(err, null);
      },
      callback(null,video)
    );
