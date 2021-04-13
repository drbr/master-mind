import { ColorNames } from '../logic/colors';
import { cssClass } from '../styleFunctions';
import { CodePeg } from './CodePeg';

export function ColorPalette() {
  return (
    <div className={ColorPaletteContainerClass}>
      {ColorNames.map((c) => (
        <CodePeg key={c} color={c} static={false} />
      ))}
    </div>
  );
}

const ColorPaletteContainerClass = cssClass('ColorPaletteContainer', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '10px 15px 10px 15px',
  marginTop: 10,
  // borderRadius: 8,
  // boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.4)',
});
