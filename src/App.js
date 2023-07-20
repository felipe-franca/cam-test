const express = require('express');
const rtspStream = require('node-rtsp-stream');
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }))

let stream;

app.get('/stream/:ip', (req, res) => {
  const { ip } = req.params;

  if (stream) {
    stream.stop()
  }

  if (!ip) {
    return res.status(400).json({ error: 'Ip não informado' });
  }

  const rtspOptions = {
    name: 'streamName',
    streamUrl:
      `rtsp://wps:wpsbrasil2021@${ip}:554/cam/realmonitor?channel=1&subtype=0`,
    wsPort: 9999,
    ffmpegOptions: {
      '-stats': '',
      '-r': 30,
    },
  };

  console.log(rtspOptions);

  stream = new rtspStream(rtspOptions);

  return res.send(`ok: ${stream.name}`)
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Servidor Node.js rodando na porta ${port}`);
});
