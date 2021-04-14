import { PartialCode } from '../logic/CodeTypes';
import { CodeColor } from '../logic/colors';
import { StateMachineObject } from './useStateMachineReducer';

export type CodeEditorState = {
  readonly name: 'editing';
  readonly codeLength: number;
  readonly code: PartialCode;
  readonly currentPegIndex: number | null;
};

export type CodeEditorAction =
  | {
      readonly type: 'putColor';
      readonly index?: number;
      readonly color: CodeColor;
    }
  | {
      readonly type: 'removeColor';
      readonly index?: number;
    }
  | {
      readonly type: 'setPegIndex';
      readonly index: number;
    };

export function getInitialCodeEditorState(params: {
  codeLength: number;
}): CodeEditorState {
  return {
    name: 'editing',
    codeLength: params.codeLength,
    code: Array.from(new Array(params.codeLength)).map((_) => null),
    currentPegIndex: 0,
  };
}

export const codeEditorStateMachine: StateMachineObject<
  CodeEditorState,
  CodeEditorAction
> = {
  editing: {
    putColor: (prev, action) => {
      const index = action.index ?? prev.currentPegIndex;
      if (index === null) {
        return prev;
      }

      const nextCode = updateCode(prev, { index, color: action.color });
      const nextIndex = nextPegIndex(nextCode, prev.codeLength, index);
      return {
        ...prev,
        code: nextCode,
        currentPegIndex: nextIndex,
      };
    },

    removeColor: (prev, action) => {
      const index = action.index ?? prev.currentPegIndex;
      if (index === null) {
        return prev;
      }

      const nextCode = updateCode(prev, { index, color: null });
      return {
        ...prev,
        code: nextCode,
        currentPegIndex: index,
      };
    },

    setPegIndex: (prev, action) => {
      return {
        ...prev,
        currentPegIndex: action.index,
      };
    },
  },
};

/**
 * Returns an incremented peg index. Chooses the next index with no peg color,
 * wrapping around to the beginning of the code if necessary. If all the pegs
 * are filled, returns null.
 */
function nextPegIndex(
  code: PartialCode,
  codeLength: number,
  originalIndex: number
): number | null {
  let nextIndex = originalIndex;
  do {
    nextIndex = (nextIndex + 1) % codeLength;
    const pegAtIndex = code[nextIndex];
    if (!pegAtIndex) {
      return nextIndex;
    }
  } while (nextIndex !== originalIndex);
  return null;
}

function updateCode(
  prevState: CodeEditorState,
  ...replacements: { index: number; color: CodeColor | null }[]
): PartialCode {
  const mutableCode = [...prevState.code];
  for (const r of replacements) {
    if (r.index >= 0 && r.index < prevState.codeLength) {
      mutableCode[r.index] = r.color;
    }
  }
  return mutableCode;
}
