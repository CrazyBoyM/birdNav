import React from 'react'
import ReactDOM from 'react-dom'
import '@/styles/reset.css'
import '@/styles/var.css'
import '@/styles/public.css'
import '@/styles/index.css'
import App from './App'
import { localDataUpdate } from './utils/init'

localDataUpdate()

ReactDOM.render(
    <App />,
  document.getElementById('root')
)