import React from 'react';
import './App.css';
import { StaticCodeRow, EditableCodeRow } from './components/CodeRow';

function App() {
  return (
    <div className="App">
      <EditableCodeRow code={['P', 'P', 'W', 'W']} />
      <StaticCodeRow
        code={['B', 'G', 'R', 'G']}
        response={{ black: 2, white: 1 }}
      />
      <EditableCodeRow code={['Y', 'Y', null, null]} />
    </div>
  );
}

export default App;
