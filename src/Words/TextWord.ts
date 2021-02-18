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
import { IBaseWordBuilder } from "./Interfaces/IBuilder";

export class TextWordBuilder implements IBaseWordBuilder {
  private Words: string[];

  constructor() {
    this.Words = [];
  }

  Add(text: string, offset: number): void {
    this.Words.push(text);
  }

  /**Builds the final product of a word builder into the specified words array*/
  BuildFinal(): string[] {
    return this.Words;
  }
}

export namespace TextWord {
  export function ParseFromRegex(text: string, regex: RegExp): string[] {
    let Matches = text.match(regex);

    //If any matches are found
    if (Matches) {
      return Matches;
    }

    return [];
  }

  export function Parse(doc: string | TextDocument, wordcreation: (text: string, builder: IBaseWordBuilder) => void): string[] {
    let Builder = new TextWordBuilder();

    if (typeof doc !== "string") doc = doc.getText();

    wordcreation(doc, Builder);
    return Builder.BuildFinal();
  }
}
