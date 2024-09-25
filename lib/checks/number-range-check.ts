import { Check, Hint } from "./check";

//[T-C-1-12].
const numberRangeRegex = /\d+\sto\s\d+/g;

export class NumberRangeCheck extends Check {
  public name = "NumberRange";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(numberRangeRegex);
    let i = 0;
    for (const num of toCheck) {
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "Use a hyphen (-) instead of 'to'",
        suggestion:
          "Use a hyphen (-) instead of 'to'. For example, '1 to 10' should be written as '1-10'.",
      });
    }
    return hints;
  }
}
