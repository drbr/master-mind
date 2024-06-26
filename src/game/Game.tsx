import React, { useEffect, useRef } from 'react';
import { StaticCodeRow, EditableCodeRow } from '../components/CodeRow';
import { ColorPalette } from '../components/ColorPalette';
import {
  codeEditorStateMachine,
  getInitialCodeEditorState,
} from '../stateMachines/codeEditorStateMachine';
import { gameStateMachine, getInitialGameState } from '../stateMachines/gameStateMachine';
import { useStateMachineReducer } from '../stateMachines/useStateMachineReducer';
import { cssClass } from '../styleFunctions';
import { NewGameButton } from '../components/NewGameButton';
import { GameStateProps } from '../types/GameStateProps';

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

function CodeListAndEditor(props: GameStateProps) {
  // Because we're rebuilding the scroll container every time an item gets added
  // to it, we want to keep the top always in view. To do this, we use an
  // "invisible" div at the top of the scroll container (the last element,
  // because we're using reverse flex column layout) and scroll that into view
  // whenever the editor has any activity.
  const topOfScroll = useRef<HTMLDivElement>(null);

  const [codeEditorState, dispatchToCodeEditor] = useStateMachineReducer(
    codeEditorStateMachine,
    getInitialCodeEditorState({ codeLength: CODE_LENGTH })
  );

  useEffect(() => {
    if (topOfScroll.current) {
      topOfScroll.current.scrollIntoView();
    }
  }, [codeEditorState]);

  return (
    <div className={AppClass}>
      <NewGameButton gameState={props.gameState} dispatchToGame={props.dispatchToGame} />
      <div className={CodeListClass}>
        {props.gameState.codesAndResponses.map(({ code, response }, i) => (
          <StaticCodeRow key={i + 1} index={i + 1} code={code} response={response} />
        ))}
        {props.gameState.name === 'unsolved' && (
          <EditableCodeRow
            index={props.gameState.codesAndResponses.length + 1}
            code={codeEditorState.code}
            currentPegIndex={codeEditorState.currentPegIndex}
            dispatchToCodeEditor={dispatchToCodeEditor}
            dispatchToGame={props.dispatchToGame}
          />
        )}
        {props.gameState.gaveUp && (
          <StaticCodeRow index="" code={props.gameState.answer} response={{ black: 4, white: 0 }} />
        )}
        <div ref={topOfScroll}></div>
      </div>
      <ColorPalette dispatch={dispatchToCodeEditor} />
    </div>
  );
}

const AppClass = cssClass('App', {
  backgroundColor: 'rgb(141, 86, 47)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const CodeListClass = cssClass('CodeList', {
  flex: 1,
  display: 'flex',
  overflowY: 'auto',
  '-webkit-overflow-scrolling': 'touch',
  flexDirection: 'column-reverse',
  justifyContent: 'flex-start',
});
