/*BSD 3-Clause License

Copyright (c) 2021, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { Position, Range, TextDocument } from "vscode-languageserver-textdocument";
import { PositionCalculator } from "../Position/include";
import { IRangeWordBuilder, IWordBuilder } from "./Interfaces/IBuilder";
import { IWord } from "./Interfaces/IWord";
import { WordCreation } from "./Creation";

/** */
export class RangedWord implements IWord {
  /**The text of the word*/
  public text: string;
  /** */
  public range: Range;

  constructor(text: string, range: Range) {
    this.text = text;
    this.range = range;
  }
}

export class RangedWordBuilder implements IWordBuilder<RangedWord>, IRangeWordBuilder {
  private Words: RangedWord[];
  private Calculator: PositionCalculator;
  private LineStart: number;
  private CharacterStart: number;

  constructor(Calculator: PositionCalculator, LineStart: number = 0, CharacterStart: number = 0) {
    this.Words = [];
    this.Calculator = Calculator;
    this.LineStart = LineStart;
    this.CharacterStart = CharacterStart;
  }

  /**
   * Add the given text as a word to the internal list, starting at the given offset
   * @param text The word text
   * @param offset The offset where the word was found
   */
  Add(text: string, offset: number): void {
    let range = this.Calculator.rangeOf(offset, offset + text.length);

    if (range.start.line === 0) {
      range.start.character += this.CharacterStart;
    }

    range.start.line += this.LineStart;
    range.end.line += this.LineStart;

    this.Words.push(new RangedWord(text, range));
  }

  /**
   * Add the given text as a word to the internal list, starting at the given offset
   * @param text The word text
   * @param range The range of the text
   */
  AddRange(text: string, range: Range): void {
    this.Words.push(new RangedWord(text, range));
  }

  /**Builds the final product of a word builder into the specified words array*/
  BuildFinal(): RangedWord[] {
    return this.Words;
  }
}

/**
 *
 */
export namespace RangedWord {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is RangedWord {
    if (typeof value === "object") {
      if (typeof value.text === "string" && typeof value.range === "object") return true;
    }

    return false;
  }

  /**
   *
   * @param text
   * @param func
   */
  export function Parse(text: string | TextDocument, func: WordCreation, StartAt: Position | undefined = undefined): RangedWord[] {
    let Calculator;

    if (typeof text !== "string") {
      Calculator = PositionCalculator.Wrap(text);
      text = text.getText();
    } else {
      Calculator = PositionCalculator.Create(text);
    }

    let SL: number = 0;
    let SC: number = 0;

    if (StartAt) {
      SL = StartAt.line;
      SC = StartAt.character;
    }

    let Builder = new RangedWordBuilder(Calculator, SL, SC);

    WordCreation.Execute(text, Builder, func);
    return Builder.BuildFinal();
  }

  /**
   *
   * @param text
   * @param func
   */
  export function ParseRange(text: string | TextDocument, startindex: number, endindex: number, func: WordCreation, StartAt: Position | undefined = undefined): RangedWord[] {
    let Calculator;

    if (typeof text !== "string") {
      Calculator = PositionCalculator.Wrap(text);
      text = text.getText();
    } else {
      Calculator = PositionCalculator.Create(text);
    }

    let SL: number = 0;
    let SC: number = 0;

    if (StartAt) {
      SL = StartAt.line;
      SC = StartAt.character;
    }

    let Builder = new RangedWordBuilder(Calculator, SL, SC);

    WordCreation.ExecuteRange(text, startindex, endindex, Builder, func);
    return Builder.BuildFinal();
  }
}
