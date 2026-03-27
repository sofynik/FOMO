document.addEventListener('DOMContentLoaded', () => {
    

    const soundFiles = [
        "assets/sounds/n1.mp3",
        "assets/sounds/n2.mp3",
    ]

    function scheduleRandomSound() {
        const delay = getRandomDelay()

        setTimeout(() => {
            const randomSound = soundFiles[getRandom(soundFiles.length)]
            const audio = new Audio(randomSound)

            audio.play()
            scheduleRandomSound()
        }, delay)
    }

    document.addEventListener("pointerdown", () => {
        scheduleRandomSound()
    }, { once: true })
})