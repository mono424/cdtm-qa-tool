import { Check, Hint } from "./check";

//[T-C-1-12].
const thoughts = /["]/g;

export class QuotationMarkCheck extends Check {
  public name = "QuotationMark";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(thoughts);
    let i = 0;
    for (const num of toCheck) {
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "Please use the correct quotation mark",
        suggestion: 'You should use “ instead of "',
      });
    }
    return hints;
  }
}
