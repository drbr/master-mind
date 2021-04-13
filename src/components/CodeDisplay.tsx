import React, { useRef, useState } from 'react';
import { Code, PartialCode } from '../logic/CodeTypes';
import { cssClass } from '../styleFunctions';
import { CodePeg } from './CodePeg';

export function StaticCodeDisplay(props: { code: Code }) {
  return (
    <div className={CodeClass}>
      {props.code.map((x, i) => (
        <CodePeg key={i} color={x} static={true} />
      ))}
    </div>
  );
}

export function EditableCodeDisplay(props: { code: PartialCode }) {
  const pegRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [currentPegIndex, setCurrentPegIndex] = useState(0);

  function setRef(i: number, el: HTMLButtonElement | null) {
    pegRefs.current[i] = el;
  }

  return (
    <div className={CodeClass}>
      {props.code.map((x, i) => (
        <CodePeg
          ref={(el) => setRef(i, el)}
          key={i}
          color={x}
          static={false}
          current={currentPegIndex === i}
        />
      ))}
    </div>
  );
}

const CodeClass = cssClass('Code', {
  display: 'flex',
  flexDirection: 'row',
});
