import React from 'react'
import ReactDOM from 'react-dom'
import Home from './components/Home'

import registerServiceWorker from './registerServiceWorker'

const content = document.getElementById('content')

ReactDOM.render(<Home/>, content)

registerServiceWorker()