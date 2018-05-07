# fusc

Obfuscate and de-obfuscate text inside HTML elements. 
fusc transforms the text by replacing each non-whitespace character with another,
and preserves the HTML structure by only mutating text nodes. Nested elements 
and inline elements with text will obfuscate just fine.

# example

```js
import fusc from 'fusc'

window.onclick = () => fusc(document.querySelector('.text'), { char: '@' })
```

Then, given a text:

```txt
Perferendis et et autem est aspernatur officia. Nulla aut dolorem et quis corporis. 
Est numquam tenetur eius eos dolor rerum quaerat omnis. Labore corporis itaque illo 
aut qui dolorem beatae non. Cumque excepturi quam praesentium animi qui cupiditate 
quod. Molestias tempore animi optio fugit ducimus omnis.
```

it will obfuscate into:

```txt
@@@@@@@@@@@ @@ @@ @@@@@ @@@ @@@@@@@@@@ @@@@@@@@ @@@@@ @@@ @@@@@@@ @@ @@@@ @@@@@@@@@ 
@@@ @@@@@@@ @@@@@@@ @@@@ @@@ @@@@@ @@@@@ @@@@@@@ @@@@@@ @@@@@@ @@@@@@@@ @@@@@@ @@@@ 
@@@ @@@ @@@@@@@ @@@@@@ @@@@ @@@@@@ @@@@@@@@@ @@@@ @@@@@@@@@@@ @@@@@ @@@ @@@@@@@@@@ 
@@@@@ @@@@@@@@@ @@@@@@@ @@@@@ @@@@@ @@@@@ @@@@@@@ @@@@@@
```
Calling `fusc()` again will apply the reverse transformation and the original text 
will be restored.

# methods

```js
import fusc from 'fusc'
```

## fusc(element, [opts])
Obfuscate and de-obfuscate text within an element.

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

