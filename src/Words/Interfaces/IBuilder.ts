import { IWord } from "./IWord";

export interface IWordBuilder<T extends IWord> {
  Add(text: string, Offset: number): void;

  BuildFinal(): T[];
}
