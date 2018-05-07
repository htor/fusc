# fusc

Obfuscate and de-obfuscate text inside HTML elements. 
fusc transforms the text by replacing each non-whitespace character with another,
and preserves the HTML structure by only mutating text nodes. Nested elements 
and inline elements with text will obfuscate just fine.

# example

```js
import fusc from 'fusc'
const text = document.querySelector('.text')

text.innerHTML // => '<p>hack the <a href="/planet">planet</a>!</p>'
fusc(text, { char: '@' })
text.innerHTML // => '<p>@@@@ @@@ <a href="/planet">@@@@@@</a>@</p>'
fusc(text)
text.innerHTML // => '<p>hack the <a href="/planet">planet</a>!</p>'
```
# methods

## fusc(element, [opts])
Obfuscate and de-obfuscate text within an element. 
First time `fusc()` is called it applies the transformation and the second time
it's called it applies the reverse transformation and restores the original text.


`element`- a HTML element

The options can be:

`opts.char` - the replacement character. Replaces each character in the text. 
Defaults to `*`.

`opts.transform` - the transform function. Gets passed each character
in the text and returns a character. Defaults to `char => opts.char`.

`opts.timeout` - a function returning the time in milliseconds 
waited before running the transformation on each text token. Gets passed in the iteration index of each token. Defaults to `null` which means no timeout.

# install

With [npm](https://npmjs.org) do:

```
npm install fusc
```

# license

MIT

