import fusc from '../'

window.onclick = () => fusc(document.querySelector('.text'), {
    char: '@',
    timeout: index => Math.floor(Math.random() * 7) * index
})
