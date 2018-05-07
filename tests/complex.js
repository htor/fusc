import test from 'tape'
import fusc from '../index'

const text = document.createElement('p')
text.classList.add('text')
text.innerHTML = `<article>
    <p>
    <span>hack</span> 
    the <span><strong>planet</strong></span>!
</p></article>`
document.body.appendChild(text)
let textNodes = []
const walker = document.createTreeWalker(text, NodeFilter.SHOW_TEXT, null, false)
while (walker.nextNode()) textNodes.push(walker.currentNode)
textNodes = textNodes.filter(tnode => tnode.textContent.trim()) // filter out newlines

test('obfusc complex nested elements', t => {
    t.plan(5)
    fusc(text)
    t.equal(textNodes[0].textContent.trim(), '****')
    t.equal(textNodes[1].textContent.trim(), '***')
    t.equal(textNodes[2].textContent.trim(), '******')
    t.equal(textNodes[3].textContent.trim(), '*')
    t.equal(text.innerText.trim(), '**** *** *******', 'should contain fusced text')
})

test('defusc complex nested elements', t => {
    t.plan(5)
    fusc(text)
    t.equal(textNodes[0].textContent.trim(), 'hack')
    t.equal(textNodes[1].textContent.trim(), 'the')
    t.equal(textNodes[2].textContent.trim(), 'planet')
    t.equal(textNodes[3].textContent.trim(), '!')
    t.equal(text.innerText.trim(), 'hack the planet!', 'should contain original text')
})

test('obfusc complex nested with options', t => {
    t.plan(6)
    fusc(text, {
        transform: char => char.replace(/[eyuioåaøæ]/g, '•'),
        timeout: index => 100
    })
    t.equal(text.innerText.trim(), 'hack the planet!', 'text after 0ms')
    setTimeout(() => {
        t.equal(textNodes[0].textContent.trim(), 'h•ck')
        t.equal(textNodes[1].textContent.trim(), 'th•')
        t.equal(textNodes[2].textContent.trim(), 'pl•n•t')
        t.equal(textNodes[3].textContent.trim(), '!')
        t.equal(text.innerText.trim(), 'h•ck th• pl•n•t!', 'text after 100ms')
    }, 100)
})
