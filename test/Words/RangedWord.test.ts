import * as assert from "assert";
import "mocha";
import { PositionCalculator } from "../../src/Position/include";
import { RangedWord } from "../../src/Words/include";
import { IBaseWordBuilder } from "../../src/Words/Interfaces/include";
import { RegularExpression } from "../../src/RegularExpression/CreateWords";
import * as Samples from "../Samples/Samples.test";

const Pattern = new RegExp(/([^ \t\r\n]+)+/gi);

suite("Ranged word", () => {
  suite("parse", () => {
    test("regex test doc", () => {
      var Words = RangedWord.ParseFromRegex(Samples.DocSource, Pattern, PositionCalculator.Wrap(Samples.DocSource));

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        var startindex = Samples.DocSource.offsetAt(Word.range.start);
        var endindex = Samples.DocSource.offsetAt(Word.range.end);
        const ShouldBe = Samples.TextSource.substring(startindex, endindex);

        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });

    function ParseSample(text: string, builder: IBaseWordBuilder): void {
      RegularExpression.CreateWords(text, Pattern, builder);
    }

    test("test doc", () => {
      var Words = RangedWord.Parse(Samples.DocSource, ParseSample);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        var startindex = Samples.DocSource.offsetAt(Word.range.start);
        var endindex = Samples.DocSource.offsetAt(Word.range.end);
        const ShouldBe = Samples.TextSource.substring(startindex, endindex);

        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });
  });
});
