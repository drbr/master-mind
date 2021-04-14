import { Dispatch } from 'react';
import { ColorNames } from '../logic/colors';
import { CodeEditorAction } from '../stateMachines/codeEditorStateMachine';
import { cssClass } from '../styleFunctions';
import { CodePeg } from './CodePeg';

type ColorPaletteProps = {
  dispatch: Dispatch<CodeEditorAction>;
};

export function ColorPalette(props: ColorPaletteProps) {
  return (
    <div className={ColorPaletteContainerClass}>
      {ColorNames.map((c) => (
        <CodePeg
          key={c}
          color={c}
          onClick={() => props.dispatch({ type: 'putColor', color: c })}
        />
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
});
