import { Check, Hint } from "./check";

//[T-C-1-12].
const abreviationRegex = /\([A-Z]+\)/g;

export class AbreviationCheck extends Check {
  public name = "Abreviation";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const abreviations = text.matchAll(abreviationRegex);
    let i = 0;
    for (const num of abreviations) {
    }
    return hints;
  }
}
