import React from 'react';
import './App.css';
import { StaticCodeRow, EditableCodeRow } from './components/CodeRow';

function App() {
  return (
    <div className="App">
      <EditableCodeRow code={['P', null, 'W', null]} />
      <StaticCodeRow
        code={['B', 'G', 'R', 'G']}
        response={{ black: 2, white: 1 }}
      />
      <StaticCodeRow
        code={['Y', 'Y', 'B', 'P']}
        response={{ black: 2, white: 2 }}
      />
    </div>
  );
}

export default App;
