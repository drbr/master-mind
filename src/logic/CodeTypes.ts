import { CodeColor, ResponseColor } from './colors';

export type Code = [CodeColor, CodeColor, CodeColor, CodeColor];
export type GuessResponse = Record<ResponseColor, number>;
