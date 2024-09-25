import { Check, Hint } from "./check";

//[T-C-1-12].
const numberRegex = /e\.g\.[^,]/g;

export class EgCommaCheck extends Check {
  public name = "EgComma";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(numberRegex);
    let i = 0;
    for (const num of toCheck) {
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "Use , after e.g.",
        suggestion: "",
      });
    }
    return hints;
  }
}
