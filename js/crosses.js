function createRandomElements({
  containerSelector,
  count = 50
}) {
  const container = document.querySelector(containerSelector);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.classList.add('plus');

    el.textContent = "+";

    const margin = 5;
    const x = margin + Math.random() * (100 - margin * 2);
    const y = margin + Math.random() * (100 - margin * 2);

    el.style.left = x + '%';
    el.style.top = y + '%';

    container.appendChild(el);
  }
}
window.addEventListener('load', () => {
  createRandomElements({
    containerSelector: '#random-container',
    count: 50,
  });
});