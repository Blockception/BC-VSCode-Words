import { Range } from "vscode-languageserver-textdocument";
import { PositionCalculator } from "../Position/include";
import { IWordBuilder } from "./Interfaces/IBuilder";
import { IWord } from "./Interfaces/IWord";

export class RangedWord implements IWord {
  public text: string;
  public range: Range;

  constructor(text: string, range: Range) {
    this.text = text;
    this.range = range;
  }
}

export class RangedWordBuilder implements IWordBuilder<RangedWord> {
  private Words: RangedWord[];
  private Calculator: PositionCalculator;

  constructor(Calculator: PositionCalculator) {
    this.Words = [];
    this.Calculator = Calculator;
  }

  Add(text: string, offset: number): void {
    let range = this.Calculator.RangeOf(offset, offset + text.length);
    this.Words.push(new RangedWord(text, range));
  }

  AddRange(text: string, range: Range): void {
    this.Words.push(new RangedWord(text, range));
  }

  BuildFinal(): RangedWord[] {
    return this.Words;
  }
}

export namespace RangedWord {
  export function ParseFromRegex(text: string, regex: RegExp, Calculator: PositionCalculator): RangedWord[] {
    let Builder = new RangedWordBuilder(Calculator);
    let Matches = text.match(regex);

    //If any matches are found
    if (Matches) {
      let StartIndex = 0;

      for (let I = 0; I < Matches.length; I++) {
        const m = Matches[I];

        let Index = text.indexOf(m, StartIndex);
        StartIndex = Math.max(Index, StartIndex) + text.length;

        Builder.Add(text, Index);
      }
    }

    return Builder.BuildFinal();
  }
}
