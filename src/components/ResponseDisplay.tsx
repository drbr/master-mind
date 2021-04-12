import { GuessResponse } from '../logic/CodeTypes';
import { ResponseColor } from '../logic/colors';
import { cssClass } from '../styleFunctions';

export type ResponseDisplayProps = {
  response?: GuessResponse;
};

export function ResponseDisplay(props: ResponseDisplayProps) {
  return (
    <div className={ResponseDisplayClass}>
      {renderDot()}
      {renderDot()}
      {renderResponsePeg('white')}
      {renderResponsePeg('black')}
    </div>
  );
}

function renderDot() {
  return <div className={DotClass} />;
}

function renderResponsePeg(color: ResponseColor) {
  return (
    <div className={ResponsePegClass} style={{ backgroundColor: color }} />
  );
}

const ResponseDisplayClass = cssClass('ResponseDisplay', {
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  gridTemplateRows: '50% 50%',
  width: 42,
  height: 42,
  marginTop: 2, // to look even with the code pegs' drop shadow
  marginRight: 10,
  alignItems: 'center',
  justifyItems: 'center',
});

const DotClass = cssClass('Dot', {
  borderRadius: '50%',
  width: 5,
  height: 5,
  backgroundColor: 'black',
  opacity: 0.2,
});

const ResponsePegClass = cssClass('ResponsePeg', {
  borderRadius: '50%',
  width: 10,
  height: 10,
});
