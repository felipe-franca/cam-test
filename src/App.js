const express = require('express');
const rtspStream = require('node-rtsp-stream');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }))

app.get('/stream/:ip', (req, res) => {
  const { ip } = req.params;
  const { ws_port } = req.query;

  if (!ip || !ws_port) {
    return res.status(400).json({ error: 'Ip ou porta não informado' });
  }

  const rtspOptions = {
    name: `stream_${ip}`,
    streamUrl: `rtsp://wps:wpsbrasil2021@${ip}:554/cam/realmonitor?channel=1&subtype=0`,
    wsPort: ws_port,
    ffmpegOptions: {
      '-stats': '',
      '-r': 30,
      // '-codec:v': 'h264', // video output format
    },
  };

  let stream = new rtspStream(rtspOptions);

  res.send(`ok: ${stream.name}`);

  setTimeout(() => {
      for (let client of stream.wsServer.clients) {
        console.log()
        console.log(client._events.close.length)
        console.log()

        client.on('close', () => {
          console.log('client closed');
          stream.stop();
          stream.mpeg1Muxer.emit('exit');
        });
      }

  }, 2000);
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
