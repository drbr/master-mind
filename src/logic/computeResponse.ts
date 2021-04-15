import { Code, GuessResponse } from './CodeTypes';
import { CodeColor } from './colors';

export function computeResponse({
  guess,
  answer,
}: {
  guess: Code;
  answer: Code;
}): GuessResponse {
  if (guess.length !== answer.length) {
    throw new Error('Expected guess and answer to be the same length');
  }

  const nonMatchingPegCountsInAnswer = new Map<CodeColor, number>();
  const nonMatchingPegsInGuess: CodeColor[] = [];

  let black = 0;
  let white = 0;

  // First, find all the exact matches, and put everything else into a map
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      black++;
    } else {
      const count = nonMatchingPegCountsInAnswer.get(answer[i]) ?? 0;
      nonMatchingPegCountsInAnswer.set(answer[i], count + 1);
      nonMatchingPegsInGuess.push(guess[i]);
    }
  }

  // We know whatever's left is in the wrong place, so count
  // the number of guess pegs that correspond to an answer peg.
  for (const guessPeg of nonMatchingPegsInGuess) {
    const count = nonMatchingPegCountsInAnswer.get(guessPeg) ?? 0;
    if (count > 0) {
      white++;
      nonMatchingPegCountsInAnswer.set(guessPeg, count - 1);
    }
  }

  return { black, white };
}
