import { forwardRef, useEffect, useRef, useState } from 'react';
import { PartialCode } from '../logic/CodeTypes';
import { CodeColor, CodeColorsDark, CodeColorsLight } from '../logic/colors';
import { classes, cssClass } from '../styleFunctions';

export type CodeProps = {
  static: boolean;
  code: PartialCode;
};

export function CodeDisplay(props: CodeProps) {
  const pegRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [currentPegIndex, setCurrentPegIndex] = useState(0);

  useEffect(() => {
    const pegToFocus = pegRefs.current[currentPegIndex];
    if (pegToFocus) {
      pegToFocus.focus();
    }
  }, [currentPegIndex]);

  (window as any).focusPeg = setCurrentPegIndex;

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
          static={props.static}
        />
      ))}
    </div>
  );
}

type CodePegProps = {
  color: CodeColor | null;
  static: boolean;
};

const CodePeg = forwardRef<HTMLButtonElement, CodePegProps>(function CodePeg(
  props,
  ref
) {
  if (props.color) {
    return (
      <button
        ref={ref}
        disabled={props.static}
        className={CodePegClass}
        style={pegGradient(props.color)}
      />
    );
  } else {
    return (
      <button
        ref={ref}
        disabled={props.static}
        className={classes(CodePegClass, EmptyCodePegClass)}
      />
    );
  }
});

const CodeClass = cssClass('Code', {
  display: 'flex',
  flexDirection: 'row',
});

const CodePegClass = cssClass('CodePeg', {
  borderRadius: '50%',
  height: 40,
  width: 40,
  margin: 8,
  background: 'none',
  border: 'none',
  outline: 'none',
  filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3))',
  $nest: {
    '&:focus': {
      border: '3px solid #0096FF',
    },
  },
});

const EmptyCodePegClass = cssClass('EmptyCodePeg', {
  boxShadow: 'inset 0px -2px 24px rgba(0, 0, 0, 0.25)',
});

function pegGradient(color: CodeColor): React.CSSProperties {
  const lightColor = CodeColorsLight[color];
  const darkColor = CodeColorsDark[color];

  // I have no idea what I'm doing with gradients. As a starting point, I used
  // examples from: https://cssanimation.rocks/spheres/
  return {
    background: `radial-gradient(circle at 25px 15px, ${lightColor}, ${darkColor})`,
  };
}
