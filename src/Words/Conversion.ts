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
import { PositionCalculator } from "../Position/include";
import { LocationWord } from "./LocationWord";
import { OffsetWord } from "./OffsetWord";
import { RangedWord } from "./RangedWord";

export namespace Conversion {
  export namespace Location {
    export function FromRange(word: RangedWord, uri: string | TextDocument): LocationWord {
      if (typeof uri !== "string") uri = uri.uri;

      return new LocationWord(word.text, uri, word.range);
    }

    export function FromOffset(word: OffsetWord, doc: TextDocument): LocationWord {
      return new LocationWord(word.text, doc.uri, {
        start: doc.positionAt(word.offset),
        end: doc.positionAt(word.offset + word.text.length),
      });
    }

    export function FromOffset2(word: OffsetWord, uri: string, calculator: PositionCalculator): LocationWord {
      return new LocationWord(word.text, uri, calculator.rangeOf(word.offset, word.offset + word.text.length));
    }
  }

  export namespace Range {
    export function FromLocation(word: LocationWord): RangedWord {
      return new RangedWord(word.text, word.location.range);
    }

    export function FromOffset(word: OffsetWord, doc: TextDocument | PositionCalculator): RangedWord {
      if (PositionCalculator.is(doc)) {
        return new RangedWord(word.text, doc.rangeOf(word.offset, word.offset + word.text.length));
      }

      return new RangedWord(word.text, {
        start: doc.positionAt(word.offset),
        end: doc.positionAt(word.offset + word.text.length),
      });
    }
  }

  export namespace Offset {
    export function FromLocation(word: LocationWord, doc: TextDocument | PositionCalculator): OffsetWord {
      return new OffsetWord(word.text, doc.offsetAt(word.location.range.start));
    }

    export function FromRange(word: RangedWord, doc: TextDocument | PositionCalculator): OffsetWord {
      return new OffsetWord(word.text, doc.offsetAt(word.range.start));
    }
  }
}
