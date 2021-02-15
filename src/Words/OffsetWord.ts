import { IWordBuilder } from "./Interfaces/IBuilder";
import { IWord } from "./Interfaces/IWord";

export class OffsetWord implements IWord {
  public text: string;
  public offset: number;

  constructor(text: string, offset: number = 0) {
    this.text = text;
    this.offset = offset;
  }
}

export class OffsetWordBuilderimport { Range } from "vscode-languageserver-textdocument";
import { PositionCalculator } from "../Position/include";
import { IWordBuilder } from "./Interfaces/IBuilder";
import { IWord } from "./Interfaces/IWord";

export class LocationWord implements IWord {
  public text: string;
  public range: Range;

  constructor(text: string, range: Range) {
    this.text = text;
    this.range = range;
  }
}

export class LocationWordBuilder implements IWordBuilder<LocationWord> {
  private Words: LocationWord[];
  private Calculator: PositionCalculator;

  constructor(Calculator: PositionCalculator) {
    this.Words = [];
    this.Calculator = Calculator;
  }

  Add(text: string, offset: number): void {
    let range = this.Calculator.RangeOf(offset, offset + text.length);
    this.Words.push(new LocationWord(text, range));
  }

  AddRange(text: string, range: Range): void {
    this.Words.push(new LocationWord(text, range));
  }

  BuildFinal(): LocationWord[] {
    return this.Words;
  }
}

export namespace LocationWord {
  export function ParseFromRegex(text: string, regex: RegExp, Calculator: PositionCalculator): LocationWord[] {
    let Builder = new LocationWordBuilder(Calculator);
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
{
  private Words: OffsetWord[];
  private Offset: number;

  constructor(Offset: number = 0) {
    this.Words = [];
    this.Offset = Offset;
  }

  Add(text: string, offset: number): void {
    this.Words.push(new OffsetWord(text, offset + this.Offset));
  }

  BuildFinal(): OffsetWord[] {
    return this.Words;
  }
}

export namespace OffsetWord {
  export function ParseFromRegex(text: string, regex: RegExp, offset: number = 0): OffsetWord[] {
    let Builder = new OffsetWordBuilder(offset);
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
