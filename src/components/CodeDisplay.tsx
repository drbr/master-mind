import { CodeColor } from '../logic/colors';
import { CodePeg, CodeRow, pegGradient } from './CodeDisplayStyles';

type CodeDisplayProps = {
  code: [CodeColor, CodeColor, CodeColor, CodeColor];
};

export function CodeDisplay(props: CodeDisplayProps) {
  return <div className={CodeRow}>{props.code.map((x) => renderPeg(x))}</div>;
}

function renderPeg(color: CodeColor) {
  return <div key={color} className={CodePeg} style={pegGradient(color)}></div>;
}
