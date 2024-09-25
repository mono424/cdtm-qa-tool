import { Check, Hint } from "./check";

//[T-C-1-12].
const thoughts = /(.[–—][^\.\[\]]{5,}[–—].|\s[-–—]\s[^\.\[\]]{5,}\s[-–—]\s)/g;
const correct = /\s–\s[^\.]+\s–\s/g;

export class ThoughtDashCheck extends Check {
  public name = "ThoughtDash";

  onCheck(text: string): Hint[] {
    const hints: Hint[] = [];
    const toCheck = text.matchAll(thoughts);
    let i = 0;
    for (const num of toCheck) {
      if (num[0].match(correct)) continue;
      hints.push({
        key: `${this.name}_${i++}`,
        text: num[0],
        index: num.index,
        hint: "Use correct thought dash.",
        suggestion:
          "Is the em dash (–) used correctly for additional thoughts or clauses (e.g., These features are essential – especially for larger projects)",
      });
    }
    return hints;
  }
}
