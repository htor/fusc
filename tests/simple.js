import test from 'tape'
import fusc from '../index'

const text = document.createElement('p')
text.innerText = 'hack the planet!'
document.body.appendChild(text)
const textNodes = []
const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT, null, false)
while (walker.nextNode()) textNodes.push(walker.currentNode)

test('simple obfusc', t => {
    t.plan(3)
    fusc(text)
    t.equal(text.innerText, '**** *** *******')
    t.equal(textNodes.length, 1, 'number of text nodes')
    t.equal(textNodes[0].textContent,  '**** *** *******')
})

test('simple defusc', t => {
    t.plan(3)
    fusc(text)
    t.equal(text.innerText, 'hack the planet!')
    t.equal(textNodes.length, 1, 'number of text nodes')
    t.equal(textNodes[0].textContent,  'hack the planet!')
})

test('simple obfusc with transform option', t => {
    t.plan(3)
    fusc(text, { transform: char => char.toUpperCase() })
    t.equal(text.innerText, 'HACK THE PLANET!')
    t.equal(textNodes.length, 1, 'number of text nodes')
    t.equal(textNodes[0].textContent, 'HACK THE PLANET!')
    fusc(text)
})


test('simple obfusc with transform option overrides char option', t => {
    t.plan(3)
    fusc(text, {
        char: '+',
        transform: char => char.repeat(2).toUpperCase()
    })
    t.equals(text.innerText, 'HHAACCKK TTHHEE PPLLAANNEETT!!')
    t.equal(textNodes.length, 1, 'number of text nodes')
    t.equals(textNodes[0].textContent, 'HHAACCKK TTHHEE PPLLAANNEETT!!')
    fusc(text)
})
