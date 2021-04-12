import { style, types } from 'typestyle';

export { classes, keyframes } from 'typestyle';

export type Style = types.NestedCSSProperties;

const AppName = 'mm';

export function cssClass(name: string, ...styles: Style[]): string {
  return style(...styles, {
    $debugName: `${AppName}_${name}`,
    $unique: true,
  });
}
