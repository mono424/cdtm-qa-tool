import { Check, Hint } from "./check";

//[T-C-1-12].
const allCitationRegex = /(.\[[A-Z]-[^\]]*\].)*.\[[A-Z]-[^\]]*\]./g;
const correctCitationRegex =
  /^(\s\[[A-Z]-[A-Z]-\d+-\d+\]\,)*\s\[[A-Z]-[A-Z]-\d+-\d+\][\.,]$/g;

export class CitationCheck extends Check {
  public name = "Citation";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(allCitationRegex);
    for (const citation of toCheck) {
      if (!citation[0].match(correctCitationRegex)) {
        hints.push({
          key: `${this.name}_${citation.index}`,
          text: citation[0],
          index: citation.index,
          hint: "Citation format is incorrect",
          suggestion: "Citation format should be [T-C-1-12].",
        });
      } else {
        console.log(`${citation[0]} is fine`);
      }
    }
    return hints;
  }
}
