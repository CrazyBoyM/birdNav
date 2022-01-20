import React from 'react'
import ReactDOM from 'react-dom'
import '@/styles/reset.css'
import '@/styles/var.css'
import '@/styles/public.css'
import '@/styles/index.css'
import App from './App'
import { appVersion } from './store/config'

try {
  let localVersion = JSON.parse(window.localStorage.getItem('version') || '')
  if (localVersion !== appVersion) {
    window.localStorage.clear()
    window.localStorage.setItem('version', appVersion)
  }
} catch (err) {
  console.error(err)
}

ReactDOM.render(
    <App />,
  document.getElementById('root')
)