import { Code } from '../logic/CodeTypes';
import { CodeColor, CodeColorsDark, CodeColorsLight } from '../logic/colors';
import { cssClass } from '../styleFunctions';

export type CodeProps = {
  code: Code;
};

export function CodeDisplay(props: CodeProps) {
  return <div className={CodeClass}>{props.code.map((x) => renderPeg(x))}</div>;
}

function renderPeg(color: CodeColor) {
  return (
    <div key={color} className={CodePegClass} style={pegGradient(color)} />
  );
}

const CodeClass = cssClass('Code', {
  display: 'flex',
  flexDirection: 'row',
});

const CodePegClass = cssClass('CodePeg', {
  borderRadius: '50%',
  height: 40,
  width: 40,
  margin: 8,
  filter: 'drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.3))',
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
