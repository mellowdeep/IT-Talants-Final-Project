module.exports = (ffmpeg, path, file, video, callback) =>
  ffmpeg.ffprobe(path.join(file.path), (err, metadata) => {
    const duration = metadata.streams[0].duration;
    const temp = duration/60;
    const min = Math.floor(temp).toFixed().slice(0,2);
    const sec = (Number(temp.toString().split('.').pop())*60).toFixed().slice(0,2);
    const time = `${min}:${sec}`;

    video.duration = time;
    callback(null, video);
  });
