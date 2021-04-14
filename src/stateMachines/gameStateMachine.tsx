import { Code } from '../logic/CodeTypes';
import { StateMachineObject } from './useStateMachineReducer';

export type GameState = {
  readonly name: 'unsolved' | 'solved';
  readonly codes: ReadonlyArray<Code>;
};

export type GameAction = {
  readonly type: 'submitGuess';
  readonly code: Code;
};

export const initialGameState: GameState = {
  name: 'unsolved',
  codes: [],
};

export const gameStateMachine: StateMachineObject<GameState, GameAction> = {
  unsolved: {
    submitGuess: (prev, action) => {
      return {
        ...prev,
        codes: [...prev.codes, action.code],
      };
    },
  },
  solved: {},
};
