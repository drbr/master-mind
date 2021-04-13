import { forwardRef } from 'react';
import { CodeColor, CodeColorsLight, CodeColorsDark } from '../logic/colors';
import { classes, cssClass } from '../styleFunctions';

export type CodePegProps = {
  color: CodeColor | null;
  static: boolean;
  current?: boolean;
};

export const CodePeg = forwardRef<HTMLButtonElement, CodePegProps>(
  function CodePeg(props, ref) {
    const currentClass = props.current ? 'current' : undefined;

    if (props.color) {
      return (
        <button
          ref={ref}
          disabled={props.static}
          className={classes(CodePegClass, currentClass)}
          style={pegGradient(props.color)}
        />
      );
    } else {
      return (
        <button
          ref={ref}
          disabled={props.static}
          className={classes(CodePegClass, EmptyCodePegClass, currentClass)}
        />
      );
    }
  }
);

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
    '&.current': {
      border: '3px dashed black',
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
