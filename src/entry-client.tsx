import { createRoot, hydrateRoot } from 'react-dom/client'

import { App } from './app'
import './styles.css'

const root = document.getElementById('root')

if (!root) {
  throw new Error('Missing root element')
}

if (root.children.length > 0) {
  hydrateRoot(root, <App />)
} else {
  createRoot(root).render(<App />)
}
