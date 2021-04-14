import React from 'react';
import { StaticCodeRow, EditableCodeRow } from './components/CodeRow';
import { ColorPalette } from './components/ColorPalette';
import {
  codeEditorStateMachine,
  getCodeEditorInitialState,
} from './stateMachines/codeEditorStateMachine';
import { useStateMachineReducer } from './stateMachines/useStateMachineReducer';
import { cssClass } from './styleFunctions';

function App() {
  const [codeEditorState, dispatchToCodeEditor] = useStateMachineReducer(
    codeEditorStateMachine,
    getCodeEditorInitialState({ codeLength: 4 })
  );

  return (
    <div className={AppClass}>
      <StaticCodeRow
        code={['B', 'G', 'R', 'G']}
        response={{ black: 2, white: 1 }}
      />
      <EditableCodeRow
        code={codeEditorState.code}
        currentPegIndex={codeEditorState.currentPegIndex}
        dispatch={dispatchToCodeEditor}
      />
      <ColorPalette dispatch={dispatchToCodeEditor} />
    </div>
  );
}

const AppClass = cssClass('App', {
  backgroundColor: 'rgb(141, 86, 47)',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export default App;
