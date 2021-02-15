import { Position, Range, TextDocument } from "vscode-languageserver-textdocument";
import { CalculateLineOffset } from "../Functions/String";

export interface PositionCalculator {
  PositionAt(offset: number): Position;

  RangeOf(startindex: number, endindex: number): Range;
}

export namespace PositionCalculator {
  export function Create(doc: TextDocument): PositionCalculator {
    return new DocumentCalculator(doc);
  }

  export function Create(text: string, FirstLineOffset: number = 0, LineOffset: number = 0): PositionCalculator {}
}

class DocumentCalculator implements PositionCalculator {
  private doc;

  constructor(doc: TextDocument) {
    this.doc = doc;
  }

  PositionAt(offset: number): Position {
    return this.doc.positionAt(offset);
  }

  RangeOf(startindex: number, endindex: number): Range {
    return {
      start: this.PositionAt(startindex),
      end: this.PositionAt(endindex),
    };
  }
}

class TextCalculator implements PositionCalculator {
  private FirstLineOffset: number;
  private LineOffset: number;
  private LineOffsets: number[];

  constructor(text: string, FirstLineOffset: number, LineOffset: number) {
    this.FirstLineOffset = FirstLineOffset;
    this.LineOffset = LineOffset;

    //records at what offset the line has ended
    this.LineOffsets = CalculateLineOffset(text, FirstLineOffset);
  }

  PositionAt(offset: number): Position {
    let LineIndex = 0;
    let LO = 0;

    //Find in which line this offset is.
    for (LineIndex = 0; LineIndex < this.LineOffsets.length; LineIndex++) {
      LO = this.LineOffsets[LineIndex];

      //If the Offset of the line is bigger then the offset then line number has been found
      if (LO > offset) {
        //Grab the start of the line
        LO = this.LineOffsets[Math.max(LineIndex - 1, 0)];
        break;
      }
    }

    //Create output
    let Out: Position = {
      //Character in the line is the lineoffset - current
      character: LO - offset,
      line: LineIndex + this.LineOffset,
    };

    //If its the first line it might be offsetted
    if (LineIndex == 0) {
      Out.character += this.FirstLineOffset;
    }

    return Out;
  }

  RangeOf(startindex: number, endindex: number): Range {
    return {
      start: this.PositionAt(startindex),
      end: this.PositionAt(endindex),
    };
  }
}
