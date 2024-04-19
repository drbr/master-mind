import { Dispatch } from 'react';
import { GameState, GameAction } from '../stateMachines/gameStateMachine';

export type GameStateProps = {
  gameState: GameState;
  dispatchToGame: Dispatch<GameAction>;
};
