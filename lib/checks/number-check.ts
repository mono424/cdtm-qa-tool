import { Check, Hint } from "./check";

//[T-C-1-12].
const numberRegex = /\d+[\.,]?\d{3,}/g;
const yearRegex = /^(19\d\d|20\d\d)$/g;

export class NumberCheck extends Check {
  public name = "Number";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(numberRegex);
    let i = 0;
    for (const num of toCheck) {
      if (num[0].match(yearRegex)) continue;
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "Use abbreviation for great numbers.",
        suggestion:
          "Use the following abbreviations: thousand -> k, million -> M, billion -> B, trillion -> T",
      });
    }
    return hints;
  }
}
