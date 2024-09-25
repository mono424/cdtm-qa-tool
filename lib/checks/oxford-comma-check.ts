import { Check, Hint } from "./check";

//[T-C-1-12].
const noOxfordComma = /([^,.\s]*\s?[^,.\s]+), ([^,.\s]*\s?[^,.\s]+) and/g;

export class OxfordCommaCheck extends Check {
  public name = "OxfordCommaCheck";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(noOxfordComma);
    let i = 0;
    for (const num of toCheck) {
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "No Oxford Comma used.",
        suggestion: "You should use ', and'",
      });
    }
    return hints;
  }
}
