//1 deposit x money CHECK
//2determine number of lines CHECK
//3 collect bet amount from user CHECK
//4 spin the slot machine 
//5 check if/what user won
//give user winnings
//play again

const prompt = require('prompt-sync')();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    'A': 2, 
    'B': 4,
    'C': 4,
    'D': 6,
    'E': 8,
}

const SYMBOL_VALUES = {
    'A': 6,
    'B': 5,
    'C': 4,
    'D': 3,
    'E': 2,
}

const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }
    console.log('Spinning...');
    console.log(symbols)


    const reels = [[], [], []];
    for (let i = 0; i < COLS; i++) {
        const avilableSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * avilableSymbols.length);
            const selectedSymbol = avilableSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            avilableSymbols.splice(randomIndex, 1);
        }
    }

    return reels;
}
 
const deposit = () => {
   
   while (true)  {
     const depositAmount = parseFloat(prompt('Enter deposit amount: '));
    if (depositAmount <= 0 || isNaN(depositAmount)) {
        console.log('Invalid deposit amount. Please enter a positive number.');
        deposit();
    } else { 
        return depositAmount;
     }
    }

}

const getNumberOfLines = () => {
    while (true)  {
        const lineAmount = parseFloat(prompt('Enter how many lines to bet on: '));
       if (lineAmount <= 0 || isNaN(lineAmount) || lineAmount > 3) {
           console.log('Invalid line amount. Pleas enter 1-3 lines to bet on.');
           deposit();
       } else { 
           return lineAmount;
        }
       }
};

const getBet = (balance, lines) => {
    while (true)  {
        const betAmount = parseFloat(prompt('Enter bet amount per line: '));
        const fullBetAmount = betAmount * lines;

       if (betAmount <= 0 || isNaN(betAmount) || betAmount > balance / lines) {
           console.log('Invalid bet amount. Please enter a positive number less than or equal to your current balance.');
           deposit();
       } else { 
           return fullBetAmount;
        }
       }
       

    }

 
const transpose = (reels) => {
    const rows = [];


    for (let i=0; i < ROWS; i++) {
        rows.push([]);
        for (let j=0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for ( const row of rows) {
        let rowString = '';
        for (const [i, symbol] of row.entries()) {
            rowString += symbol;
            if (i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;
    for ( let i = 0; i < lines; i++) {
        const symbols = rows[i]
        let winner = true;

        for (const symbol of symbols) {
            if (symbol != symbols[0]){
                winner = false;
                break;
            }
        }
    
        if (winner) {
            winnings += bet * SYMBOL_VALUES[symbols[0]];
            console.log(`Congratulations! You won $${winnings} dollars!`);
        }
    }
}

const game = () => {
    let balance = deposit();

    while (true) {
    console.log(`Your current balance is $${balance}.`);
    const lines = getNumberOfLines();

    const bet = getBet(balance, lines);
    balance -= bet * lines;
    const reel = spin();
    const correctRows = transpose(reel);
    printRows(correctRows);

    const winnings = getWinnings(correctRows, bet, lines);
    console.log(winnings);
    balance += winnings;
    console.log(`Your new balance is $${balance}.`);
    if (balance <= 0) {
        console.log("You're out of money. Thanks for playing!");
        break;
    } 
     const playAgain = prompt('Do you want to play again? (yes/no): ');
     if (playAgain != 'yes') {
         console.log("Thanks for playing! Goodbye!");
         break;
     }

    }


}

game();