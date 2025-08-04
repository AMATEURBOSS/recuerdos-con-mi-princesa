const board = document.querySelector('.game-board');

// You can use any 6–8 images here; we're using 6 for a 12-card game
const images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'];
const cards = [...images, ...images]; // Duplicate for matching
let shuffled = cards.sort(() => 0.5 - Math.random());

let firstCard = null;
let lock = false;

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
            setTimeout(() => {
                if (card.dataset.image === firstCard.dataset.image) {
                    card.classList.add('matched');
                    firstCard.classList.add('matched');
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

