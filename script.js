// 🔊 Enable music after first user interaction
document.body.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(err => {
            console.warn("Autoplay was blocked:", err);
        });
    }
}, { once: true });

const board = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');

// 🖼️ 15 images = 15 pairs = 30 cards
const images = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg',
    '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
    '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg'
];

const cards = [...images, ...images]; // duplicate for pairs
let shuffled = cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let lock = false;
let attempts = 0;
let matchedPairs = 0;
const totalPairs = images.length;

// 🧩 Generate cards
shuffled.forEach(imageName => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imageName;

    card.addEventListener('click', () => {
        if (lock || card.classList.contains('matched') || card === firstCard) return;

        card.style.backgroundImage = `url('img/${imageName}')`;

        if (!firstCard) {
            firstCard = card;
        } else {
            lock = true;
            attempts++;
            scoreDisplay.textContent = `Intentos: ${attempts}`;

            setTimeout(() => {
                if (card.dataset.image === firstCard.dataset.image) {
                    card.classList.add('matched');
                    firstCard.classList.add('matched');
                    matchedPairs++;

                    // ✅ Show win message if all matched
                    if (matchedPairs === totalPairs) {
                        showWinMessage();
                    }
                } else {
                    card.style.backgroundImage = "url('img/back.png')";
                    firstCard.style.backgroundImage = "url('img/back.png')";
                }

                firstCard = null;
                lock = false;
            }, 800);
        }
    });

    board.appendChild(card);
});

// 🏆 Show winning message
function showWinMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
    <h2 style="margin-top: 30px; color: #b83280;">¡Te ganaste mi amor! 💖</h2>
    <p style="font-size: 1rem; color: #555;">Bueno... en realidad ya lo tenías 😉</p>
  `;
    document.body.appendChild(message);
}
