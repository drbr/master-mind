import React, { Dispatch, forwardRef, useEffect, useRef } from 'react';
import { GuessResponse, Code } from '../logic/CodeTypes';
import {
  CodeEditorAction,
  CodeEditorState,
} from '../stateMachines/codeEditorStateMachine';
import { GameAction } from '../stateMachines/gameStateMachine';
import { cssClass } from '../styleFunctions';
import { StaticCodeDisplay, EditableCodeDisplay } from './CodeDisplay';
import { ResponseDisplay } from './ResponseDisplay';

type StaticCodeRowProps = {
  code: Code;
  response: GuessResponse;
};

type EditableCodeRowProps = Pick<
  CodeEditorState,
  'code' | 'currentPegIndex'
> & {
  dispatchToCodeEditor: Dispatch<CodeEditorAction>;
  dispatchToGame: Dispatch<GameAction>;
};

export function StaticCodeRow(props: StaticCodeRowProps) {
  return (
    <div className={CodeRowClass}>
      <div className={ResponseContainerClass}>
        <ResponseDisplay response={props.response} />
      </div>
      <StaticCodeDisplay code={props.code} />
    </div>
  );
}

export function EditableCodeRow(props: EditableCodeRowProps) {
  const okButtonRef = useRef<HTMLButtonElement>(null);
  const showOKButton = props.code.every((x) => x !== null);

  // Focus the OK button when it appears
  useEffect(() => {
    if (showOKButton && okButtonRef.current) {
      okButtonRef.current.focus();
    }
  }, [showOKButton]);

  return (
    <div className={CodeRowClass}>
      <div className={ResponseContainerClass}>
        {showOKButton ? (
          <OKButton
            ref={okButtonRef}
            onClick={() =>
              props.dispatchToGame({
                type: 'submitGuess',
                code: props.code as Code,
              })
            }
          />
        ) : (
          <ResponseDisplay />
        )}
      </div>
      <EditableCodeDisplay
        code={props.code}
        currentPegIndex={props.currentPegIndex}
        dispatch={props.dispatchToCodeEditor}
      />
    </div>
  );
}

type OKButtonProps = {
  onClick: () => void;
};

const OKButton = forwardRef<HTMLButtonElement, OKButtonProps>(function OKButton(
  props,
  ref
) {
  return (
    <button ref={ref} className={OKButtonClass} onClick={props.onClick}>
      OK
    </button>
  );
});

const OKButtonClass = cssClass('OKButton', {
  width: '100%',
  height: 40,
  borderRadius: 10,
  border: 'none',
  backgroundColor: '#3AD819',
  boxShadow: '0 1px 7px rgba(0, 0, 0, 0.3)',
  $nest: {
    '&:hover': {
      backgroundColor: '#3DE51B',
    },
    '&:focus': {
      backgroundColor: '#3DE51B',
      outline: 'none',
      border: '2px solid #0096FF',
    },
    '&:active': {
      backgroundColor: '#3AD819',
    },
  },
  fontWeight: 'bold',
});

const CodeRowClass = cssClass('CodeRow', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px 15px 10px 15px',
  marginTop: 10,
  borderRadius: 8,
  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.4)',
});

const ResponseContainerClass = cssClass('ResponseContainer', {
  width: 42,
  height: 42,
  marginRight: 10,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
