import * as assert from "assert";
import "mocha";
import { OffsetWord } from "../../src/Words/include";
import { IBaseWordBuilder } from "../../src/Words/Interfaces/include";
import { RegularExpression } from "../../src/RegularExpression/CreateWords";
import * as Samples from "../Samples/Samples.test";

const Pattern = new RegExp(/([^ \t\r\n]+)+/gi);

suite("Offset word", () => {
  suite("parse", () => {
    test("regex test", () => {
      var Words = OffsetWord.ParseFromRegex(Samples.TextSource, Pattern, 0);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        const ShouldBe = Samples.TextSource.substring(Word.offset, Text.length + Word.offset);

        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });

    test("regex test doc", () => {
      var Words = OffsetWord.ParseFromRegex(Samples.DocSource, Pattern, 0);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        const ShouldBe = Samples.TextSource.substring(Word.offset, Text.length + Word.offset);

        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });

    function ParseSample(text: string, builder: IBaseWordBuilder): void {
      RegularExpression.CreateWords(text, Pattern, builder);
    }

    test("test doc", () => {
      var Words = OffsetWord.Parse(Samples.DocSource, ParseSample);

      for (let I = 0; I < Words.length; I++) {
        const Word = Words[I];

        const Text = Word.text;
        const ShouldBe = Samples.TextSource.substring(Word.offset, Text.length + Word.offset);

        assert.strictEqual(Text, ShouldBe, `Words done not match: ${Text} = ${ShouldBe}`);
      }
    });
  });
});
