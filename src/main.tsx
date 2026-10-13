import { createRoot } from 'react-dom/client'
import '@fontsource-variable/hubot-sans/standard.css'
import '@fontsource-variable/mona-sans/standard.css'
import '@fontsource-variable/martian-mono/standard.css'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(<App />) // no StrictMode: its double effect run loses the WebGL contexts the React Bits fields reuse
