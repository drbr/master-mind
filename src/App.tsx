import React from 'react';
import './App.css';
import { CodeRow } from './components/CodeRow';

function App() {
  return (
    <div className="App">
      <CodeRow code={['P', 'P', 'W', 'W']} response={{ black: 1, white: 1 }} />
      <CodeRow code={['R', 'R', 'G', 'G']} response={{ black: 0, white: 2 }} />
      <CodeRow code={['Y', 'Y', null]} response={{ black: 2, white: 1 }} />
    </div>
  );
}

export default App;
