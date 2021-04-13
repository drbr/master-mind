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
      <EditableCodeRow code={['Y', 'Y', 'B', 'P']} />
    </div>
  );
}

export default App;
