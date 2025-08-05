// 🔊 Enable background music after first user click (fixes autoplay restrictions)
document.body.addEventListener('click', () => {
    const music = document.getElementById('bg-music');
    if (music && music.paused) {
        music.play().catch(err => {
            console.warn("Autoplay was blocked:", err);
        });
    }
}, { once: true }); // Run only once on first interaction

// 🧠 Game setup
const board = document.querySelector('.game-board');
const scoreDisplay = document.getElementById('score');

// 🖼️ Card image filenames (make sure these exist in /img/)
const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
const cards = [...images, ...images]; // duplicate each for matching
let shuffled = cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let lock = false;
let attempts = 0;

// 🧩 Create cards dynamically
shuffled.forEach(imageName => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imageName;

    // Card click logic
    card.addEventListener('click', () => {
        // Ignore clicks if locked, already matched, or same card
        if (lock || card.classList.contains('matched') || card === firstCard) return;

        // Flip card
        card.style.backgroundImage = `url('img/${imageName}')`;

        if (!firstCard) {
            // First card flipped
            firstCard = card;
        } else {
            // Second card flipped
            lock = true;
            attempts++;
            scoreDisplay.textContent = `Intentos: ${attempts}`;

            setTimeout(() => {
                if (card.dataset.image === firstCard.dataset.image) {
                    // Match found
                    card.classList.add('matched');
                    firstCard.classList.add('matched');
                } else {
                    // No match — flip back
                    card.style.backgroundImage = "url('img/back.png')";
                    firstCard.style.backgroundImage = "url('img/back.png')";
                }
                // Reset
                firstCard = null;
                lock = false;
            }, 800);
        }
    });

    board.appendChild(card);
});
