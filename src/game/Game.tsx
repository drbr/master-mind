import React, { Dispatch } from 'react';
import { StaticCodeRow, EditableCodeRow } from '../components/CodeRow';
import { ColorPalette } from '../components/ColorPalette';
import {
  codeEditorStateMachine,
  getInitialCodeEditorState,
} from '../stateMachines/codeEditorStateMachine';
import {
  GameAction,
  GameState,
  gameStateMachine,
  getInitialGameState,
} from '../stateMachines/gameStateMachine';
import { useStateMachineReducer } from '../stateMachines/useStateMachineReducer';
import { cssClass } from '../styleFunctions';

const CODE_LENGTH = 4;

export function Game() {
  const [gameState, dispatchToGame] = useStateMachineReducer(
    gameStateMachine,
    getInitialGameState({ codeLength: CODE_LENGTH })
  );

  // Every time a new code gets added, reïnitialize the component that
  // keeps the code editor state
  return (
    <CodeListAndEditor
      key={gameState.codesAndResponses.length}
      gameState={gameState}
      dispatchToGame={dispatchToGame}
    />
  );
}

type CodeListAndEditorProps = {
  gameState: GameState;
  dispatchToGame: Dispatch<GameAction>;
};

function CodeListAndEditor(props: CodeListAndEditorProps) {
  const [codeEditorState, dispatchToCodeEditor] = useStateMachineReducer(
    codeEditorStateMachine,
    getInitialCodeEditorState({ codeLength: CODE_LENGTH })
  );

  return (
    <div className={AppClass}>
      <div className={CodeListClass}>
        {props.gameState.codesAndResponses.map(({ code, response }, i) => (
          <StaticCodeRow
            key={i}
            index={i + 1}
            code={code}
            response={response}
          />
        ))}
        <EditableCodeRow
          index={props.gameState.codesAndResponses.length + 1}
          code={codeEditorState.code}
          currentPegIndex={codeEditorState.currentPegIndex}
          dispatchToCodeEditor={dispatchToCodeEditor}
          dispatchToGame={props.dispatchToGame}
        />
      </div>
      <ColorPalette dispatch={dispatchToCodeEditor} />
    </div>
  );
}

const AppClass = cssClass('App', {
  backgroundColor: 'rgb(141, 86, 47)',
  minHeight: '100vh',
  maxHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const CodeListClass = cssClass('CodeList', {
  flex: 1,
  display: 'flex',
  overflowY: 'auto',
  flexDirection: 'column-reverse',
  justifyContent: 'flex-start',
});
