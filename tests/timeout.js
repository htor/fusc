import test from 'tape'
import fusc from '../'

const text = document.createElement('p')
text.classList.add('text')
text.innerText = 'hack the planet!'
document.body.appendChild(text)

test('text is obfusc at right time with timeout option', t => {
    t.plan(2)
    fusc(text, { timeout: () => 100 })
    t.equals(text.innerText, 'hack the planet!', 'timeout after 0ms')
    setTimeout(() => {
        t.equals(text.innerText, '**** *** *******', 'timeout after 100ms')
        fusc(text)
    }, 100)
})

test('text tokens are obfusc at right times with timeout option', t => {
    t.plan(4)
    fusc(text, { timeout: index => 100 + index })
    t.equals(text.innerText, 'hack the planet!', 'timeout after 0ms')
    setTimeout(() => {
        t.equals(text.innerText, '**** the planet!', 'timeout after 100ms')
    }, 100)
    setTimeout(() => {
        t.equals(text.innerText, '**** *** planet!')
    }, 101)
    setTimeout(() => {
        t.equals(text.innerText, '**** *** *******')
        fusc(text)
    }, 102)
})

