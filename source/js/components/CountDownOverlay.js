window.duanduanGameChaoJiYongShi.classes.CountDownOverlay = (function () {
    const { utils } = window.duanduanGameChaoJiYongShi
    const { createDOMWithClassNames } = utils

    return function CountDownOverlay() {
        if (!new.target) {
            throw new Error('必须使用 new 运算符来调用 CountDownOverlay 构造函数。')
        }

        this.remainedSeconds = 0

        this.countDown     = countDown    .bind(this)
        this.countDownOnce = countDownOnce.bind(this)
        
        _init.call(this)

        console.log('【倒计时覆盖层】创建完毕。')
    }



    function _init() {
        _createDOMs.call(this)
        this.el.root.style.display = 'none'
    }

    function _createDOMs() {
        const rootElement = createDOMWithClassNames('div', [
            'count-down-overlay',
        ])

        const backdropElement = createDOMWithClassNames('div', [
            'backdrop',
        ])

        const modalElement = createDOMWithClassNames('div', [
            'modal',
        ])

        const infoElement = createDOMWithClassNames('div', [
            'info',
        ])

        const digitElement = createDOMWithClassNames('div', [
            'digit',
        ])

        modalElement.appendChild(infoElement)
        modalElement.appendChild(digitElement)

        rootElement.appendChild(backdropElement)
        rootElement.appendChild(modalElement)
        
        this.el = {
            root: rootElement,
            info: infoElement,
            digit: digitElement,
        }
    }

    function countDownOnce(timing) {
        return new Promise(resolve => {
            this.el.digit.innerText = this.remainedSeconds
            setTimeout(() => {
                this.remainedSeconds--
                resolve()
            }, timing || 1000)
        })
    }

    async function countDown(secondsToCountDown, info) {
        this.remainedSeconds = secondsToCountDown

        if (!(this.remainedSeconds > 0)) {
            return
        }

        const {
            root: rootElement,
            info: infoElement,
        } = this.el

        const rootElementStyle = rootElement.style

        rootElementStyle.display = ''
        infoElement.innerText = info

        while (this.remainedSeconds > 0) {
            await this.countDownOnce()
        }

        rootElement.classList.add('is-leaving')
        await this.countDownOnce(320)

        rootElementStyle.display = 'none'
        infoElement.innerText = ' '
        rootElement.classList.remove('is-leaving')
    }
})();
