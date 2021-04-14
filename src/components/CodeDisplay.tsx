import React, { Dispatch, useRef, useState } from 'react';
import { Code, PartialCode } from '../logic/CodeTypes';
import {
  EditCodeAction,
  EditCodeState,
} from '../stateMachines/editCodeStateMachine';
import { cssClass } from '../styleFunctions';
import { CodePeg } from './CodePeg';

export function StaticCodeDisplay(props: { code: Code }) {
  return (
    <div className={CodeClass}>
      {props.code.map((color, i) => (
        <CodePeg key={i} color={color} />
      ))}
    </div>
  );
}

type EditableCodeDisplayProps = Pick<
  EditCodeState,
  'code' | 'currentPegIndex'
> & {
  dispatch: Dispatch<EditCodeAction>;
};

export function EditableCodeDisplay(props: EditableCodeDisplayProps) {
  return (
    <div className={CodeClass}>
      {props.code.map((color, i) => (
        <CodePeg
          key={i}
          color={color}
          onClick={() =>
            props.dispatch({
              type: color ? 'removeColor' : 'setPegIndex',
              index: i,
            })
          }
          current={props.currentPegIndex === i}
        />
      ))}
    </div>
  );
}

const CodeClass = cssClass('Code', {
  display: 'flex',
  flexDirection: 'row',
});
