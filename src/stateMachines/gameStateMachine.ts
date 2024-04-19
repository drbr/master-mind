import * as _ from 'lodash';
import { Code, GuessResponse } from '../logic/CodeTypes';
import { computeResponse } from '../logic/computeResponse';
import { randomCode } from '../logic/randomCode';
import { StateMachineObject } from './useStateMachineReducer';

export type GameState = {
  readonly name: 'unsolved' | 'finished';
  readonly answer: Code;
  readonly codesAndResponses: ReadonlyArray<{
    readonly code: Code;
    readonly response: GuessResponse;
  }>;
  readonly gaveUp: boolean;
};

export type GameAction =
  | {
      readonly type: 'submitGuess';
      readonly code: Code;
    }
  | {
      readonly type: 'giveUp';
    }
  | {
      readonly type: 'newGame';
    };

export function getInitialGameState({ codeLength }: { codeLength: number }): GameState {
  return {
    name: 'unsolved',
    answer: randomCode(codeLength),
    codesAndResponses: [],
    gaveUp: false,
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
        ? 'finished'
        : 'unsolved';

      return {
        ...prev,
        name: nextState,
        codesAndResponses: [...prev.codesAndResponses, { code: action.code, response }],
      };
    },
    giveUp: (prev) => ({
      ...prev,
      name: 'finished',
      gaveUp: true,
    }),
  },
  finished: {
    newGame: (prev) => getInitialGameState({ codeLength: prev.answer.length }),
  },
};
