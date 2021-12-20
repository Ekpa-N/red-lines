let theCanvas = document.getElementById('canvas')
let canvasArray = document.getElementsByClassName('canvas-div')
let thePointer = document.getElementById('pointer')
let upTimerId = []
let fallTimerId
let jumpTimerId
const startGame = document.getElementById('start')
const stopGame = document.getElementById('stop')





let i

for (i=0; i<100; i++) {
    const canvasDiv = document.createElement('div')
    canvasDiv.classList.add('canvas-div')
    theCanvas.appendChild(canvasDiv)
}



// function that picks a box randomly
const boxPicker = () => {
    for (i=0; i<100; i++) {
        canvasArray[i].classList.remove('selected')
    }
    const number = Math.floor((Math.random() * 100))
    canvasArray[number].classList.add('selected')
}
// setInterval(boxPicker, 1000);


// function that creates the lines and moves it

let lineMakerArray = []

const lineTag = (anArray, counter) => {
    let temp = []
    if(anArray.includes(99)){
       return 
    } else {
        // debugger
        for (i=counter; i< (counter+10); i++) { 
            temp.push(i)    
        }
        lineMakerArray.push(temp)
        lineTag(temp, counter+10)
    }
}

lineTag([], counter=0)

console.log(lineMakerArray)
canvasArray = Array.from(canvasArray)



let counterTwo = 0
let counterThree = 9
const lineMover = () => {
    if (counterTwo < 10) {
        canvasArray.forEach(div => {   
            div.classList.remove('light-catcher')         
        })
        lineMakerArray[counterTwo].forEach((number) => {
            canvasArray[number].classList.add('light-catcher')
        })        
        counterTwo = counterTwo + 1
    } else if((counterTwo > 9) && (counterTwo < 20)) {
        // counterTwo = 0
        canvasArray.forEach(div => {   
            div.classList.remove('light-catcher')         
        })        
        lineMakerArray[counterThree].forEach((number) => {
                canvasArray[number].classList.add('light-catcher')
        })        
        counterTwo = counterTwo + 1
        counterThree = counterThree - 1
    } else if(counterTwo > 19) {
        counterTwo = 0
        counterThree = 9
        canvasArray.forEach(div => {   
            div.classList.remove('light-catcher')         
        })
        lineMakerArray[counterTwo].forEach((number) => {
            canvasArray[number].classList.add('light-catcher')
        })        
        counterTwo = counterTwo + 1
    }
}
// setInterval(lineMover, 150) 

// moving the pointer
const onMouseMove = (e) =>{
    thePointer.style.left = e.pageX + 'px';
    thePointer.style.top = e.pageY + 'px';
  }

theCanvas.addEventListener('mousemove', onMouseMove);
const hop = (e) => {
    let newT = e.target.offsetTop
    thePointer.style.top = newT - 10 + 'px'
}


const jump = (e) => {
    jumpTimerId = setInterval(() => {
        pointerBottomSpace = e.target.offsetTop    
        otherPointerBottomSpace = e.target.offsetTop - 10
        thePointer.style.top = pointerBottomSpace -5 +'px'
        upTimerId.push(pointerBottomSpace)
        if (upTimerId.length === 1) {
            fall()
        }     
    }, 100)
}

const fall = () => {
    clearInterval(jumpTimerId)
    fallTimerId = setInterval(() => {
        newPointerBottomSpace = upTimerId.pop()
        thePointer.style.top = newPointerBottomSpace + 'px'
        if(upTimerId.length === 0) {
            clearInterval(fallTimerId)
        }
    },100)
}

const start = () => {
    gameStart = setInterval(boxPicker, 1000)
    gameRunning = setInterval(lineMover, 150) 
    thePointer.addEventListener('click', jump)    
}

const stop = () => {
    clearInterval(gameStart)
    clearInterval(gameRunning)
}

startGame.addEventListener('click', start)
stopGame.addEventListener('click', stop)
