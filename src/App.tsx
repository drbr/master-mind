import React from 'react';
import './App.css';
import { CodeDisplay } from './components/CodeDisplay';

function App() {
  return (
    <div className="App">
      <CodeDisplay code={['P', 'P', 'W', 'W']} />
      <CodeDisplay code={['R', 'R', 'G', 'G']} />
      <CodeDisplay code={['Y', 'Y', 'B', 'B']} />
    </div>
  );
}

export default App;
