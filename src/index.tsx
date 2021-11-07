import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Game } from './game/Game';
import reportWebVitals from './reportWebVitals';

function setViewportScaleForSmallDevices() {
  const siteWidth = 376; // measured from actual static widths
  const windowWidth = window.screen.width;
  var scale = Math.min(windowWidth / siteWidth, 1.0);

  document
    .querySelector('meta[name="viewport"]')!
    .setAttribute(
      'content',
      `width=device-width, initial-scale=${scale}, maximum-scale=${scale}, user-scalable=no`
    );
}

setViewportScaleForSmallDevices();

ReactDOM.render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
