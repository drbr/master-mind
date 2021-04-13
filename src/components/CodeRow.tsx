import React from 'react';
import { PartialCode, GuessResponse, Code } from '../logic/CodeTypes';
import { cssClass } from '../styleFunctions';
import { CodeDisplay } from './CodeDisplay';
import { ResponseDisplay } from './ResponseDisplay';

type StaticCodeRowProps = {
  code: Code;
  response: GuessResponse;
};

type EditableCodeRowProps = {
  code: PartialCode;
};

export function StaticCodeRow(props: StaticCodeRowProps) {
  return (
    <div className={CodeRowClass}>
      <div className={ResponseContainerClass}>
        <ResponseDisplay response={props.response} />
      </div>
      <CodeDisplay static={true} code={props.code} />
    </div>
  );
}

export function EditableCodeRow(props: EditableCodeRowProps) {
  const allFilledIn = props.code.every((x) => x !== null);
  return (
    <div className={CodeRowClass}>
      <div className={ResponseContainerClass}>
        {allFilledIn ? <OKButton /> : <ResponseDisplay />}
      </div>
      <CodeDisplay static={false} code={props.code} />
    </div>
  );
}

function OKButton() {
  return <button className={OKButtonClass}>OK</button>;
}

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
