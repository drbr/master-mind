import { CodeColor, ResponseColor } from './colors';

export type Code = ReadonlyArray<CodeColor>;
export type PartialCode = ReadonlyArray<CodeColor | null>;

export type GuessResponse = Record<ResponseColor, number>;
