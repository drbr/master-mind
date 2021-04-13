import React from 'react';
import './App.css';
import { CodeRow } from './components/CodeRow';

function App() {
  return (
    <div className="App">
      <CodeRow
        code={['P', 'P', 'W', 'W']}
        response={{ black: 1, white: 2 }}
        static={false}
      />
      <CodeRow code={['B', 'G', 'R', 'G']} static={true} />
      <CodeRow
        code={['Y', 'Y', null, null]}
        response={{ black: 2, white: 1 }}
        static={false}
      />
    </div>
  );
}

export default App;
