import { cssClass } from '../styleFunctions';
import { GameStateProps } from '../types/GameStateProps';

export function ResetGameButton(props: GameStateProps) {
  const button =
    props.gameState.name === 'unsolved' ? (
      <button
        className={ResetGameButtonClass}
        onClick={() => props.dispatchToGame({ type: 'giveUp' })}
      >
        Give up
      </button>
    ) : props.gameState.name === 'finished' ? (
      <button
        className={ResetGameButtonClass}
        onClick={() => props.dispatchToGame({ type: 'resetGame' })}
      >
        New game
      </button>
    ) : null;

  return (
    <div>
      {button}
      {props.gameState.answer}
    </div>
  );
}

const ResetGameButtonClass = cssClass('ResetGameButton', {
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
