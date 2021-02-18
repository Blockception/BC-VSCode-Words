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
      var Words = LocationWord.ParseFromRegexDoc(Samples.DocSource, Pattern);

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
      var Words = LocationWord.ParseDoc(Samples.DocSource, ParseSample);

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
      var Words = LocationWord.Parse(Samples.TextSource, PositionCalculator.Create(Samples.TextSource), Samples.FakeUri, ParseSample);

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
