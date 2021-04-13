import React, { useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    const currentPeg = pegRefs.current[currentPegIndex];
    if (currentPeg) {
      currentPeg.focus();
    }
  }, [currentPegIndex]);

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setCurrentPegIndex(i++ % 4);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  function setRef(i: number, el: HTMLButtonElement | null) {
    pegRefs.current[i] = el;
  }

  return (
    <div className={CodeClass}>
      {props.code.map((x, i) => (
        <CodePeg ref={(el) => setRef(i, el)} key={i} color={x} static={false} />
      ))}
    </div>
  );
}

const CodeClass = cssClass('Code', {
  display: 'flex',
  flexDirection: 'row',
});
