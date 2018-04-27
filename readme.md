# fusc

Replace text inside HTML elements with other characters. 

# example

To see an example, run:
```
npm run example
```

# usage 

To obfuscate a text into a series of @-characters:

```html
<section class="text">
    <p>
        Blanditiis ea qui rerum ab voluptatem molestiae. <a href="http://aut.em">Autem</a> beatae perferendis doloribus aperiam quis voluptate <a href="http://vol.up">voluptatibus</a>. Quia enim quis neque nisi repudiandae cumque.
    </p>
</section>
```

```js
import fusc from 'fusc'

window.onclick = () => fusc(document.querySelector('.text'), '@')
```

# install

With [npm](https://npmjs.org) do:

```
npm install fusc
```

# license

MIT

