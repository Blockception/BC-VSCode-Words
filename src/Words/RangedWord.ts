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
import { Range, TextDocument } from "vscode-languageserver-textdocument";
import { PositionCalculator } from "../Position/include";
import { IBaseWordBuilder, IWordBuilder } from "./Interfaces/IBuilder";
import { IWord } from "./Interfaces/IWord";
import { RegularExpression } from "./Regexp";

export class RangedWord implements IWord {
  /**The text of the word*/
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
  export function ParseFromRegex(text: string | TextDocument, regex: RegExp, Calculator: PositionCalculator): RangedWord[] {
    let Builder = new RangedWordBuilder(Calculator);

    if (typeof text !== "string") {
      text = text.getText();
    }

    RegularExpression.CreateWords(text, regex, Builder);
    return Builder.BuildFinal();
  }

  export function ParseFromRegexDoc(doc: TextDocument, regex: RegExp): RangedWord[] {
    let Calculator: PositionCalculator = PositionCalculator.Wrap(doc);
    let Builder = new RangedWordBuilder(Calculator);
    let text = doc.getText();

    RegularExpression.CreateWords(text, regex, Builder);
    return Builder.BuildFinal();
  }

  export function Parse(doc: TextDocument, wordcreation: (text: string, builder: IBaseWordBuilder) => void): RangedWord[] {
    let Builder = new RangedWordBuilder(PositionCalculator.Wrap(doc));

    let text = doc.getText();
    wordcreation(text, Builder);
    return Builder.BuildFinal();
  }
}
