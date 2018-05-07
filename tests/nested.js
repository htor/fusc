import test from 'tape'
import fusc from '../index'

const text = document.createElement('p')
text.classList.add('text')
text.innerHTML = '<span>hack</span> the <span>planet</span>!'
document.body.appendChild(text)
const textNodes = []
const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT, null, false)
while (walker.nextNode()) textNodes.push(walker.currentNode)

test('obfusc nested elements', t => {
    t.plan(6)
    fusc(text)
    t.equal(text.innerText, '**** *** *******', 'inner text')
    t.equal(textNodes.length, 4, 'number of text nodes')
    t.equal(textNodes[0].textContent, '****')
    t.equal(textNodes[1].textContent, ' *** ')
    t.equal(textNodes[2].textContent, '******')
    t.equal(textNodes[3].textContent, '*')
})

test('deobfusc nested elements', t => {
    t.plan(6)
    fusc(text)
    t.equal(text.innerText, 'hack the planet!', 'inner text')
    t.equal(textNodes.length, 4, 'number of text nodes')
    t.equal(textNodes[0].textContent, 'hack')
    t.equal(textNodes[1].textContent, ' the ')
    t.equal(textNodes[2].textContent, 'planet')
    t.equal(textNodes[3].textContent, '!')
})


test('obfust nested elements with transform', t => {
    t.plan(6)
    fusc(text, { transform: char => char.replace(/a/g, 'e') })
    t.equal(text.innerText, 'heck the plenet!', 'inner text')
    t.equal(textNodes.length, 4, 'number of text nodes')
    t.equal(textNodes[0].textContent, 'heck')
    t.equal(textNodes[1].textContent, ' the ')
    t.equal(textNodes[2].textContent, 'plenet')
    t.equal(textNodes[3].textContent, '!')
})
