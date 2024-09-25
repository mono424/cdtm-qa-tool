export interface Hint {
  key: string;
  text: string;
  index: number;
  hint: string;
  suggestion: string;
}

export abstract class Check {
  abstract name: string;
  abstract onCheck(text: string): Hint[];
}
