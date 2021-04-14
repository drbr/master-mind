import { Code, GuessResponse } from '../logic/CodeTypes';
import { computeResponse } from '../logic/computeResponse';
import { StateMachineObject } from './useStateMachineReducer';

export type GameState = {
  readonly name: 'unsolved' | 'solved';
  readonly answer: Code;
  readonly codesAndResponses: ReadonlyArray<{
    readonly code: Code;
    readonly response: GuessResponse;
  }>;
};

export type GameAction = {
  readonly type: 'submitGuess';
  readonly code: Code;
};

export const initialGameState: GameState = {
  name: 'unsolved',
  answer: ['B', 'R', 'G', 'R'],
  codesAndResponses: [],
};

export const gameStateMachine: StateMachineObject<GameState, GameAction> = {
  unsolved: {
    submitGuess: (prev, action) => {
      const response = computeResponse({
        guess: action.code,
        answer: prev.answer,
      });

      return {
        ...prev,
        codesAndResponses: [
          ...prev.codesAndResponses,
          { code: action.code, response },
        ],
      };
    },
  },
  solved: {},
};
