const mkdirp = require('mkdirp');
const EventEmitter = require('events');
const dgram = require('dgram');
const { spawn } = require('child_process');

class VideoServer extends EventEmitter {
  constructor() {
    super();
    this.process = [];
    this.running = true;
  }
  init(config) {
    this.config = config.video;
    if (!this.config.dest) {
      this.config.dest = 'public/video';
    }
  }

  createProcess(source, index, path) {
    const that = this;
    const params = ['-v', '0', '-i', source, '-c', 'copy', '-f', 'hls', '-hls_time', '2.0', '-hls_list_size', '15', '-hls_wrap', '15', path + '/playlist.m3u8'];
    if (source.indexOf('rtsp') === 0) {
      params.unshift('tcp');
      params.unshift('-rtsp_transport');
    }
    const exec = spawn(this.config.ffmpeg, params);

    exec.stdout.on('data', function(data) {
      console.log(index + ': ' + data);
    });

    exec.stderr.on('data', function(data) {
      console.log(index + ': ' + data);
    });

    exec.on('close', function(code) {
      console.log('child exists with code: ' + code);
      if (!that.running) return;
      setTimeout(() => {
        console.log('restart');
        that.process[index] = that.createProcess(source, index, path);
      }, 1000);
    });

    return exec;
  }

  run() {
    if (!this.config || !this.config.ffmpeg || !this.config.sources || !this.config.dest) return;
    this.config.sources.forEach((source, index) => {
        const path = this.config.dest + '/' + source.id;
      mkdirp.sync(path);
      // 启动转码进程
      this.process[index] = this.createProcess(source.url, index, path);
    });
  }

  stop() {
    this.running = false;
    this.process.forEach(p => {
      p.kill();
    });
  }

}
module.exports = VideoServer;
