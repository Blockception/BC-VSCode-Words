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
import * as Samples from "../Samples/Samples.test";
import { IBaseWordBuilder } from "../../src/main";
import { WordCreation } from "../../src/Words/Creation";

const DefaultBuilder: IBaseWordBuilder = {
  Add(text: string, offset: number): void {},
};

const FullF = (text: string, Builder: IBaseWordBuilder) => {
  Builder.Add("good", 0);
};

const RangeF = (text: string, Builder: IBaseWordBuilder) => {
  Builder.Add("good", 0);
};

const Pattern = new RegExp(/([^ \t\r\n]+)+/gi);

suite("Word Creation", () => {
  suite("Execute", () => {
    test("Full function", () => {
      WordCreation.Execute(Samples.TextSource, DefaultBuilder, FullF);
    });

    test("Range function", () => {
      WordCreation.Execute(Samples.TextSource, DefaultBuilder, RangeF);
    });

    test("Regex function", () => {
      WordCreation.Execute(Samples.TextSource, DefaultBuilder, Pattern);
    });
  });

  suite("Execute Range", () => {
    test("Full function", () => {
      WordCreation.ExecuteRange(Samples.TextSource, 0, Samples.TextSource.length, DefaultBuilder, FullF);
    });

    test("Range function", () => {
      WordCreation.ExecuteRange(Samples.TextSource, 0, Samples.TextSource.length, DefaultBuilder, RangeF);
    });

    test("Regex function", () => {
      WordCreation.ExecuteRange(Samples.TextSource, 0, Samples.TextSource.length, DefaultBuilder, Pattern);
    });
  });
});
