import { Check, Hint } from "./check";

const words = [
  {
    wrong: /(realtime|real-time)/g,
    correct: "real time",
  },
  {
    wrong: /(startup|start\sup)/g,
    correct: "start-up",
  },
  {
    wrong: /(onpremise|on\spremise)/g,
    correct: "on-premise",
  },
  {
    wrong: /(percent)/g,
    correct: "%",
  },
  {
    wrong: /—/g,
    correct: "–",
  },
];

export class WordsCheck extends Check {
  public name = "Words";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    let i = 0;
    for (const word of words) {
      const toCheck = text.matchAll(word.wrong);
      for (const num of toCheck) {
        hints.push({
          key: `${this.name}_${i++}`,
          text: num[0],
          index: num.index,
          hint: "Use correct word.",
          suggestion: `Use correct word: ${word.correct}`,
        });
      }
    }
    return hints;
  }
}
