/*
Add your code for Game here
 */
export default class Game {
    gameState = {
        board: [],
        score: 0,
        won: false,
        over: false
      }
      onMoveObservers = [];
      onWinObservers = [];
      onLoseObservers = [];
      size; 

      constructor(size) {
        this.size = size;
        for(let i = 0; i < this.size * this.size; i++) {
            this.gameState.board.push(0);
        }
        this.addSquare();
        this.addSquare();

    }

    addSquare() {
        let zerosOnBoard = [];
        
        let i = 0;
        this.gameState.board.forEach(function(element) {
            if (element === 0) {
                zerosOnBoard.push(i);
            }
            i++;
          });

        if (zerosOnBoard.length != 0) {

            let randomSquare = zerosOnBoard[Math.floor(Math.random() * zerosOnBoard.length)];
            let randomValue = Math.random();
            this.gameState.board[randomSquare] = ((randomValue <= 0.9) ? 2 : 4);
        }
            let maxMoves = true;
            // check to see if there are no neighboring values, possible next moves
            if (zerosOnBoard.length <= 1) {
                for(let i = 0; i < this.size * this.size; i++) {
                    let x = this.size;
                    if (i-x >= 0 && this.gameState.board[i] == this.gameState.board[i-x]) {
                        maxMoves = false;
                    }
                    if (i+1 < this.size*this.size && !(((i + 1) % this.size) === 0) && this.gameState.board[i] == this.gameState.board[i+1]) {
                        maxMoves = false;
                    }
                }
                if (maxMoves) {
                    this.gameState.over = true;
                    for (let func in this.onLoseObservers) {
                        this.onLoseObservers[func](this.gameState);                 
                    }
                } 
            }
          

    }
   
    setupNewGame() {
        this.gameState = {
            board: [],
            score: 0,
            won: false,
            over: false
          };
    
        for(let i = 0; i < this.size * this.size; i++) {
            this.gameState.board[i] = 0;
        }
        this.addSquare();
        this.addSquare(); 
  
   
    }
    loadGame(gameState) {
        this.gameState = gameState;
        this.size = Math.sqrt(gameState.board.length);
    }

