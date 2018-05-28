const LENGTH = 2;

module.exports = (ffmpeg, path, file, video, callback) =>
  ffmpeg.ffprobe(path.join(file.path), (err, metadata) => {

    function frontPad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    function backPad(n, width, z) {
      z = z || '0';
      n = n + '';
      return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
    }

    const duration = metadata.streams[0].duration;
    const temp = duration/60;
    const min = Math.floor(temp).toFixed().slice(0,2);
    const sec = (Number(temp.toString().split('.').pop())*60).toFixed().slice(0,2);
    const time = `${frontPad(min, LENGTH)}:${backPad(sec, LENGTH)}`;

    video.duration = time;
    callback(null, video);
  });
