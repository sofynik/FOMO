document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("webcam");

    async function startWebcam() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
                audio: false
            });

            video.srcObject = stream;
        } catch (err) {
            console.error("Ошибка доступа к камере:", err);
        }
    }

    startWebcam();

    const container = document.querySelector('.webcam_content');
    const itemsContainer = document.querySelector('.mouse-items');

    const itemsData = [
        { img: 'assets/windows_img/1.svg', text: 'New photo' },
        { img: 'assets/windows_img/2.svg', text: 'New photo' },
        { img: 'assets/windows_img/3.svg', text: 'New photo' },
        { img: 'assets/windows_img/4.svg', text: 'New photo' },
        { img: 'assets/windows_img/5.svg', text: 'New photo' },
        { img: 'assets/windows_img/6.svg', text: 'New photo' },
        { img: 'assets/windows_img/7.svg', text: 'New photo' },
        { img: 'assets/windows_img/8.svg', text: 'New photo' },
        { img: 'assets/windows_img/9.svg', text: 'New photo' },
        { img: 'assets/windows_img/10.svg', text: 'New photo' }
    ];

    const items = [];

    itemsData.forEach((data, i) => {
        const el = document.createElement('div');
        el.className = 'mouse-item';

        el.innerHTML = `
            <img src="${data.img}" alt="">
            <p>${data.text}</p>
        `;

        itemsContainer.appendChild(el);

        items.push({
            el,
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,

            speed: 0.03 + Math.random() * 0.02,

            offsetX: (i - (itemsData.length - 1) / 2) * 80,
            offsetY: (i % 2 === 0 ? -60 : 60),

            radius: 80 + Math.random() * 60
        });
    });

    let mouse = { x: 0, y: 0 };
    let isInside = false;

    function setTargetsToCenter() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        const centerX = width / 2;
        const centerY = height / 2;

        items.forEach((item) => {
            item.targetX = centerX + item.offsetX + (Math.random() - 0.5) * 40;
            item.targetY = centerY + item.offsetY + (Math.random() - 0.5) * 40;
        });
    }

    container.addEventListener('mouseenter', () => {
        isInside = true;
    });

    container.addEventListener('mouseleave', () => {
        isInside = false;
        setTargetsToCenter();
    });

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();

        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    function animate() {
        const width = container.clientWidth;
        const height = container.clientHeight;

        items.forEach((item, i) => {
            if (isInside) {
                item.targetX = mouse.x + Math.sin(i * 1.5) * item.radius;
                item.targetY = mouse.y + Math.cos(i * 1.5) * item.radius;
            }

            const ease = item.speed;

            item.x += (item.targetX - item.x) * ease;
            item.y += (item.targetY - item.y) * ease;

            const elW = item.el.offsetWidth;
            const elH = item.el.offsetHeight;

            const halfW = elW / 2;
            const halfH = elH / 2;

            item.x = Math.max(halfW, Math.min(item.x, width - halfW));
            item.y = Math.max(halfH, Math.min(item.y, height - halfH));

            item.el.style.left = `${item.x}px`;
            item.el.style.top = `${item.y}px`;
        });

        requestAnimationFrame(animate);
    }

    setTargetsToCenter();

    items.forEach((item) => {
        item.x = item.targetX;
        item.y = item.targetY;
    });

    animate();

    window.addEventListener('resize', () => {
        if (!isInside) {
            setTargetsToCenter();
        }
    });
});