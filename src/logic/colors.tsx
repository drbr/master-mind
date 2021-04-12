export type CodeColor = 'P' | 'W' | 'R' | 'G' | 'Y' | 'B';

export type AnswerColor = 'white' | 'black';

export const CodeColors: Record<CodeColor, string> = {
  B: 'rgb(0, 38, 173)',
  Y: 'rgb(215, 199, 0)',
  P: 'rgb(215, 0, 214)',
  W: 'rgb(220, 219, 219)',
  G: 'rgb(23, 170, 0)',
  R: 'rgb(171, 0, 0)',
}
