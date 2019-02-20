# Universal Style Guide

This repo describes rules that should be applied to **all** languages.

## Heading IDs

All headings have explicit IDs like this:

```md
## Try React {#try-react}
```

Do **not** translate these IDs! They are used for navigation and will break if the document is referred to externally, i.e.:

```md
See the [beginning section](/getting-started#try-react) for more information.
```

✅ DO:

```md
## React-i Sına {#try-react}
```

❌ DON'T:

```md
## React-i Sına {#react-sına}
```

This will break the link above.

## Text in Code Blocks

Leave text in code blocks untranslated except for comments. You may optionally translate text in strings, but be careful not to translate strings that refer to code!

Example:
```js
// Example
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

✅ DO:

```js
// Nümunə
const element = <h1>Salam dünya</h1>;
ReactDOM.render(element, document.getElementById('root'));
```

❌ DON'T:

```js
// Nümunə
const element = <h1>Salam dünya</h1>;
// "root" element ID-dir.
// TƏRCÜMƏ ETMƏ
ReactDOM.render(element, document.getElementById('kök'));
```

❌ DEFINITELY DON'T:

```js
// Nümunə
const element = <h1>Salam dünya</h1>;
ReactDOM.render(element, dokument.idəGörəElementSeç('kök'));
```

## External Links

If an external link is to an article in a reference like [MDN] or [Wikipedia], and a version of that article exists in your language that is of decent quality, consider linking to that version instead.

[MDN]: https://developer.mozilla.org/en-US/
[Wikipedia]: https://en.wikipedia.org/wiki/Main_Page

Example:

```md
React elements are [immutable](https://en.wikipedia.org/wiki/Immutable_object).
```

✅ OK:

```md
React elementləri [dəyişilməzdir](https://az.wikipedia.org/wiki/Dəyişilməz_obyekt).
```

For links that have no equivalent (Stack Overflow, YouTube videos, etc.), just use the English link.