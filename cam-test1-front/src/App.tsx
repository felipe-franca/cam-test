import { useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import JSMpeg from '@cycjimmy/jsmpeg-player'
import './App.css'
import axios from 'axios'

function App() {
  const [currentStream, setSetCurrentStream] = useState<string>('');
  const [player, setPlayer] = useState(null);

  function stream () {
    if (player) player.destroy();
    if (document.querySelector('#video-element > canvas')) return;

    const options = {
      url: `http://localhost:3001/stream/${currentStream}`
    }

    axios(options).then((res) => {
      const videiourl = `ws://localhost:9999`;

      console.log(videiourl)

      const pl = new JSMpeg.VideoElement('#video-element', videiourl, {
        autoplay: true
      })

      setPlayer(pl)

      console.log(player);
    }).catch(er => {
      console.log(er)
    })
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div style={{display: 'flex', flexDirection: 'row', gap: '24px', justifyContent: 'center'}}>
        <select style={{ cursor: 'pointer', padding: '8px', borderRadius: '8px' }}
          onChange={(e) => setSetCurrentStream(e.target.value)}>
          <option value="192.168.200.160">Cam1 Extern</option>
          <option value="192.168.200.185">Cam1 Intern</option>
        </select>

        <button onClick={() => stream()}>Stream</button>
    </div>
      <h1>Vite + React</h1>
      <div className="card">
        <div id="video-element" style={{ height: "613px", width: "1090px" }}></div>
      </div>
      <p className="read-the-docs">
        Streaming webRTC
      </p>
    </>
  )
}

export default App
