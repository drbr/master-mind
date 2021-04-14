import React from 'react';
import { StaticCodeRow, EditableCodeRow } from './components/CodeRow';
import { ColorPalette } from './components/ColorPalette';
import {
  codeEditorStateMachine,
  getInitialCodeEditorState,
} from './stateMachines/codeEditorStateMachine';
import {
  gameStateMachine,
  initialGameState,
} from './stateMachines/gameStateMachine';
import { useStateMachineReducer } from './stateMachines/useStateMachineReducer';
import { cssClass } from './styleFunctions';

function App() {
  const [gameState, dispatchToGame] = useStateMachineReducer(
    gameStateMachine,
    initialGameState
  );

  const [codeEditorState, dispatchToCodeEditor] = useStateMachineReducer(
    codeEditorStateMachine,
    getInitialCodeEditorState({ codeLength: 4 })
  );

  return (
    <div className={AppClass}>
      <div className={CodeList}>
        {gameState.codes.map((code, i) => (
          <StaticCodeRow
            key={i}
            code={code}
            response={{ black: 1, white: 1 }}
          />
        ))}
        <EditableCodeRow
          code={codeEditorState.code}
          currentPegIndex={codeEditorState.currentPegIndex}
          dispatchToCodeEditor={dispatchToCodeEditor}
          dispatchToGame={dispatchToGame}
        />
      </div>
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
});

const CodeList = cssClass('CodeList', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column-reverse',
  justifyContent: 'flex-start',
});

export default App;
