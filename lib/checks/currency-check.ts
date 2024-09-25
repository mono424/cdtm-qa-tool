import { Check, Hint } from "./check";

//[T-C-1-12].
const currencyRegex = /[€$]/g;

export class CurrencyCheck extends Check {
  public name = "Currency";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(currencyRegex);
    let i = 0;
    for (const currency of toCheck) {
      hints.push({
        key: `${this.name}_${i++}`,
        text: currency[0],
        index: currency.index,
        hint: "Use abbreviation for currency.",
        suggestion: "Don’t use € or $, use USD or EUR",
      });
    }
    return hints;
  }
}
