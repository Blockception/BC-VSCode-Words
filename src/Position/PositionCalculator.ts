import { Position, Range, TextDocument } from "vscode-languageserver-textdocument";
import { CalculateLineOffset } from "../Functions/String";

/**
 *An object that can calculate the position / range of an given offset
 */
export interface PositionCalculator {
  /**
   * Calculates the given position of the given offset
   * @param offset The offset of the item in the text;
   */
  positionAt(offset: number): Position;

  /**
   * Calculates the given range of the given start and end index
   * @param startindex The start offset of the item in the text;
   * @param endindex The end offset of the item in the text;
   */
  rangeOf(startindex: number, endindex: number): Range;

  /**
   * Calculates the given offset of a position
   * @param pos The position to retrieve of number of
   */
  offsetAt(pos: Position): number;
}

export namespace PositionCalculator {
  /**
   * Check if the given object is a PositionCalculator
   */
  export function is(value: any): value is PositionCalculator {
    if (value) {
      let temp = value as PositionCalculator;

      if (temp.positionAt !== undefined && temp.rangeOf !== undefined) return true;
    }

    return false;
  }

  /**
   * Creates a PositionCalculator around a given document
   * @param doc
   */
  export function Wrap(doc: TextDocument): PositionCalculator {
    return new DocumentCalculator(doc);
  }

  /**
   * Creates a PositionCalculator around a given text
   * @param text The text to create a calculator for
   * @param FirstLineOffset The text offset of the first line. Usually indicates where the text starts from in the line itself
   * @param LineOffset The line offset of the text. Incase text from line 3 to the end has been grabbed.
   */
  export function Create(text: string): PositionCalculator {
    return new DocumentCalculator(TextDocument.create("converison", "text", 0, text));
  }
}

/**
 *The class that wraps around TextDocuments and into a PositionCalculator
 */
class DocumentCalculator implements PositionCalculator {
  private doc;

  constructor(doc: TextDocument) {
    this.doc = doc;
  }

  /**
   * Calculates the given position of the given offset
   * @param offset The offset of the item in the text;
   */
  positionAt(offset: number): Position {
    return this.doc.positionAt(offset);
  }

  /**
   * Calculates the given range of the given start and end index
   * @param startindex The start offset of the item in the text;
   * @param endindex The end offset of the item in the text;
   */
  rangeOf(startindex: number, endindex: number): Range {
    return {
      start: this.positionAt(startindex),
      end: this.positionAt(endindex),
    };
  }

  /**
   * Calculates the given offset of a position
   * @param pos The position to retrieve of number of
   */
  offsetAt(pos: Position): number {
    return this.doc.offsetAt(pos);
  }
}
