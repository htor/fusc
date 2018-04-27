const flipText = (elem, fillChar='@') => {
    if (elem.dataset.animating === 'true') return
    elem.dataset.animating = 'true'

    // find all text nodes
    let n
    const textNodes = []
    const walk = document.createTreeWalker(elem, NodeFilter.SHOW_TEXT, null, false)
    while (n = walk.nextNode()) {
        n.origText = n.origText ? n.origText : n.textContent
        n.origStyle = n.origStyle ? n.origStyle : n.parentNode.style
        textNodes.push(n)
    }

    // iterate over them and replace values
    for (let i = 0; i < textNodes.length; i++) {
        let node = textNodes[i]
        let parent = node.parentNode 
        let tokens = node.textContent.split(' ')
        let origTokens = node.origText.split(' ')
        if (elem.dataset.back === 'true') { // restore original text
            for (let i = 0; i < tokens.length; i++) {
                setTimeout(() => {
                    tokens[i] = origTokens[i]
                    node.textContent = tokens.join(' ')   
                    if (i === tokens.length - 1) {
                        elem.dataset.animating = 'false'
                        elem.dataset.back = 'false'
                        if (parent.nodeName === 'A')
                            parent.style = node.origStyle
                    }
                }, 600 + random(1,20) * i)
            }
        } else { // fill in characters
            for (let i = 0; i < tokens.length; i++) {
                setTimeout(() => {
                    parent.style.textDecoration = 'none'
                    let token = tokens[i].trim()
                    tokens[i] = token === '\n' ? token
                        : fillChar.repeat(token.length)
                    node.textContent = tokens.join(' ')
                    if (i === tokens.length - 1) {
                        elem.dataset.animating = 'false'
                        elem.dataset.back = 'true'
                    }
                }, 600 + random(1,20) * i)
            }
        }
    }
}

const random = (min, max) => {
    return Math.floor((Math.random() * (max - min + 1))) + min;
}

export default flipText

