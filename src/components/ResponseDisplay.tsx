import { GuessResponse } from '../logic/CodeTypes';
import { ResponseColor, ResponseColors } from '../logic/colors';
import { cssClass } from '../styleFunctions';

export type ResponseDisplayProps = {
  response?: GuessResponse;
};

export function ResponseDisplay(props: ResponseDisplayProps) {
  const pegs = linearize(props.response);

  return (
    <div className={ResponseDisplayClass}>
      {pegs.map((p, i) => (
        <ResponsePeg key={i} color={p} />
      ))}
    </div>
  );
}

function linearize(
  response?: GuessResponse
): ReadonlyArray<ResponseColor | null> {
  const blacksCount = response?.black ?? 0;
  const whitesCount = response?.white ?? 0;
  const remainingCount = 4 - blacksCount - whitesCount;

  const blacks = Array.from({ length: blacksCount }, () => 'black') as [
    ResponseColor | null
  ];
  const whites = Array.from({ length: whitesCount }, () => 'white') as [
    ResponseColor | null
  ];
  const remaining = Array.from({ length: remainingCount }, () => null);

  return blacks.concat(whites).concat(remaining);
}

function ResponsePeg({ color }: { color: ResponseColor | null }) {
  if (color) {
    const backgroundColor = ResponseColors[color];
    return <div className={ResponsePegClass} style={{ backgroundColor }} />;
  } else {
    return <div className={DotClass} />;
  }
}

const ResponseDisplayClass = cssClass('ResponseDisplay', {
  marginTop: 2, // to look even with the code pegs' drop shadow
  display: 'grid',
  gridTemplateColumns: '50% 50%',
  gridTemplateRows: '50% 50%',
  width: '100%',
  height: '100%',
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
  filter: 'drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.5))',
});
