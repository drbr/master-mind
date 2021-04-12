import { render } from '@testing-library/react';
import { GuessResponse } from '../logic/CodeTypes';
import { cssClass } from '../styleFunctions';

export type ResponseDisplayProps = {
  response?: GuessResponse;
};

export function ResponseDisplay(props: ResponseDisplayProps) {
  return (
    <div className={ResponseDisplayClass}>
      {renderDot()}
      {renderDot()}
      {renderDot()}
      {renderDot()}
    </div>
  );
}

function renderDot() {
  return <div className={DotClass} />;
}

const ResponseDisplayClass = cssClass('ResponseDisplay', {
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  gridTemplateRows: '50% 50%',
  width: 42,
  height: 42,
  marginTop: 2, // to look even with the code pegs' drop shadow
  marginRight: 10,
});

const DotClass = cssClass('Dot', {
  borderRadius: '50%',
  width: 5,
  height: 5,
  backgroundColor: 'black',
  opacity: 0.3,
  alignSelf: 'center',
  justifySelf: 'center',
});
