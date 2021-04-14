import { Code } from './CodeTypes';
import { ColorNames } from './colors';

function randomColor() {
  const i = Math.floor(Math.random() * ColorNames.length);
  return ColorNames[i];
}

export function randomCode(codeLength: number): Code {
  return Array.from(new Array(codeLength)).map((_) => randomColor());
}
