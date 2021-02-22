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
import { RegularExpression } from "../RegularExpression/include";
import { IBaseWordBuilder } from "./Interfaces/include";

/**A function declaration that targets the converts the entire string into words*/
export type FullWordCreation = (text: string, Builder: IBaseWordBuilder) => void;
/**A function declaration that targets the converts the specified section of the string into words*/
export type RangeWordCreation = (text: string, startoffset: number, endindex: number, Builder: IBaseWordBuilder) => void;
/**A type of 3 kinds of word creation methods*/
export type WordCreation = RangeWordCreation | FullWordCreation | RegExp;

/**The namespace that adds functionality to type FullWordCreation*/
export namespace FullWordCreation {
  /**Checks if the given object is of type FullWordCreation*/
  export function is(value: any): value is FullWordCreation {
    if (value) {
      let temp = value as FullWordCreation;

      if (temp.length === 2) return true;
    }

    return false;
  }
}

/**The namespace that adds functionality to type RangeWordCreation*/
export namespace RangeWordCreation {
  /**Checks if the given object is of type RangeWordCreation*/
  export function is(value: any): value is RangeWordCreation {
    if (value) {
      let temp = value as RangeWordCreation;

      if (temp.length === 4) return true;
    }

    return false;
  }
}

/**The namespace that adds functionality to type WordCreation*/
export namespace WordCreation {
  /**Checks cheaply if the given object is of type FullWordCreation*/
  export function isFull(func: WordCreation): func is FullWordCreation {
    if (func) {
      let temp = func as FullWordCreation;
      if (temp.length === 2) return true;
    }

    return false;
  }

  /**Checks cheaply if the given object is of type RangeWordCreation*/
  export function isRange(func: WordCreation): func is RangeWordCreation {
    if (func) {
      let temp = func as RangeWordCreation;
      if (temp.length === 4) return true;
    }

    return false;
  }

  /**Checks if the given object is neither of type: FullWordCreation or RangeWordCreation*/
  export function isRegex(func: WordCreation): func is RegExp {
    if (!isFull(func) && !isRange(func)) return true;

    return false;
  }

  /**
   * Execute the given Wordcreation with the specified information, for ranged it will use the range of the entire string
   * @param text The text to process
   * @param Builder The builder needed to process
   * @param func The function to execute
   */
  export function Execute(text: string, Builder: IBaseWordBuilder, func: WordCreation) {
    if (WordCreation.isFull(func)) {
      func(text, Builder);
    } else if (WordCreation.isRange(func)) {
      func(text, 0, text.length, Builder);
    } else {
      RegularExpression.CreateWords(text, func, Builder);
    }
  }

  /**
   * Execute the given Wordcreation with the specified information.
   * @param text The text to process
   * @param startindex The possible startindex in the text
   * @param endindex The possible endindex in the text
   * @param Builder The builder needed to process
   * @param func The function to execute
   */
  export function ExecuteRange(text: string, startindex: number, endindex: number, Builder: IBaseWordBuilder, func: WordCreation) {
    if (WordCreation.isFull(func)) {
      func(text, Builder);
    } else if (WordCreation.isRange(func)) {
      func(text, startindex, endindex, Builder);
    } else {
      RegularExpression.CreateWords(text, func, Builder);
    }
  }
}
