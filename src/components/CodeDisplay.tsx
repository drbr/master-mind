import { CodeColor, CodeColors } from '../logic/colors';

type CodeDisplayProps = {
  code: [CodeColor, CodeColor, CodeColor, CodeColor];
};

export function CodeDisplay(props: CodeDisplayProps) {
  return <div className="code-row">{props.code.map((x) => renderPeg(x))}</div>;
}

function renderPeg(color: CodeColor) {
  const backgroundColor = CodeColors[color];
  return (
    <div key={color} className="code-peg" style={{ backgroundColor }}></div>
  );
}
