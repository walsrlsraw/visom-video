module.exports = {
  tcpPort: 30518,
  udpPort: 50518,
  video: {
    ffmpeg: 'D:/work/ffmpeg/ffmpeg-20190323-5252d59-win64-static/bin/ffmpeg.exe',
    sources: [
      { id: '1', url: 'rtsp://admin:Chinsoft@sx3.7766.org:954/MPEG-4/ch2/main/av_stream' },
      { id: '2', url: 'rtsp://admin:Chinsoft@sx3.7766.org:954/doc/page/config.asp' },
      { id: '3', url: 'rtsp://admin:Chinsoft@sx3.7766.org:754/doc/page/config.asp' },
    ],
    dest: 'D:/work/ffmpeg/video',
  }
};