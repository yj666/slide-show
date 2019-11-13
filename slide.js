const showImageAtIndex = function(slide, index) {
    // 设置父节点的 data-active
    slide.dataset.active = String(index)
    let nextSelector = '#id-image-' + String(index)
    // 删除当前图片的 class 给下一张图片加上 class
    let className = 'active'
    removeClassAll(className)
    let img = e(nextSelector)
    img.classList.add(className)
}

const showIndicatorAtIndex = function(index) {
    // 切换小圆点
    // 删除当前小圆点的 class
    removeClassAll('white')
    // 2. 得到下一个小圆点的选择器
    let indiSelector = '#id-indi-' + String(index)
    let indi = e(indiSelector)
    indi.classList.add('white')
}

const showAtIndex = function(slide, index) {
    showImageAtIndex(slide, index)
    showIndicatorAtIndex(index)
}

const nextIndex = function(slide, offset) {
    let numberOfImgs = parseInt(slide.dataset.imgs, 10)
    let activeIndex = parseInt(slide.dataset.active, 10)
    // 上一张图片是 -1
    // 下一张图片是 1
    // 求出下一张图片的 id
    let i = (activeIndex + offset + numberOfImgs) % numberOfImgs
    return i
}

const bindEventSlide = function() {
    let selector = '.slide-button'
    bindAll(selector, 'click', function(event) {
        let button = event.target
        let slide = button.closest('.slide')
        let offset = Number(button.dataset.offset)
        let index = nextIndex(slide, offset)
        showAtIndex(slide, index)
    })
}

const bindEventIndicator = function() {
    let selector = '.slide-indi'
    bindAll(selector, 'mouseover', function(event) {
        let self = event.target
        let index = Number(self.dataset.index)
        // 直接播放第 n 张图片
        let slide = self.closest('.slide')
        showAtIndex(slide, index)
    })
}

const bindEvents = function() {
    bindEventSlide()
    bindEventIndicator()
}

const playNextImage = function() {
    let slide = e('.slide')
    let index = nextIndex(slide, 1)
    showAtIndex(slide, index)
}

const autoPlay = function() {
    let interval = 2000
    setInterval(function() {
        playNextImage()
    }, interval)
}

const __main = function() {
    bindEvents()
    autoPlay()
}

__main()
