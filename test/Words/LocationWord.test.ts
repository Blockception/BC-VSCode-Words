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
import * as assert from "assert";
import "mocha";
import { LocationWord } from "../../src/Words/include";
import { IBaseWordBuilder } from "../../src/Words/Interfaces/include";
import { RegularExpression } from "../../src/RegularExpression/CreateWords";
import * as Samples from "../Samples/Samples.test";
import { PositionCalculator } from "../../src/main";

const Pattern = new RegExp(/([^ \t\r\n]+)+/gi);

suite("Location word", () => {
  suite("parse", () => {
    test("regex test doc", () => {
      var Words = LocationWord.Document.Parse(Samples.DocSource, Pattern);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        var startindex = Samples.DocSource.offsetAt(Word.location.range.start);
        var endindex = Samples.DocSource.offsetAt(Word.location.range.end);
        const ShouldBe = Samples.TextSource.substring(startindex, endindex);

        assert.strictEqual(Word.location.uri, Samples.DocSource.uri, "Uri shouldnt be the same");
        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });

    function ParseSample(text: string, builder: IBaseWordBuilder): void {
      RegularExpression.CreateWords(text, Pattern, builder);
    }

    test("test doc", () => {
      var Words = LocationWord.Document.Parse(Samples.DocSource, ParseSample);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        var startindex = Samples.DocSource.offsetAt(Word.location.range.start);
        var endindex = Samples.DocSource.offsetAt(Word.location.range.end);
        const ShouldBe = Samples.TextSource.substring(startindex, endindex);

        assert.strictEqual(Word.location.uri, Samples.DocSource.uri, "Uri shouldnt be the same");
        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });

    test("test text", () => {
      var Words = LocationWord.Text.Parse(Samples.TextSource, Samples.FakeUri, ParseSample);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        var startindex = Samples.DocSource.offsetAt(Word.location.range.start);
        var endindex = Samples.DocSource.offsetAt(Word.location.range.end);
        const ShouldBe = Samples.TextSource.substring(startindex, endindex);

        assert.strictEqual(Word.location.uri, Samples.DocSource.uri, "Uri shouldnt be the same");
        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });
  });
});
