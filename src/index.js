import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './assets/index.css'
import Screen from './Screens/screen'

ReactDOM.render(
    <BrowserRouter>
        <Screen />
    </BrowserRouter>, document.getElementById("root")
)