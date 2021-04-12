import { CodeColor, CodeColorsDark, CodeColorsLight } from '../logic/colors';
import { cssClass } from '../styleFunctions';

type CodeDisplayProps = {
  code: [CodeColor, CodeColor, CodeColor, CodeColor];
};

export function CodeDisplay(props: CodeDisplayProps) {
  return <div className={CodeRow}>{props.code.map((x) => renderPeg(x))}</div>;
}

function renderPeg(color: CodeColor) {
  return <div key={color} className={CodePeg} style={pegGradient(color)}></div>;
}

const CodeRow = cssClass('CodeRow', {
  display: 'flex',
  flexDirection: 'row',
  padding: '15px 20px 15px 20px',
  marginTop: 10,
  borderRadius: 8,
  boxShadow: 'inset 0px 0px 10px rgb(92 52 28)',
});

const CodePeg = cssClass('CodePeg', {
  borderRadius: '50%',
  height: 40,
  width: 40,
  margin: 8,
  filter: 'drop-shadow(0px 1px 3px #444)',
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
