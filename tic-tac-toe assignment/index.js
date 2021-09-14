let playerX = "X";
let playerY = "Y";
let currentPlayer = playerX;
const allBoard = document.getElementsByClassName("board");
let count = 0;

const checkVal = (num) => {
    if(num % 2 === 0){
        return true;
    }else{
        return false;
    }
}
function hutj(){
    init();
}
const board1 = document.getElementById("board1")
const board2 = document.getElementById("board2")
const board3 = document.getElementById("board3")
const board4 = document.getElementById("board4")
const board5 = document.getElementById("board5")
const board6 = document.getElementById("board6")
const board7 = document.getElementById("board7")
const board8 = document.getElementById("board8")
const board9 = document.getElementById("board9")

const checkIfWon = (player) => {

    if(board1.innerText === player && board2.innerText === player && board3.innerText === player){
        return true;
    }else if(board4.innerText === player && board5.innerText === player && board6.innerText === player){
        return true;
    }else if(board7.innerText === player && board8.innerText === player && board9.innerText === player){
        return true;
    }else if(board1.innerText === player && board4.innerText === player && board7.innerText === player){
        return true;
    }else if(board1.innerText === player && board5.innerText === player && board9.innerText === player){
        return true;
    }else if(board3.innerText === player && board6.innerText === player && board9.innerText === player){
        return true;
    }else if(board7.innerText === player && board5.innerText === player && board3.innerText === player){
        return true;
    }else{
        return false;
    }
}

for (const prop of allBoard) {
    prop.addEventListener("click", showXorYOnBoard, {once:true});

    function showXorYOnBoard(e){
        count += 1;
    
        if(!checkVal(count)){
            prop.innerText = currentPlayer;
            prop.style.color = "red";
        }else{
            prop.innerText = currentPlayer;
        }
        if (checkIfWon(currentPlayer)){
            const r = currentPlayer;
            
            setTimeout(function(e){
                let confirmResult = confirm(r + " has won!");
                if(confirmResult){
                    // for(let boardd of allBoard){
                        location.reload()
                    // }
                }
            }, 1000);
        }
        
        
        if(count === 9 && !checkIfWon(currentPlayer)){
            const r = currentPlayer;
            
            setTimeout(function(e){
                let confirmResult = confirm("Cats game!");
                if(confirmResult){
                    // for(let boarde of allBoard){
                        location.reload()
                    // }
                }
                
            }, 1000);
        }
        console.log(count)
        currentPlayer = currentPlayer === playerX ? playerY : playerX
    
    }
}