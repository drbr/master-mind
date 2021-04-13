export type CodeColor = 'P' | 'W' | 'R' | 'G' | 'Y' | 'B';

export type ResponseColor = 'white' | 'black';

// The colors taken from the reference image at the darkest spot
export const CodeColorsDark: Record<CodeColor, string> = {
  B: 'rgb(0, 38, 173)',
  // Y: 'rgb(215, 199, 0)',
  Y: 'rgb(215, 208, 0)', // custom yellow to make it stand out more from white
  P: 'rgb(215, 0, 214)',
  W: 'rgb(220, 219, 219)',
  G: 'rgb(23, 170, 0)',
  R: 'rgb(171, 0, 0)',
};

// The colors taken from the reference image at the brightest spot
export const CodeColorsLight: Record<CodeColor, string> = {
  B: 'rgb(142, 167, 237)',
  // Y: 'rgb(245, 239, 136)',
  Y: 'rgb(246, 240, 15)', // custom yellow to make it stand out more from white
  P: 'rgb(246, 135, 243)',
  W: 'rgb(245, 245, 245)',
  G: 'rgb(167, 232, 138)',
  R: 'rgb(239, 138, 142)',
};

export const ResponseColors: Record<ResponseColor, string> = {
  white: 'rgb(235, 235, 235)',
  black: 'rgb(35, 35, 35)',
};

/** The names of all the possible code colors */
export const ColorNames = Object.keys(
  CodeColorsDark
) as ReadonlyArray<CodeColor>;
