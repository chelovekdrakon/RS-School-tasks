class Game {
    constructor() {
        this.gameSection = document.querySelector('#game-panel');
        this.difficulty = '12';
        this.skirt = document.querySelector('#skirt2');
        this.cardsInScreen;
        this.cards = []; // created array with data
        this.cardsSkirts = []; // created array of skirts
        this.previousCard;
        this.timer = 60;
        this.timerId;
        this.screen = 'initial'; // Если начинаем игру с первого экрана - 'initial', если рестарт - 'game'
        this.imageInside = false;
        this.freeze = 0; // freezing interface during animation etc.
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

        // Выполняет диномическое создание карты сложности при её переключении
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

        // function для создания массива данных для card.dataset
        const makeCards = (difficulty) => {
            const arr = [];
            for (let i = difficulty / 2; i > 0; i--) {
                arr.push(i);
                arr.push(i);
            }
            return arr;
        };

        //Добавляем массив данных для карт, и перемешиваем наши карты
        this.cards = makeCards(this.difficulty);
        this.shuffleCards(this.cards);

        // Создаем карты в соответствии с data, которую мы записали в this.cards и заменяем data на карту
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

        this.gameSection.innerHTML = '';

        for (let i = 0; i < this.cards.length; i++) {
            const cardClone = this.skirt.cloneNode(true);
            cardClone.setAttribute('data-number', i);
            this.gameSection.appendChild(cardClone);
            this.cardsSkirts.push(cardClone);
            cardClone.classList.add('rotate');
        }
        this.freeze = 1;
        setTimeout(() => {
            const cardArr = Array.from(this.gameSection.children);
            cardArr.forEach(e => {
                e.classList.remove('rotate');
            });
            this.freeze = 0;
        }, 700);

        // Снимаем класс chosen, который присуствовал на карте-родителе и добавляем hover
        const arr = Array.from(this.gameSection.children);
        arr.forEach(card => {
            card.classList.toggle('chosen');
            card.classList.toggle('card-hover');
        });

        this.cardsInScreen = this.difficulty;
        if (this.screen === 'initial') {
            this.gameSection.addEventListener('click', this.onGameProcess.bind(this));
        }
        this.screen = 'game';

        // Если рестарт после проигрыша/победы снимаем block и удаляем добавленный div с поздравлением
        this.freeze = 0;
        if (document.querySelector('.result')) {
            const results = document.querySelectorAll('.result');
            const resArr = Array.from(results);
            resArr.forEach(e => {
                e.remove();
            });
        }

        // Создаем таймер
        const timerBlock = document.createElement('div');
        const span = document.createElement('span');
        span.textContent = this.timer;
        timerBlock.appendChild(span);
        timerBlock.classList.add('timer-block');
        this.gameSection.appendChild(timerBlock);

        this.timerId = setInterval(() => {
            this.timer--;
            span.textContent = this.timer;
            if (this.timer === 0) {
                this.onPlayerLose();
                clearInterval(this.timerId);
                this.freeze = 1;
            }
            if (this.timer < 10) {
                span.style = 'color: red';
            }
        }, 1000);
    }

    // Если пользователь делает рестарт через logo
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

        // Если нажимает на img внутри карты -> таргет переопределяется на родителя
        if (target.parentElement.parentElement === gameSection) {
            target = target.parentElement;
        }
        // Если нажимает на одну и ту же карту дважды -> выкидываем
        if (this.previousCard) {
            if (target.dataset.number === this.previousCard.dataset.number) {
                return;
            }
        }
        // Если стоит блок блок -> выкидываем
        if (this.freeze === 1) {
            return;
        }
        // Если таргет - карта -> выполняем проверку
        if (target.parentElement === gameSection) {
            // Перерисовывем карту в зависимостри от её номера и переопределяем таргет на неё
            const cardNumber = target.dataset.number;
            target.outerHTML = this.cards[cardNumber].outerHTML;
            target = gameSection.children[cardNumber];

            // Анимация переворота
            target.classList.add('rotate');
            setTimeout(() => {
                target.classList.remove('rotate');
            }, 600);

            if (!this.previousCard) {
                this.previousCard = target;
            } else {
                // При старте мы создали два массива, в одном хронятся карты которые будут отрисовываться при перевороте,
                // в другом рубашки. В обоих мосивах номер соответсвтует. Сравниваю по номерам, чтобы не показывать дату, которая в картах массива this.cards.
                // Ну и при использовании outerHTML возникли проблемы ;D
                const previousNumber = this.previousCard.dataset.number;
                const targetNumber = target.dataset.number;

                if (this.cards[targetNumber].dataset.card === this.cards[previousNumber].dataset.card) {
                    this.freeze = 1;
                    setTimeout(() => {
                        target.classList.add('hide');
                        this.previousCard.classList.add('hide');
                        this.previousCard = null;
                        this.freeze = 0;
                    }, 1000);
                    this.cardsInScreen -= 2;
                } else {
                    this.freeze = 1;
                    setTimeout(() => {
                        target.classList.add('rotateBack');
                        target.style = 'background: red';
                        this.previousCard.style = 'background: red';
                        this.previousCard.classList.add('rotateBack');
                    }, 700);
                    setTimeout(() => {
                        gameSection.children[previousNumber].outerHTML = this.cardsSkirts[previousNumber].outerHTML;
                        gameSection.children[targetNumber].outerHTML = this.cardsSkirts[targetNumber].outerHTML;
                        this.previousCard = null;
                        this.freeze = 0;
                    }, 1000);
                }
            }
            // Когда закончились карты, запускается метод окончания игры
            if (this.cardsInScreen == 0) {
                setTimeout(this.onPlayerWin.bind(this), 1500);
            }
        }
    }

    // Запускается, когда player выиграл
    onPlayerWin() {
        clearInterval(this.timerId);
        this.gameSection.lastChild.remove(); // Удаляем таймер

        // Показываем карты и заставляем крутится
        const cardArr = Array.from(this.gameSection.children);
        cardArr.forEach(e => {
            e.classList.remove('hide');
            e.classList.add('rotation');
        });

        // Формируем блок с поздравлением
        const textBlock = document.createElement('div');
        const text = 'congratulations';
        const textArr = text.split('');

        textArr.forEach(letter => {
            const p = document.createElement('p');
            p.textContent = letter;
            p.style = 'color: #26d240';
            textBlock.appendChild(p);
        });

        textBlock.classList.add('result');
        this.gameSection.appendChild(textBlock);
    }

    // Запускается, когда player проиграл
    onPlayerLose() {
        const textBlock = document.createElement('div');
        const text = 'HA-HA-HA';
        const textArr = text.split('');

        textArr.forEach(letter => {
            const p = document.createElement('p');
            p.textContent = letter;
            textBlock.appendChild(p);
            p.style = 'color: red';
        });

        textBlock.classList.add('result');
        this.gameSection.appendChild(textBlock);

        // Добавляем красную подсветку картам
        const cardAmount = this.cards.length;
        for (let i = 0; i < cardAmount; i++) {
            this.gameSection.children[i].classList.add('card-shadow-lose');
            setTimeout(() => {
                this.gameSection.children[i].classList.remove('card-shadow-lose');
            }, 1000);
        }
    }

    // Метод для сортировки карт
    shuffleCards(arr) {
        let input = arr;

        for (let i = input.length - 1; i >= 0; i--) {
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
