import { Check, Hint } from "./check";

//[T-C-1-12].
const wrongQuotation = /\d\s%/g;

export class PercentageCheck extends Check {
  public name = "Percentage";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    let i = 0;
    const toCheck = text.matchAll(wrongQuotation);
    for (const num of toCheck) {
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "Percentage should not have space between number and %.",
        suggestion:
          "Remove space between number and %. For example, 50% instead of 50 %.",
      });
    }
    return hints;
  }
}
