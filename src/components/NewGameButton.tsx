import { useEffect, useRef } from 'react';
import { cssClass } from '../styleFunctions';
import { GameStateProps } from '../types/GameStateProps';

export function NewGameButton(props: GameStateProps) {
  const newGameButtonRef = useRef<HTMLButtonElement>(null);

  // Focus the New Game button when it appears (but not the Give Up button)
  useEffect(() => {
    if (newGameButtonRef.current) {
      newGameButtonRef.current.focus();
    }
  }, []);

  const button =
    props.gameState.name === 'unsolved' ? (
      <button
        className={NewGameButtonClass}
        onClick={() => props.dispatchToGame({ type: 'giveUp' })}
      >
        Give up
      </button>
    ) : props.gameState.name === 'finished' ? (
      <button
        ref={newGameButtonRef}
        className={NewGameButtonClass}
        onClick={() => props.dispatchToGame({ type: 'newGame' })}
      >
        New game
      </button>
    ) : null;

  return <div>{button}</div>;
}

const NewGameButtonClass = cssClass('NewGameButton', {
  height: 40,
  margin: '10px 0',
  padding: '0 20px',
  borderRadius: 10,
  border: 'none',
  boxShadow: '0 1px 7px rgba(0, 0, 0, 0.3)',
  $nest: {
    '&:focus': {
      outline: 'none',
      border: '2px solid #0096FF',
    },
  },
  fontWeight: 'bold',
});
