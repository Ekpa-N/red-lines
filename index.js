let theCanvas = document.getElementById('canvas')
let canvasArray = document.getElementsByClassName('canvas-div')
let thePointer = document.getElementById('pointer')
let upTimerId = []
let fallTimerId
let jumpTimerId
const startGame = document.getElementById('start')
const stopGame = document.getElementById('stop')
let greenBox = "Empty"





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
    greenBox = canvasArray[number]
}


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
// console.log(canvasArray)
canvasArray = Array.from(canvasArray)
// console.log(canvasArray)



let counterTwo = 0
let counterThree = 9

const checkPosition = (div, pointer) => {
    if((pointer.offsetLeft > div.offsetLeft) && (pointer.offsetLeft < (div.offsetLeft+52)) &&
    (pointer.offsetTop > div.offsetTop) && (pointer.offsetTop < (div.offsetTop+52)) &&
    (pointer.classList.contains('jumping'))) {
        console.log("Dodged")
    } else if((pointer.offsetLeft > div.offsetLeft) && (pointer.offsetLeft < (div.offsetLeft+52)) &&
    (pointer.offsetTop > div.offsetTop) && (pointer.offsetTop < (div.offsetTop+52)) &&
    (!pointer.classList.contains('jumping'))) {
        console.log("Caught")
    }
}

const lineMover = () => {
    if (counterTwo < 10) {
        canvasArray.forEach(div => {   
            div.classList.remove('light-catcher')         
        })
        lineMakerArray[counterTwo].forEach((number) => {
            canvasArray[number].classList.add('light-catcher')
            checkPosition(canvasArray[number],thePointer)
        })        
        counterTwo = counterTwo + 1
    } else if((counterTwo > 9) && (counterTwo < 20)) {
        // counterTwo = 0
        canvasArray.forEach(div => {   
            div.classList.remove('light-catcher')         
        })        
        lineMakerArray[counterThree].forEach((number) => {
                canvasArray[number].classList.add('light-catcher')
                checkPosition(canvasArray[number],thePointer)
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
            checkPosition(canvasArray[number],thePointer)
        })        
        counterTwo = counterTwo + 1
    }
}

// moving the pointer

const onMouseMove = (e) => {
    thePointer.style.left = e.pageX + 'px';
    thePointer.style.top = e.pageY + 'px'; 
}
const onMouseEnter = (e) =>{     
    theCanvas.addEventListener('mousemove', onMouseMove)              
 }

thePointer.addEventListener('mouseenter', onMouseEnter);
// const hop = (e) => {
//     let newT = e.target.offsetTop
//     thePointer.style.top = newT - 10 + 'px'
// }


const jump = (e) => {
    // console.log(e)
    // console.log(e.target.offsetLeft)
    // console.log(thePointer.style.left)
    // console.log(e.target.offsetTop)
    theCanvas.removeEventListener('mousemove', onMouseMove)
    e.target.classList.add('jumping')
    if((e.target.offsetLeft > greenBox.offsetLeft) && (e.target.offsetLeft < (greenBox.offsetLeft+52)) &&
    (e.target.offsetTop > greenBox.offsetTop) && (e.target.offsetTop < (greenBox.offsetTop+52))) {
        boxPicker()
    } else if (greenBox === "Empty") {
        jumpTimerId = setInterval(() => {       
            pointerBottomSpace = e.target.offsetTop            
            thePointer.style.top = pointerBottomSpace -10 +'px'
            upTimerId.push(pointerBottomSpace)
            if (upTimerId.length === 5) {
                // console.log(e.target.classList.contains('jumping'))
                fall(e.target)
            }     
        }, 50)
    } else {
        jumpTimerId = setInterval(() => {       
            pointerBottomSpace = e.target.offsetTop            
            thePointer.style.top = pointerBottomSpace -10 +'px'
            upTimerId.push(pointerBottomSpace)
            if (upTimerId.length === 5) {
                // console.log(e.target.classList.contains('jumping'))
                fall(e.target)
            }     
        }, 50)
    }
    
}

const fall = (target) => {
    clearInterval(jumpTimerId)
    fallTimerId = setInterval(() => {        
        newPointerBottomSpace = upTimerId.pop()
        thePointer.style.top = newPointerBottomSpace + 'px'
        if(upTimerId.length === 0) {
            clearInterval(fallTimerId)
            target.classList.remove('jumping')
            // console.log(target.classList.contains('jumping'))
            upTimerId = []
        }
    },70)
}
thePointer.addEventListener('click', jump)   

// Timer
let msTens = document.getElementById('ms-tens')
let msHundreds = document.getElementById('ms-hundreds')
let seconds = document.getElementById('seconds')

let secs = 0
let msHuns = 0
let msTen = 0
const clockTimer = () => {
    secondsCounter = () => {
        msTen++
        if (msTen < 10) {
            msTens.innerText = msTen
        } else  if ((msTen === 10) && (msHuns < 9)) {
            msTen = 0           
            msTens.innerText = msTen
            msHuns++
            msHundreds.innerText = msHuns

        } else if ((msHuns === 9) && (secs < 40)) {
            msTen = 0           
            msTens.innerText = msTen
            msHuns = 0
            msHundreds.innerText = msHuns
            secs ++
            seconds.innerText = secs
        } else {
            msTen = 0           
            msTens.innerText = msTen
            msHuns = 0
            msHundreds.innerText = msHuns
            secs = 0
            seconds.innerText = secs
            clearInterval(microTens)
            clearInterval(gameStart)
            clearInterval(gameRunning)
        theCanvas.classList.remove('game-started')
        canvasArray.forEach(div => {
            div.classList.remove('light-catcher')
            div.classList.remove('selected')
            greenBox = "Empty"
        })

        }
    }
    microTens = setInterval(secondsCounter, 10)
}


// starting the game
const start = () => {
    if(!theCanvas.classList.contains('game-started')) {
        theCanvas.classList.add('game-started')
        gameStart = setInterval(boxPicker, 3000)
        gameRunning = setInterval(lineMover, 160) 
        clockTimer()
    } else {
        console.log('game already running')
    }
}

// stopping the game
const stop = () => {
    if(theCanvas.classList.contains('game-started')) {
        theCanvas.classList.remove('game-started')
        clearInterval(gameStart)
        clearInterval(gameRunning)
        clearInterval(microTens)
    } else {
        console.log('Game has not started')
    }
}



startGame.addEventListener('click', start)
stopGame.addEventListener('click', stop)

