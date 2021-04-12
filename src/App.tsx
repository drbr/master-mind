import React from 'react';
import './App.css';
import { CodeDisplay } from './components/CodeDisplay';

function App() {
  return (
    <div className="App">
      <CodeDisplay code={['B', 'W', 'P', 'G']} />
    </div>
  );
}

export default App;
