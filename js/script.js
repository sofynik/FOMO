document.addEventListener('DOMContentLoaded', () => {
    


    let activity = 100;
    const decayRate = 0.2;

    const fill = document.getElementById("activity-fill");
    const overlay = document.getElementById("overlay");

    function updateUI() {
    fill.style.width = activity + "%";

    if (activity > 60) {
        fill.style.background = "limegreen";
    } else if (activity > 30) {
        fill.style.background = "orange";
    } else {
        fill.style.background = "red";
    }
    const opacity = (100 - activity) / 100;
    overlay.style.opacity = opacity;
    }
    setInterval(() => {
    activity -= decayRate;
    if (activity < 0) activity = 0;
    updateUI();
    }, 50);

    function resetActivity() {
    activity = 100;
    updateUI();
    }

    ["mousemove", "mousedown", "scroll", "keydown", "touchstart"].forEach(event => {
    document.addEventListener(event, resetActivity);
    });

    updateUI();







    const phrases = [
        "Я думала все про это знают..",
        "Я это уже видел!",
        "Слышал про этот альбом?",
        "Может в четверг будут свободные места?",
        "Ты не слышал?",
        "У меня 1000 лайков за час",
        "Мне попалась лимитка",
        "Может вечером сходим туда?",
        "Я там был!",
        "У меня новый телефон, последняя версия",
        "Я его вчера видел!",
        "Сегодня последний день..",
        "Как тебе эта коллаборация?",
        "Ты смотрела церемонию награждения?",
        "Я вчера приготовила, тот десерт",
        "Сегодня последний день..",
        "Завтра вечеринка, ты идёшь?",
        "Может вечером сходим туда?",
        "Я там был!",
        "У меня новый телефон, последняя версия",
        "Я его вчера видел!",
        "Сегодня последний день..",
        "Как тебе эта коллаборация?",
        "Ты смотрела церемонию награждения?",
        "Я вчера приготовила, тот десерт",
        "Сегодня последний день..",
        "Завтра вечеринка, ты идёшь?"
    ];




    const container = document.querySelector(".phrases-container");
    if (!container) return;

    function createPhrases() {
        container.innerHTML = "";

        const placed = [];
        const containerRect = container.getBoundingClientRect();
        if (!containerRect.width || !containerRect.height) return;

        phrases.forEach((text) => {
        const el = document.createElement("div");
        el.classList.add("phrase");

        const sizeClass = ["size-1", "size-2", "size-3"][
            Math.floor(Math.random() * 3)
        ];
        el.classList.add(sizeClass);

        if (Math.random() > 0.5) {
            const blurClass = ["blur-1", "blur-2", "blur-3"][
            Math.floor(Math.random() * 3)
            ];
            el.classList.add(blurClass);
        }

        el.textContent = text;
        container.appendChild(el);

        const rect = el.getBoundingClientRect();
        const maxX = Math.max(0, containerRect.width - rect.width);
        const maxY = Math.max(0, containerRect.height - rect.height);

        let x = 0;
        let y = 0;
        let tries = 0;
        let placedOk = false;

        while (tries < 100 && !placedOk) {
            x = Math.random() * maxX;
            y = Math.random() * maxY;

            placedOk = true;

            for (const item of placed) {
            const overlap =
                x < item.x + item.w &&
                x + rect.width > item.x &&
                y < item.y + item.h &&
                y + rect.height > item.y;

            if (overlap) {
                placedOk = false;
                break;
            }
            }

            tries++;
        }

        el.style.left = `${(x / containerRect.width) * 100}%`;
        el.style.top = `${(y / containerRect.height) * 100}%`;

        placed.push({
            x,
            y,
            w: rect.width,
            h: rect.height
        });
        });
    }

    createPhrases();



    const section4 = document.getElementById('four');
    const canvas = document.getElementById('eraseCanvas');
    const blurLayer = document.querySelector('.blur-layer');

    if (section4 && canvas && blurLayer) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let isInitialized = false;

    function updateMask() {
        const url = canvas.toDataURL();
        blurLayer.style.maskImage = `url(${url})`;
        blurLayer.style.webkitMaskImage = `url(${url})`;
        blurLayer.style.maskRepeat = 'no-repeat';
        blurLayer.style.webkitMaskRepeat = 'no-repeat';
        blurLayer.style.maskSize = '100% 100%';
        blurLayer.style.webkitMaskSize = '100% 100%';
    }

    function resizeCanvas() {
        const prevCanvas = document.createElement('canvas');
        const prevCtx = prevCanvas.getContext('2d');

        prevCanvas.width = canvas.width;
        prevCanvas.height = canvas.height;

        if (canvas.width > 0 && canvas.height > 0) {
        prevCtx.drawImage(canvas, 0, 0);
        }

        canvas.width = section4.offsetWidth;
        canvas.height = section4.offsetHeight;

        ctx.globalCompositeOperation = 'source-over';

        if (!isInitialized) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        isInitialized = true;
        } else {
        ctx.drawImage(prevCanvas, 0, 0, canvas.width, canvas.height);
        }

        updateMask();
    }

    function erase(x, y) {
        ctx.globalCompositeOperation = 'destination-out';

        const radius = 80;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(0.3, 'rgba(0,0,0,0.5)');
        gradient.addColorStop(0.6, 'rgba(0,0,0,0.15)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    function getPointerPosition(e) {
        const rect = canvas.getBoundingClientRect();
        return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
        };
    }

    canvas.addEventListener('pointerdown', (e) => {
        isDrawing = true;
        if (canvas.setPointerCapture) {
        canvas.setPointerCapture(e.pointerId);
        }

        const { x, y } = getPointerPosition(e);
        erase(x, y);
        updateMask();
    });

    canvas.addEventListener('pointermove', (e) => {
        if (!isDrawing) return;

        const { x, y } = getPointerPosition(e);
        erase(x, y);
        updateMask();
    });

    function stopDrawing(e) {
        isDrawing = false;
        if (e && canvas.releasePointerCapture) {
        try {
            canvas.releasePointerCapture(e.pointerId);
        } catch (_) {}
        }
    }

    canvas.addEventListener('pointerup', stopDrawing);
    canvas.addEventListener('pointercancel', stopDrawing);
    canvas.addEventListener('lostpointercapture', () => {
        isDrawing = false;
    });

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    }
})
