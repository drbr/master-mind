import React from 'react';
import { CodeColor, CodeColorsDark, CodeColorsLight } from '../logic/colors';
import { cssClass } from '../styleFunctions';

export const CodeRow = cssClass('CodeRow', {
  display: 'flex',
  flexDirection: 'row',
});

export const CodePeg = cssClass('CodePeg', {
  borderRadius: '50%',
  height: 40,
  width: 40,
  margin: 5,
  filter: 'drop-shadow(0 2px 4px #444444)',
});

export function pegGradient(color: CodeColor): React.CSSProperties {
  const lightColor = CodeColorsLight[color];
  const darkColor = CodeColorsDark[color];
  return {
    background: `radial-gradient(circle at 25px 15px, ${lightColor}, ${darkColor})`,
    // backgroundColor: colorValue,
  };
}
