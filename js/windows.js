document.addEventListener('DOMContentLoaded', () => {
    
    const section1 = document.querySelector("#two")

    function getRandom(max) {
        return Math.floor(Math.random() * max)
    }

    function getRandomDelay() {
        return 100 + getRandom(901)
    }

    const windowContent = [
        { text: "Новая лимитированная коллекция кроссовок ", img: "Nike.jpg" },
        { text: "Что сегодня?", img: "today.jpg" },
        { text: "Новое весеннее меню!", img: "Menu.jpg" },
        { text: "Успей попробовать", img: "Now.svg" },
        { text: "Последний день в городе!", img: "concert.svg" },
        { text: "Цифровая эпоха", img: "twitch.svg" },
    ]
    
    
    let cnt = 0
    setInterval(() => {
        const rect = section1.getBoundingClientRect()

        const temp = document.createElement("div")
        temp.className = "window"
        temp.style.visibility = "hidden"
        section1.appendChild(temp)

        const windowWidth = temp.offsetWidth
        const windowHeight = temp.offsetHeight

        temp.remove()

        const maxLeft = Math.max(0, rect.width - windowWidth)
        const maxTop = Math.max(0, rect.height - windowHeight)

        const left = getRandom(maxLeft + 1)
        const top = getRandom(maxTop + 1)

        const item = windowContent[getRandom(windowContent.length)]

        if (cnt <= 15){
            section1.insertAdjacentHTML(
                "beforeend",
                `
                <div class="window" style="left:${left}px; top:${top}px;">
                    <div class="panel">
                        <div class="circle"></div>   
                        <div class="window-text">${item.text}</div>
                    </div>
                    <img class="window-img" src="assets/img/${item.img}" alt="">
                </div>
                `
            )

            cnt++

            const newWindow = section1.lastElementChild
            const closeWindow = newWindow.querySelector(".circle")

            closeWindow.addEventListener("click", () => {
                newWindow.remove()
                cnt--
            })
        }
    }, 1000)
})