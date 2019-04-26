import React from 'react'
import ReactDOM from 'react-dom'
import App from 'components/App'
import { connectToServer } from 'server'

connectToServer()
ReactDOM.render(<App />, document.getElementById('root'))
