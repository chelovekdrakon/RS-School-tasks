class Game {
    constructor() {
        this.gameSection = document.querySelector('#game');
        this.difficulty = '12';
        this.skirt = document.querySelector('#skirt2');
        this.cardsInScreen;
        this.cards = [];
        this.cardsSkirts = [];
        this.previousCard;
        this.timer = 60;
        this.timerId;
        this.screen = 'initial';
        this.imageInside = false;
        this.freeze = 0;
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
            this.imageInside = false;
        } else if (target === skirt1) {
            target.classList.add('chosen');
            skirt2.classList.remove('chosen');
            this.skirt = skirt1;
            this.imageInside = true;
        }
        if (target === skirt2img) {
            skirt1.classList.add('chosen');
            skirt2.classList.remove('chosen');
            this.skirt = skirt1;
            this.imageInside = true;
        }
    }


    // Обработчик события для записи значения в this.difficulty и формирования массива карт, в зависимости от выбранной сложности
    onAddDificulty(e) {
        const target = e.target;

        // Выполняет
        const switchCard = (levelDescription, numberOfCards, url, level) => {
            const figure = document.querySelector('.card');
            const figcaption = document.querySelector('.card > figcaption');
            figcaption.textContent = levelDescription;
            const p = document.querySelector('.card > p');
            p.textContent = numberOfCards;
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

        const rightArrow = document.querySelector('#diff-higher');
        const leftArrow = document.querySelector('#diff-lower');

        const cardOfDifficulty = document.querySelector('.card');
        const actualLevel = cardOfDifficulty.getAttribute('id');

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
        // Если рестарт
        this.timer = 60;
        clearInterval(this.timerId);

        // function для создания массива для card.dataset
        const makeCards = (difficulty) => {
            const arr = [];
            for (let i = difficulty / 2; i > 0; i--) {
                arr.push(i);
                arr.push(i);
            }
            return arr;
        };

        //Добавление карт в массив, в зависимости от сложности игры, и перемешиваем наши карты
        this.cards = makeCards(this.difficulty);
        this.shuffleCards(this.cards);

        // Creating cards array
        const card = this.skirt;
        for (let i = 0; i < this.cards.length; i++) {
            let cardClone = card.cloneNode(true);
            cardClone.setAttribute('data-card', this.cards[i]);
            cardClone.setAttribute('data-number', i);

            if (this.imageInside) {
                cardClone.firstElementChild.remove();
            }

            cardClone.style = 'background: white';
            const img = document.createElement('img');
            img.setAttribute('src', `images/${cardClone.dataset.card}.png`);
            cardClone.appendChild(img);
            this.cards[i] = cardClone;
        }

        this.previousCard = null; // Обнуление текущей карты, на всякий случай
        this.cardsInScreen = this.difficulty;

        if (this.screen === 'initial') {
            const arr = Array.from(this.gameSection.children);
            arr.forEach(card => {
                card.classList.toggle('chosen');
                card.classList.toggle('card-hover');
            });
        }
        this.gameSection.innerHTML = '';

        for (let i = 0; i < this.cards.length; i++) {
            const cardClone = this.skirt.cloneNode(true);
            cardClone.setAttribute('data-number', i);
            this.gameSection.appendChild(cardClone);
            this.cardsSkirts.push(cardClone);
            cardClone.classList.add('rotate');
        }

        setTimeout(() => {
            const cardArr = Array.from(this.gameSection.children);
            cardArr.forEach(e => {
                e.classList.remove('rotate');
            });
        }, 700);

        this.cardsInScreen = this.difficulty;
        if (this.screen === 'initial') {
            this.gameSection.addEventListener('click', this.onGameProcess.bind(this));
        }
        this.screen = 'game';

        // Если рестарт после проигрыша
        this.freeze = 0;
        if (document.querySelector('.result')) {
            const results = document.querySelectorAll('.result');
            const resArr = Array.from(results);
            resArr.forEach(e => {
                e.remove();
            });
        }


        const timerBlock = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = this.timer;
        timerBlock.appendChild(span);
        timerBlock.classList.add('timer-block');
        this.gameSection.appendChild(timerBlock);

        this.timerId = setInterval(() => {
            this.timer--;
            span.textContent = this.timer;
            if (this.timer === 0){
                this.onPlayerLose();
                clearInterval(this.timerId);
                this.freeze = 1;
            }
            if (this.timer < 10){
                span.style = 'color: red';
            }
        }, 1000);
    }

    onRestart(e) {
        this.screen = 'initial';
        this.freeze = 0;
        this.gameSection.removeEventListener('click', this.onGameProcess.bind(this));
        this.timer = 60;
        clearInterval(this.timerId);
    }

    // Обработчик события, в котором проходит основной игровой процесс (удаляются карты и проходят проверки на окончание игры)
    onGameProcess(e) {

        let target = e.target;
        const gameSection = this.gameSection;

        if (target.parentElement.parentElement === gameSection) {
            target = target.parentElement;
        }
        if (this.previousCard) {
            if (target.dataset.number === this.previousCard.dataset.number) {
                return;
            }
        }
        if (this.freeze === 1) {
            return;
        }

        if (target.parentElement === gameSection) {

            const cardNumber = target.dataset.number;
            target.outerHTML = this.cards[cardNumber].outerHTML;
            target = gameSection.children[cardNumber];

            target.classList.add('rotate');
            setTimeout(() => {
                target.classList.remove('rotate');
            }, 600);

            if (!this.previousCard) {
                this.previousCard = target;
            } else if (this.cards[target.dataset.number].dataset.card === this.cards[this.previousCard.dataset.number].dataset.card) {
                // target.classList.add('rotate');
                this.freeze = 1;
                setTimeout(() => {
                    target.classList.add('hide');
                    this.previousCard.classList.add('hide');
                    this.previousCard = null;
                    this.freeze = 0;
                }, 1000);
                this.cardsInScreen -= 2;
            } else {
                const previousNumber = this.previousCard.dataset.number;
                const targetNumber = target.dataset.number;

                setTimeout(() => {
                    target.classList.add('rotateBack');
                    this.previousCard.classList.add('rotateBack');

                    target.style = 'background: red';
                    this.previousCard.style = 'background: red';

                }, 700);
                setTimeout(() => {
                    const previousNumber = this.previousCard.dataset.number;
                    gameSection.children[previousNumber].outerHTML = this.cardsSkirts[previousNumber].outerHTML;

                    const targetNumber = target.dataset.number;
                    gameSection.children[targetNumber].outerHTML = this.cardsSkirts[targetNumber].outerHTML;

                    this.previousCard = null;
                    this.freeze = 0;
                }, 1000);

                this.freeze = 1;
            }

            // Когда закончились карты, запускается метод окончания игры
            if (this.cardsInScreen == 0) {
                setTimeout(this.onPlayerWin.bind(this), 1500);
                // clearTimeout(this.timer);
            }
        }
    }



    // Запускается, когда player выиграл
    onPlayerWin() {
        clearInterval(this.timerId);
        this.gameSection.lastChild.remove();

        const cardArr = Array.from(this.gameSection.children);
        cardArr.forEach(e => {
            e.classList.remove('hide');
            e.classList.add('rotation');
        });

        const textBlock = document.createElement('div');
        textBlock.classList.add('result');

        const text = 'congratulations';
        const textArr = text.split('').reverse();

        for (let i = textArr.length; i >= 0; i--) {
            const p = document.createElement('p');
            p.textContent = textArr[i];
            p.style = 'color: #26d240';
            textBlock.appendChild(p);
        }

        this.gameSection.appendChild(textBlock);
    }


    // Запускается, когда player проиграл
    onPlayerLose() {
        const textBlock = document.createElement('div');
        textBlock.classList.add('result');

        const text = 'HA-HA-HA';
        const textArr = text.split('').reverse();

        for (let i = textArr.length; i >= 0; i--) {
            const p = document.createElement('p');
            p.textContent = textArr[i];
            textBlock.appendChild(p);
            p.style = 'color: red';
        }

        for (let i = 0; i<this.cards.length; i++){
            this.gameSection.children[i].classList.add('card-shadow-lose');
            setTimeout(()=>{
                this.gameSection.children[i].classList.remove('card-shadow-lose');
            },1000);
        }
        this.gameSection.appendChild(textBlock);
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
