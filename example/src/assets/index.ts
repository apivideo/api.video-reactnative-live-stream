export default {
  sections: {
    video: {
      Resolution: {
        type: 'list',
        data: ['240p', '360p', '480p', '720p', '1080p'],
      },
      Framerate: {
        type: 'list',
        data: [24, 30, 60],
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
