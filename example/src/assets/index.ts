export default {
  sections: {
    video: {
      Resolution: {
        type: 'list',
        data: [
          '352x240',
          '640x360',
          '858x480',
          '1280x720',
          '1920x1080',
          '3860x2160',
        ],
      },
      Framerate: {
        type: 'list',
        data: [24, 30, 60, 120],
      },
      Bitrate: {
        type: 'slider',
        min: 500,
        max: 10000,
      },
    },
    audio: {
      Bitrate: {
        type: 'list',
        data: ['24Kbps', '64Kbps', '128Kbps', '192Kbps'],
      },
    },
    endpoint: {
      'RTMP endpoint': {
        type: 'input',
        value: 'rtmp://broadcast.api.video/s',
      },
      'Stream key': {
        type: 'input',
        value: '',
      },
    },
  },
};
