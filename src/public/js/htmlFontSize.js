export function px2rem(px) {
    const ratio = 375 / 10
    return px / ratio
}

export function realPx(px) {
    const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
    return px * (maxWidth / 375)
}



export function initRem(){
    function initHtmlFontSize(){
        let fontSize = window.innerWidth / 10
        fontSize = fontSize > 50 ? 50 : fontSize
        const html = document.querySelector('html')
        html.style.fontSize = fontSize + 'px'
    }

    initHtmlFontSize()

    document.addEventListener('DOMContentLoaded', initHtmlFontSize)
}




