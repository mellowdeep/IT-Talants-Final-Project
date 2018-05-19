module.exports = (ffmpeg, path, file, video, callback) =>
  ffmpeg.ffprobe(path.join(file.path), (err, metadata) => {
    const duration = metadata.streams[0].duration.toString().split('.');
    const min = (Number(duration.shift()) || 0) / 60;
    const sec = (Number(duration.pop()) || 0) / 60;
    const time = `${min.toFixed().slice(0, 2)}:${sec.toFixed().slice(0, 2)}`;

    video.duration = time;
    callback(null, video);
  });
