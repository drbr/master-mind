import React, {
  Dispatch,
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
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
  index: number;
  code: Code;
  response: GuessResponse;
};

type EditableCodeRowProps = Pick<
  CodeEditorState,
  'code' | 'currentPegIndex'
> & {
  index: number;
  dispatchToCodeEditor: Dispatch<CodeEditorAction>;
  dispatchToGame: Dispatch<GameAction>;
};

type CodeRowLayoutProps = {
  index: number;
  responseArea: ReactNode;
  codeArea: ReactNode;
};

const CodeRowLayout = forwardRef<HTMLDivElement, CodeRowLayoutProps>(
  function CodeRowLayout(props, ref) {
    return (
      <div ref={ref} className={CodeRowContainerClass}>
        <label className={CodeRowIndexLabelClass}>{props.index}</label>
        <div className={CodeRowClass}>
          <div className={ResponseContainerClass}>{props.responseArea}</div>
          {props.codeArea}
        </div>
      </div>
    );
  }
);

export function StaticCodeRow(props: StaticCodeRowProps) {
  return (
    <CodeRowLayout
      index={props.index}
      responseArea={<ResponseDisplay response={props.response} />}
      codeArea={<StaticCodeDisplay code={props.code} />}
    />
  );
}

export const EditableCodeRow = forwardRef<HTMLDivElement, EditableCodeRowProps>(
  function EditableCodeRow(props, ref) {
    const okButtonRef = useRef<HTMLButtonElement>(null);
    const showOKButton = props.code.every((x) => x !== null);

    // Focus the OK button when it appears
    useEffect(() => {
      if (showOKButton && okButtonRef.current) {
        okButtonRef.current.focus();
      }
    }, [showOKButton]);

    const responseArea = showOKButton ? (
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
    );

    const codeArea = (
      <EditableCodeDisplay
        code={props.code}
        currentPegIndex={props.currentPegIndex}
        dispatch={props.dispatchToCodeEditor}
      />
    );

    return (
      <CodeRowLayout
        ref={ref}
        index={props.index}
        responseArea={responseArea}
        codeArea={codeArea}
      />
    );
  }
);

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

const CodeRowContainerClass = cssClass('CodeRowContainer', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  paddingTop: 10,
  paddingLeft: 10,
  paddingRight: 20,
  $nest: {
    '&:first-child': {
      paddingBottom: 10,
    },
  },
});

const CodeRowIndexLabelClass = cssClass('CodeRowIndexLabel', {
  color: 'rgba(0, 0, 0, 0.4)',
  fontSize: '42px',
  width: 30,
  textAlign: 'center',
  marginRight: 10,
});

const CodeRowClass = cssClass('CodeRow', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px 15px 10px 15px',
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
