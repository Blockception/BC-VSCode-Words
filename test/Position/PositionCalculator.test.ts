import { PositionCalculator } from "../../src/main";
import * as Samples from "../Samples/Samples.test";
import * as assert from "assert";
import "mocha";

const sections = 100;

suite("Position Calculator", () => {
  test("document", () => {
    let doc = Samples.DocSource;
    let Calculator = PositionCalculator.Wrap(doc);

    let length = doc.getText().length;

    for (let I = 0; I < length; I += length / sections) {
      let offset = Math.floor(I);

      assert.strictEqual(doc.positionAt(offset), Calculator.positionAt(offset), "Doc and calculator out of sync???");

      let P = Calculator.positionAt(offset);
      let Noff = Calculator.offsetAt(P);

      assert.strictEqual(offset, Noff, "Old offset and new offset not equal");
    }
  });

  test("text", () => {
    let text = Samples.TextSource;
    let Calculator = PositionCalculator.Create(text, 0, 0);

    let length = text.length;

    for (let I = 0; I < length; I += length / sections) {
      let offset = Math.floor(I);

      let P = Calculator.positionAt(offset);
      let Noff = Calculator.offsetAt(P);

      assert.strictEqual(offset, Noff, "Old offset and new offset not equal");
    }
  });

  test("text offset", () => {
    const LineOffset = 2;
    const OffsetFirst = 5;
    let text = Samples.TextSource;
    let Calculator = PositionCalculator.Create(text, OffsetFirst, LineOffset);

    let length = text.length;

    for (let I = 0; I < length; I += length / sections) {
      let offset = Math.floor(I);

      let P = Calculator.positionAt(offset);
      let Noff = Calculator.offsetAt(P);

      assert.strictEqual(offset, Noff, "Old offset and new offset not equal");
    }
  });
});
