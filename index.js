const fusc = (element, opts = {}) => {
    const nodes = []
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false)
    opts = Object.assign({
        char: '*',
        transform: char => opts.char,
        timeout: null
   }, opts)
    
    if (element.dataset['fuscFuscing'] === 'true') return
    element.dataset['fuscFuscing'] = 'true'

    // create node data structure for text
    while (walker.nextNode()) {
        const textNode = walker.currentNode
        textNode.origText = textNode.origText || textNode.textContent
        const textParts = textNode.textContent.split(' ')
        const tokenNodes = textParts.map((text, index) => { 
            return { textNode, text, index, 
                origText: textNode.origText.split(' ')[index] }
        })
        nodes.push(...tokenNodes)
    }


    // iterate each node and apply transform
    nodes.forEach((node, i) => {

        const fusced = (isFusced) => {
            if (i < nodes.length - 1) return
            element.dataset['fuscFuscing'] = false
            element.dataset['fuscDefusc'] = isFusced
        }

        const defusc = (node) => {
            const parts = node.textNode.textContent.split(' ')
            parts[node.index] = node.origText
            node.textNode.textContent = parts.join(' ')
            fusced(false)
        }

        const fusc = (node) => {
            if (node.text === '\n') return fusced(true)
            node.text = node.text.trim()
            const parts = node.textNode.textContent.split(' ')
            parts[node.index] = node.text.split('').map(opts.transform).join('')
            node.textNode.textContent = parts.join(' ')
            fusced(true)
        }

        const transform = element.dataset['fuscDefusc'] === 'true' ? defusc : fusc


        if (opts.timeout) {
            setTimeout(() => {
                transform(node)
            }, opts.timeout(i))
        } else {
            transform(node)
        }
    })
}

export default fusc 

