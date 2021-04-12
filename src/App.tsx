import React from 'react';
import './App.css';
import { CodeRow } from './components/CodeRow';

function App() {
  return (
    <div className="App">
      <CodeRow code={['P', 'P', 'W', 'W']} />
      <CodeRow code={['R', 'R', 'G', 'G']} />
      <CodeRow code={['Y', 'Y', 'B', 'B']} />
    </div>
  );
}

export default App;
