const VideoServer = require('./index');
const config = require('./config');

const vs = new VideoServer();

vs.init(config);

vs.run();

// // 测试停止
// setTimeout(() => {
//   vs.stop();
// }, 10000);
