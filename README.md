# Blockception Vscode Words

<p align="center">
  <a href="https://www.npmjs.com/package/vscode-languageserver">
  	<img alt="npm" src="https://img.shields.io/npm/v/bc-vscode-words">
		<img alt="npm" src="https://img.shields.io/npm/dt/bc-vscode-words">
  </a>
</p>

The lexical analyzers basics used for analyzing code from VSCode documents

## Examples

```ts
//Offset words contain only the offset of the word in the text
function Process(doc: TextDocument) {
  let Words = RangedWord.Parse(doc, /([^ \t\r\n]+)+/gi);

	foreach(var W in Words) {
		if (W.text === "hello") {
			let offset = W.offset;
			let pos = doc.positionAt(offset);
		}
	}
}
```

```ts
//Ranged words contain the start (the character and line) and end of a word
function Process(doc: TextDocument) {
  let Words = RangedWord.Parse(doc, /([^ \t\r\n]+)+/gi);

	foreach(var W in Words) {
		if (W.text === "hello") {
			let range = W.range;
		}
	}
}
```

```ts
//Location words contain the start (the character and line) and end of a word and the uri
function Process(doc: TextDocument) {
  let Words = LocationWord.ParseFromRegexDoc(doc, /([^ \t\r\n]+)+/gi);

	foreach(var W in Words) {
		if (W.text === "hello") {
			let range = W.location.range;
			let uri = W.location.uri
		}
	}
}
```
