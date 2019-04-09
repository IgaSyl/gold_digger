document.addEventListener("DOMContentLoaded", function () {

    function goldDigger() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";

    }

    function Gold() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    }

    function Game() {
        this.board = document.querySelectorAll("#board div");
        this.goldDigger = new goldDigger();
        this.gold = new Gold();
        this.score = 0;

        this.position = function (x, y) {
            return x + (y * 10);
        }

        this.showGoldDigger = function () {
            this.hideVisibleGoldDigger();
            this.board[this.position(this.goldDigger.x, this.goldDigger.y)].classList.add('goldDigger');

        }
        this.showGold = function () {
            this.board[this.position(this.gold.x, this.gold.y)].classList.add('gold');
        }
        this.startGame = function () {
            var self = this;
            this.idSetinterval = setInterval(function () {
                self.moveGoldDigger();
            }, 250);

        }
        this.hideVisibleGoldDigger = function () {
            var visibleGoldGigger = document.querySelector(".goldDigger");
            if (visibleGoldGigger) {
                visibleGoldGigger.classList.remove("goldDigger");
            }

        }

        this.turnGoldDigger = function (event) {
            switch (event.which) {
                case 37:
                    this.goldDigger.direction = "left";
                    break;
                case 38:
                    this.goldDigger.direction = "top";
                    break;
                case 39:
                    this.goldDigger.direction = "right";
                    break;
                case 40:
                    this.goldDigger.direction = "down";
                    break;
            }
        }

        this.moveGoldDigger = function () {
            if (this.goldDigger.direction === "right") {
                this.goldDigger.x = this.goldDigger.x + 1;
            } else if (this.goldDigger.direction === "left") {
                this.goldDigger.x = this.goldDigger.x - 1;
            } else if (this.goldDigger.direction === "top") {
                this.goldDigger.y = this.goldDigger.y - 1;
            } else if (this.goldDigger.direction === "down") {
                this.goldDigger.y = this.goldDigger.y + 1;
            };

            this.checkCollision();
            this.gameOver();
            this.showGoldDigger();


        }



        this.checkCollision = function () {
            if (this.goldDigger.x === this.gold.x && this.goldDigger.y === this.gold.y) {
                var gold = document.querySelector('.gold')
                gold.classList.remove('gold');
                this.score++;
                var score = document.querySelector('#score > div strong');
                score.innerText = this.score;
                this.gold = new Gold();
                this.showGold();

            }
        }
        this.gameOver = function () {
            if (this.goldDigger.x < 0 || this.goldDigger.x > 9 || this.goldDigger.y < 0 || this.goldDigger.y > 9) {
                clearInterval(this.idSetinterval);
                this.hideVisibleGoldDigger();
                alert('GAME OVER: wynik ' + this.score);
            }
        }

    }

    var goldGame = new Game();
    goldGame.showGoldDigger();
    goldGame.showGold();
    goldGame.startGame();

    document.addEventListener('keydown', function(event) {
        goldGame.turnGoldDigger(event);
    })


});