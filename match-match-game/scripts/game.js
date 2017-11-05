class Game {
    constructor() {
        this.gameSection = document.querySelector('#game');
        this.difficulty = '12';
        this.skirt = document.querySelector('#skirt2');
        this.cardsInScreen;
        this.cards = [];
        this.currentCard;
        this.timer;
        this.screen = 'initial';
    }

    // Здесь задаются изначальные обработчики событий
    addInitialListeners() {
        const header = document.querySelector('.game > header');
        header.addEventListener('click', this.onRestart.bind(this));

        const skirts = document.querySelector('#skirts');
        skirts.addEventListener('click', this.onAddskirt.bind(this));

        const difficulty = document.querySelector('#difficulty');
        difficulty.addEventListener('click', this.onAddDificulty.bind(this));

        const startButton = document.querySelector('#start-button');
        startButton.addEventListener('click', this.onStartGame.bind(this));
    }

    // Обработчик события для записи вида рубашки в this.skirt
    onAddskirt(e) {
        const target = e.target;
        const skirt1 = document.querySelector('#skirt1');
        const skirt2 = document.querySelector('#skirt2');
        const skirt2img = document.querySelector('.option1 > img');

        if (target === skirt2) {
            target.classList.add('chosen');
            skirt1.classList.remove('chosen');
            this.skirt = skirt2;
        } else if (target === skirt1) {
            target.classList.add('chosen');
            skirt2.classList.remove('chosen');
            this.skirt = skirt1;
        }
        if (target === skirt2img) {
            skirt1.classList.add('chosen');
            skirt2.classList.remove('chosen');
            this.skirt = skirt1;
        }
    }


    // Обработчик события для записи значения в this.difficulty и формирования массива карт, в зависимости от выбранной сложности
    onAddDificulty(e) {
        const target = e.target;

        const rightArrow = document.querySelector('#diff-higher');
        const leftArrow = document.querySelector('#diff-lower');

        const div = document.querySelector('.card');
        const actualLevel = div.getAttribute('id');

        const switchCard = (figcText, pText, url, level) => {
            const figure = document.querySelector('.card');
            const figcaption = document.querySelector('.card > figcaption');
            figcaption.textContent = figcText;
            const p = document.querySelector('.card > p');
            p.textContent = pText;
            const img = document.querySelector('.card > img');
            img.setAttribute('src', url);
            figure.setAttribute('id', level);
            if (level === 'hard') {
                this.difficulty = '12';
            } else if (level === 'ok') {
                this.difficulty = '8';
            } else {
                this.difficulty = '6';
            }
        };

        if (target === rightArrow) {
            switch (actualLevel) {
                case 'hard':
                    switchCard('easy peasy', '6 cards', 'images/easy.png', 'easy');
                    break;
                case 'ok':
                    switchCard('hard as hell', '12 cards', 'images/hard.png', 'hard');
                    break;
                case 'easy':
                    switchCard('ok', '8 cards', 'images/ok.png', 'ok');
                    break;
            }
        }

        if (target === leftArrow) {
            switch (actualLevel) {
                case 'ok':
                    switchCard('easy peasy', '6 cards', 'images/easy.png', 'easy');
                    break;
                case 'easy':
                    switchCard('hard as hell', '12 cards', 'images/hard.png', 'hard');
                    break;
                case 'hard':
                    switchCard('ok', '8 cards', 'images/ok.png', 'ok');
                    break;
            }
        }
    }


    // Обработчик события на клик по кнопке start game
    onStartGame(e) {
        // function для создания массива для card.dataset
        const makeCards = (difficulty) => {
            const arr = [];
            for (let i = difficulty / 2; i > 0; i--) {
                arr.push(i);
                arr.push(i);
            }
            return arr;
        };

        //Добавление карт в массив, в зависимости от сложности игры, и реализовать метод, который будет делать рандомную сортировку этого массива.
        this.cards = makeCards(this.difficulty);

        // Перемешиваем наши карты
        this.shuffleCards(this.cards);

        /*this.gameSection.removeEventListener('click', this.onGameProcess.bind(this));*/
        this.currentCard = null; // Обнуление текущей карты, на всякий случай
        this.cardsInScreen = this.difficulty;

        const card = this.skirt;
        if (this.screen === 'initial'){
            card.classList.toggle('chosen');
            card.classList.toggle('card-hover');
        }

        this.gameSection.innerHTML = '';

        for (let i = 0; i < this.cards.length; i++) {
            let cardClone = card.cloneNode(true);
            cardClone.setAttribute('data-card', this.cards[i]);
            this.gameSection.appendChild(cardClone);
            cardClone.classList.add('rotate');
        }

        const cardArr = Array.from(this.gameSection.children);
        cardArr.forEach(e => {
            e.classList.remove('rotate');
        });

        /*
            this.timer = setTimeout(this.onPlayerLose.bind(this), 60000);
        */
        this.cardsInScreen = this.difficulty;
        if (this.screen === 'initial') {
            this.gameSection.addEventListener('click', this.onGameProcess.bind(this));
        }
        this.screen = 'game';
    }

    onRestart(e) {
        this.screen = 'initial';
        this.gameSection.removeEventListener('click', this.onGameProcess.bind(this));
    }

    // Обработчик события, в котором проходит основной игровой процесс (удаляются карты и проходят проверки на окончание игры)
    onGameProcess(e) {

        const target = e.target;
        const gameSection = document.querySelector('#game');

        if (target.parentElement === gameSection) {
            target.classList.add('rotate');
            const cardData = target.dataset.card;
            console.log(cardData);
        }
        /*
          	if (this.currentCard) {
            	// проверка на то, что в this.currentCard то же, что и в текущей карте
              // Если карты совпадают, то они удаляются из DOM (с запуском анимации) и уменьшается this.cardsInScreen на 2, то есть удаляются 2 карты из нашего объекта, для того чтобы можно было проверить, когда окончание игры
            }

            // Когда закончились карты, запускается метод окончания игры
            if (!this.cardsInScreen) {
            	this.onPlayerWin();
                clearTimeout(this.timer);
            }
        */
    }



    // Запускается, когда player выиграл
    onPlayerWin() {
        this.gameSection.innerHTML = '<div style="font-size:100px">congratulations</div>';
    }


    // Запускается, когда player проиграл
    onPlayerLose() {
        this.gameSection.innerHTML = '<div style="font-size:100px">HA-HA-HA</div>';
    }


    // Метод для сортировки карт
    shuffleCards(arr) {
        let input = arr;

        for (var i = input.length - 1; i >= 0; i--) {
            let randomIndex = Math.floor(Math.random() * (i + 1));
            let itemAtIndex = input[randomIndex];

            input[randomIndex] = input[i];
            input[i] = itemAtIndex;
        }
        return input;
    }
}

// создание объекта и запуск
const game = new Game;
game.addInitialListeners();
