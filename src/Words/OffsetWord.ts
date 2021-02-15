import { IWord } from "./IWord";

export class OffsetWord implements IWord {
  public text: string;
  public offset: number;

  constructor(text: string, offset: number = 0) {
    this.text = text;
    this.offset = offset;
  }
}

export namespace OffsetWord {
  export function ParseFromRegex(text: string, regex: RegExp, offset: number = 0): OffsetWord[] {
    let Out: OffsetWord[] = [];
    let Matches = text.match(regex);

    //If any matches are found
    if (Matches) {
      let StartIndex = 0;

      for (let I = 0; I < Matches.length; I++) {
        const m = Matches[I];

        let Index = text.indexOf(m, StartIndex);
        StartIndex = Math.max(Index, StartIndex) + text.length;

        Out.push(new OffsetWord(m, Index));
      }
    }

    return Out;
  }
}
