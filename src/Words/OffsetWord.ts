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
import { TextDocument } from "vscode-languageserver-textdocument";
import { IWordBuilder } from "./Interfaces/IBuilder";
import { IWord } from "./Interfaces/IWord";
import { WordCreation } from "./Creation";

export class OffsetWord implements IWord {
  /**The text of the word*/
  public text: string;
  public offset: number;

  constructor(text: string, offset: number = 0) {
    this.text = text;
    this.offset = offset;
  }
}

export class OffsetWordBuilder implements IWordBuilder<OffsetWord> {
  private Words: OffsetWord[];
  private Offset: number;

  constructor(Offset: number = 0) {
    this.Words = [];
    this.Offset = Offset;
  }

  /**
   * Add the given text as a word to the internal list, starting at the given offset
   * @param text The word text
   * @param offset The offset where the word was found
   */
  Add(text: string, offset: number): void {
    this.Words.push(new OffsetWord(text, offset + this.Offset));
  }

  /**Builds the final product of a word builder into the specified words array*/
  BuildFinal(): OffsetWord[] {
    return this.Words;
  }
}
/**
 *
 */
export namespace OffsetWord {
  /**
   *
   * @param value
   * @returns
   */
  export function is(value: any): value is OffsetWord {
    if (typeof value === "object") {
      if (typeof value.text === "string" && typeof value.offset === "number") return true;
    }

    return false;
  }

  /**
   *
   * @param text
   * @param func
   */
  export function Parse(text: string | TextDocument, func: WordCreation, offset: number = 0): OffsetWord[] {
    if (typeof text !== "string") {
      text = text.getText();
    }

    let Builder = new OffsetWordBuilder(offset);

    WordCreation.Execute(text, Builder, func);
    return Builder.BuildFinal();
  }

  /**
   *
   * @param text
   * @param func
   */
  export function ParseRange(text: string | TextDocument, startindex: number, endindex: number, func: WordCreation, offset: number = 0): OffsetWord[] {
    if (typeof text !== "string") {
      text = text.getText();
    }

    let Builder = new OffsetWordBuilder(offset);

    WordCreation.ExecuteRange(text, startindex, endindex, Builder, func);
    return Builder.BuildFinal();
  }
}
