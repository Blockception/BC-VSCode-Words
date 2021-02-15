import { IWord } from "./IWord";

export class OffsetWord implements IWord {
  public text: string;
  public offset: number;

  constructor(text: string, offset: number = 0) {
    this.text = text;
    this.offset = offset;
  }
}

export declare namespace OffsetWord {
  export function Parse(text: string, offset: number = 0): OffsetWord[] {}
}
