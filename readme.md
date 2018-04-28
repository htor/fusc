# fusc

Obfuscate text inside HTML elements with other characters. It preserves
the structure of the elements by only mutating text nodes, so nested elements
and inline elements with text should obfuscate just fine.

# example

```js
import fusc from 'fusc'

window.onclick = () => fusc(document.querySelector('.text'), '@')
```

Then, given a text:

```txt
Perferendis et et autem est aspernatur officia. Nulla aut dolorem et quis corporis. Est numquam tenetur eius eos dolor rerum quaerat omnis. Labore corporis itaque illo aut qui dolorem beatae non. Cumque excepturi quam praesentium animi qui cupiditate quod. Molestias tempore animi optio fugit ducimus omnis.
```

it will obfuscate into:

```txt
@@@@@@@@@@@ @@ @@ @@@@@ @@@ @@@@@@@@@@ @@@@@@@@ @@@@@ @@@ @@@@@@@ @@ @@@@ @@@@@@@@@ @@@ @@@@@@@ @@@@@@@ @@@@ @@@ @@@@@ @@@@@ @@@@@@@ @@@@@@ @@@@@@ @@@@@@@@ @@@@@@ @@@@ @@@ @@@ @@@@@@@ @@@@@@ @@@@ @@@@@@ @@@@@@@@@ @@@@ @@@@@@@@@@@ @@@@@ @@@ @@@@@@@@@@ @@@@@ @@@@@@@@@ @@@@@@@ @@@@@ @@@@@ @@@@@ @@@@@@@ @@@@@@
```
Calling `fusc()` again will do the reverse, and the original text will be restored.
To run an actual example, clone this repo and do:
```
npm run example
```

# install

With [npm](https://npmjs.org) do:

```
npm install fusc
```

# license

MIT

