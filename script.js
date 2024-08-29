
let zSpacing = -1000,
    lastPos = zSpacing / 5,
    $frames = document.getElementsByClassName('frame'),
    frames = Array.from($frames),
    zVal = []

frames.forEach((el, i) => {
    zVal.push((i * zSpacing) + zSpacing)
    el.style.transform = `translateX(-50%) translateZ(${zVal[i]}px)`
})

function getScrollTop() {
    return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
}

const Scrolling = () => {
    let top = getScrollTop(),
        delta = lastPos - top

    lastPos = top

    frames.forEach((el, i) => {
        zVal[i] += delta * -2
        if(zVal[i] < 1300) {
            el.style.display = 'flex'
            el.style.transform = `translateX(-50%) translateZ(${zVal[i]}px)`
            el.style.opacity = zVal[i] < Math.abs(zSpacing) / 1.8 ? 1 : 0
        } else {
            el.style.display = 'none'
            return
        }
    })

}

window.addEventListener('scroll', Scrolling)

////////////////

const soundBtn = document.querySelector('.sound_button'),
      audio = document.querySelector('.audio')

soundBtn.addEventListener('click', e => {
    soundBtn.classList.toggle('paused')
    audio.paused ? audio.play() : audio.pause()
})

window.onfocus = function() { // когда вкладка активна
    soundBtn.classList.contains('paused') ? audio.pause() : audio.play()
}

window.onblur = function() { // когда вышел с вкладки
    audio.pause()
}


//open menu

let isOpen = false
let timer

const openMenu = (element) => {
    const navigation = element.closest('nav')
    const menuWidth = element.nextElementSibling.offsetWidth
    clearTimeout(timer)

    if(isOpen) {
        element.classList.add('active')

        navigation.style.width = `0px`

        timer = setTimeout(() => {
            element.classList.remove('active')
            element.style.transform = `translateY(-50%) scale(1)`
        }, 800)

        isOpen = false
    } else {
        element.classList.add('active')
        
        navigation.style.width = `${menuWidth + 20}px`

        timer = setTimeout(() => {
            element.classList.remove('active')
            element.style.transform = `translateY(-50%) scale(-1, -1)`
        }, 800)

        isOpen = true
    }
}

//mobile menu

let isMobileOpen = false
let mobileTimer

const openMobileMenu = (element) => {
    const mobileMenu = document.getElementById('mobile_menu') 
    clearTimeout(mobileTimer)

    if(isMobileOpen) {
        element.classList.add('active')

        mobileMenu.style.transform = `translate(100%)`

        mobileTimer = setTimeout(() => {
            element.classList.remove('active')
            element.style.transform = `scale(1)`
        }, 400)

        isMobileOpen = false
    } else {
        element.classList.add('active')
        
        mobileMenu.style.transform = `translate(0)`

        mobileTimer = setTimeout(() => {
            element.classList.remove('active')
            element.style.transform = `scale(-1, -1)`
        }, 400)

        isMobileOpen = true
    }
}
