window.duanduanGameChaoJiYongShi.classes.GameRoundFighterStatusBar = (function () {
    const fighterHealthyRanges = {
        'role-is-healthy': 75,
        'role-is-wounded': 30,
        'role-is-dying': NaN,
    }


    const app = window.duanduanGameChaoJiYongShi
    const { utils, classes } = app
    const { createDOMWithClassNames } = utils


    return function GameRoundFighterStatusBar(fighter) {
        const { GameRole } = classes

        if (!new.target) {
            throw new Error('必须使用 new 运算符来调用 GameRoundFighterStatusBar 构造函数。')
        }

        if (!(fighter instanceof GameRole)) {
            throw new TypeError('创建【游戏局斗士血条】时，必须指明其应隶属于哪个【游戏角色】。')
        }

        this.data = {
            fighter,
        }

        this.updateBasedOnFighterCurrentData = updateBasedOnFighterCurrentData.bind(this)
        this.setFighterHPBar                 = setFighterHPBar                .bind(this)

        _init.call(this)

        // console.log(`“${fighter.data.name}”的【游戏局斗士血条】创建完毕。`)
    }



    function _init() {
        _createDOMs.call(this)
        this.setFighterHPBar(100)
    }

    function _createDOMs() {
        const {
            fighter,
        } = this.data

        const fighterData = fighter.data

        const rootElement = createDOMWithClassNames('div', [
            'role-status-bar',
            `player-${fighterData.playerId}`,
        ])

        const hpBarContainerElement = createDOMWithClassNames('div', [
            'hp-bar-container',
        ])

        const hpBarElement = createDOMWithClassNames('div', [
            'hp-bar',
        ])

        const hpElement = createDOMWithClassNames('div', [
            'hp',
        ])

        const avatarElement = createDOMWithClassNames('div', [
            'fighter-avatar',
        ])

        const { playerId, name: fighterName } = fighter.data

        const playerIdElement = createDOMWithClassNames('div', [
            'player-id',
            `player-${playerId}`,
        ])
        playerIdElement.innerText = playerId

        const fighterNameElement = createDOMWithClassNames('div', [
            'fighter-name',
        ])
        fighterNameElement.innerText = fighterName

        avatarElement.style.backgroundImage = `url(${fighterData.images.avatar.filePath})`


        hpBarElement.appendChild(hpElement)
        hpBarContainerElement.appendChild(hpBarElement)
        rootElement.appendChild(hpBarContainerElement)

        rootElement.appendChild(playerIdElement)
        rootElement.appendChild(avatarElement)
        rootElement.appendChild(fighterNameElement)


        this.el = {
            root: rootElement,
            avatar: avatarElement,
            // hpBar: hpBarElement,
            hp: hpElement,
        }
    }

    function setFighterHPBar(percentage) {
        const {
            // hpBar,
            hp,
        } = this.el

        hp.style.width = `${percentage}%`

        hp.className = `hp `
        if (percentage >= fighterHealthyRanges['role-is-healthy']) {
            hp.className += 'role-is-healthy'
        } else if (percentage >= fighterHealthyRanges['role-is-wounded']) {
            hp.className += 'role-is-wounded'
        } else {
            hp.className += 'role-is-dying'
        }
    }

    function updateBasedOnFighterCurrentData() {
        const {
            fullHealthPoint,
            healthPoint,
        } = this.data.fighter.data

        const percentage = healthPoint * 100 / fullHealthPoint

        // console.log('HP:', healthPoint, '/', fullHealthPoint)
        // console.log('HP%:', percentage)

        this.setFighterHPBar(percentage)
    }
})();
