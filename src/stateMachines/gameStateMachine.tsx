import * as _ from 'lodash';
import { Code, GuessResponse } from '../logic/CodeTypes';
import { computeResponse } from '../logic/computeResponse';
import { randomCode } from '../logic/randomCode';
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

export function getInitialGameState({
  codeLength,
}: {
  codeLength: number;
}): GameState {
  return {
    name: 'unsolved',
    answer: randomCode(codeLength),
    codesAndResponses: [],
  };
}

export const gameStateMachine: StateMachineObject<GameState, GameAction> = {
  unsolved: {
    submitGuess: (prev, action) => {
      const response = computeResponse({
        guess: action.code,
        answer: prev.answer,
      });

      const nextState: GameState['name'] = _.isEqual(action.code, prev.answer)
        ? 'solved'
        : 'unsolved';

      return {
        name: nextState,
        answer: prev.answer,
        codesAndResponses: [
          ...prev.codesAndResponses,
          { code: action.code, response },
        ],
      };
    },
  },
  solved: {},
};