    move(direction) {
        //given up, down, left, or right
        let swapped = false; 
        
        if (direction === 'up') {
            let i = 0; 
            //move tiles up
            while (i < this.size * this.size) {
                let x = this.size;
                // if 0, see if any values are below and move up
                if (this.gameState.board[i] === 0) {
                    // check below to see if any non-zero values exist
                    while (this.gameState.board[i] === 0 && i + x < this.size * this.size) {
                        if (this.gameState.board[i + x] != 0) {
                                swapped = true;
                                this.gameState.board[i] = this.gameState.board[i + x];
                                //let v = this.gameState.board[i + x];
                                this.gameState.board[i + x] = 0;
                        }
                        x = x + this.size;
                    }
                }
                // get value at index and compare it to values below
                while (i + x < this.size * this.size && this.gameState.board[i] != 0) {
                    // search below for values
                    if (this.gameState.board[i] === this.gameState.board[i + x]) {
                        let newscore = this.gameState.board[i + x] + this.gameState.board[i]; 
                        this.gameState.score = this.gameState.score + newscore;
                        this.gameState.board[i] = newscore;
                        this.gameState.board[i + x] = 0;
                        x = this.size * this.size;
                        swapped = true;
                        if (newscore === 2048) {
                            this.gameState.won = true;
                            for (let func in this.onWinObservers) {
                                this.onWinObservers[func](this.gameState);                 
                            }
                        }                         

                    } else if (this.gameState.board[i + x] != 0) {
                        x = this.size * this.size;
                    }

                    x = x + this.size;
                    // move the next value below it up
                }
                i++;
            }

            this.toString();
            // check by column order, each peeks at number below
        }
        
        if (direction === 'down') {
            let i = this.size * this.size - 1; 
            //move zero tiles up
            while (i >= 0) {
                let x = this.size;
                if (this.gameState.board[i] === 0) {
                    // check above to see if any non-zero values exist
                    while (this.gameState.board[i] === 0 && i - x >= 0) {
                        if (this.gameState.board[i - x] != 0) {
                            this.gameState.board[i] = this.gameState.board[i - x];
                            this.gameState.board[i - x] = 0;
                            swapped = true;

                        }
                        x = x + this.size;
                    }
                }
                while (i - x >= 0 && this.gameState.board[i] != 0) {
                    // search below for values
                    if (this.gameState.board[i] === this.gameState.board[i - x]) {
                        let newscore = this.gameState.board[i - x] + this.gameState.board[i]; 
                        this.gameState.score = this.gameState.score + newscore;
                        this.gameState.board[i] = newscore;
                        this.gameState.board[i - x] = 0;
                        x = i + 1;
                        swapped = true;
                        if (newscore === 2048) {
                            this.gameState.won = true;
                            for (let func in this.onWinObservers) {
                                this.onWinObservers[func](this.gameState);                 
                            }
                        }                         
                    } else if (this.gameState.board[i - x] != 0) {
                        x = i + 1;
                    }

                    x = x + this.size;
                    // move the next value below it up
                }
                i--;
            }
            this.toString();
        }

        if (direction === 'left') {
            let i = 0; 
            //move tiles left
            while (i < this.size * this.size) {
                let x = 1;
                if (this.gameState.board[i] === 0) {
                    // check to right to see if any non-zero values exist
                    while (this.gameState.board[i] === 0 && !(((i + x) % this.size) === 0) && (i + x) <  this.size * this.size) {
                        if (this.gameState.board[i + x] != 0) {
                            this.gameState.board[i] = this.gameState.board[i + x];
                            this.gameState.board[i + x] = 0;
                            swapped = true;
                        }
                        x = x + 1;
                    }
                }
                while (i + x < this.size * this.size && this.gameState.board[i] != 0 && !(((i + x) % this.size) === 0)) {
                    // search to right for values
                    if (this.gameState.board[i] === this.gameState.board[i + x]) {
                        let newscore = this.gameState.board[i + x] + this.gameState.board[i]; 
                        this.gameState.score = this.gameState.score + newscore;
                        this.gameState.board[i] = newscore;
                        this.gameState.board[i + x] = 0;
                        x = this.size * this.size;
                        swapped = true;
                        if (newscore === 2048) {
                            this.gameState.won = true;
                            for (let func in this.onWinObservers) {
                                this.onWinObservers[func](this.gameState);                 
                            }
                        }                         

                    }
                    else if (this.gameState.board[i + x] != 0) {
                        x = this.size * this.size;
                    }
                    x = x + 1;
                    // move the next value below it up
                }

                i++;
            }

            this.toString();
            
        }
        if (direction === 'right') {
            let i = this.size * this.size - 1; 
            //move tiles right
            while (i >= 0) {
                let x = -1;
                if (this.gameState.board[i] === 0) {
                    // check to right to see if any non-zero values exist
                    while (this.gameState.board[i] === 0 && !(((i + x) % this.size) === (this.size - 1)) && (i+x) >= 0) {
                        if (this.gameState.board[i + x] != 0) {
                            this.gameState.board[i] = this.gameState.board[i + x];
                            this.gameState.board[i + x] = 0;
                            swapped = true;
                        }
                        x = x - 1;
                    }
                }
                while ((i+x) >= 0 && this.gameState.board[i] != 0 && !(((i + x) % this.size) === (this.size - 1))) {
                    // search to left for values
                    if (this.gameState.board[i] === this.gameState.board[i + x]) {
                        let newscore = this.gameState.board[i + x] + this.gameState.board[i]; 
                        this.gameState.score = this.gameState.score + newscore;
                        this.gameState.board[i] = newscore;
                        this.gameState.board[i + x] = 0;
                        x = -i - 1;
                        swapped = true;
                        if (newscore === 2048) {
                            this.gameState.won = true;
                            for (let func in this.onWinObservers) {
                                this.onWinObservers[func](this.gameState);                 
                            }
                        }                         
                    } else if (this.gameState.board[i + x] != 0) {
                        x = -i - 1;
                    }
                    x = x - 1;
                    // move the next value below it up
                }

                i--;
            }

            this.toString();
        }

        if (swapped) {
            this.addSquare();
            this.toString();

            for (let func in this.onMoveObservers) {
                this.onMoveObservers[func](this.gameState);                 
            }
        }


        
    }

    toString() {
        let i = 0;
        let string = "";
        this.gameState.board.forEach(function(element) {
            string = string + element + " ";
            i++;
            if (i%(4) === 0) {
                string = string + "\n";
            }
          });
    } 

    onMove(callback) {
        this.onMoveObservers.push(callback);
    }

    onWin(callback) {
        this.onWinObservers.push(callback);
    }

    onLose(callback) {
        this.onLoseObservers.push(callback);
    }
    getGameState() {
        return this.gameState;
    }

    
}


    


