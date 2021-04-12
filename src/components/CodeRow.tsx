import React from 'react';
import { Code, GuessResponse } from '../logic/CodeTypes';
import { cssClass } from '../styleFunctions';
import { CodeDisplay } from './CodeDisplay';
import { ResponseDisplay } from './ResponseDisplay';

type CodeRowProps = {
  code: Code;
  response?: GuessResponse;
};

export function CodeRow(props: CodeRowProps) {
  return (
    <div className={CodeRowClass}>
      <ResponseDisplay response={props.response} />
      <CodeDisplay code={props.code} />
    </div>
  );
}

const CodeRowClass = cssClass('CodeRow', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px 15px 10px 15px',
  marginTop: 10,
  borderRadius: 8,
  boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.4)',
});
