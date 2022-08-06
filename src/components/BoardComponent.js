import React, {useState, useEffect} from 'react'
import './styles/board.css'
import { AppHeaderComponent } from './AppHeaderComponent';
const SquareComponent = ({number,isSelected}) => {
  // let className = 'square';
  let className = isSelected ? 'square select' : 'square';
  return (
    <div className={className}>
      <span className='square-number'>{number}</span>
    </div>      
  )
}

export const BoardComponent = () => {
  const [currentSelection, setCurrentSelection] = useState(0);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [appClass, setAppClass] = useState('app-no-blur');
  useEffect(() => {  
    setAppClass((prevAppClass)=> prevAppClass==='app-no-blur'?'app-blur':'app-no-blur');
    return () => {
    }
  }, [isGameOver])
  useEffect(() => {
    if (selectedNumbers.length>=80){
      setIsGameOver(true)
    }
    return () => {
    }
  }, [selectedNumbers])
  let numbersArray = [];
  for (var i=1;i<=80;i++){
    numbersArray.push(i);
  }
  const selectRandomNumber = (range) =>{
    var randomNumber = Math.floor(Math.random()*range);
    return randomNumber;
  }
  const selectRandomNumberNotUsed = () =>{
    let notUsedNumber = [];
    for (let el of numbersArray){
      if (!selectedNumbers.includes(el)){
        notUsedNumber.push(el);
      }
    }
    let random = notUsedNumber[selectRandomNumber(notUsedNumber.length)];
    return random;
  }

  const playButtonHandler = () =>{
    let randomNum = selectRandomNumberNotUsed();
    let uptadedArray = [...selectedNumbers,randomNum];
    // sort array ascendent
    uptadedArray.sort((a,b)=>a-b);
    setSelectedNumbers(uptadedArray);
    setCurrentSelection(randomNum);
  }
  const playAgainButtonHandler = () =>{
    // console.log("YOU SURE WANNA TRY AGAIN?");
    setIsGameOver(false);
    setSelectedNumbers([]);
    setCurrentSelection(0);
  }
  return (
    <>
    
    <div className="game-over-container" style={{display: isGameOver?'flex':'none'}}>
      <h3>GAME OVER</h3>
      <span>The game is over. But you can play again!</span>
      <div className="button-container">
        <button id='try-again' onClick={playAgainButtonHandler}>PLAY AGAIN</button>
      </div>
    </div>
    <div className={appClass} id='application'>
      <AppHeaderComponent/>
      <div className='board-container'>
        {numbersArray.map((num,indx)=>{
          if (selectedNumbers.includes(num)){
            return <SquareComponent key={indx} number={num} isSelected={true}/>
          }
          else{
            return <SquareComponent key={indx} number={num} isSelected={false} />
          }
        })}   
      </div>
      <div className="current-selection">
        <p>The actual selection is: {currentSelection} </p>
      </div>
      <button className='play' onClick={playButtonHandler}>PLAY</button>
      <p id='text-list-selected-numbers'>List of already selected numbers</p>
      <div className="selected-numbers">
        {selectedNumbers.map((num,indx)=>
        <SquareComponent key={indx} number={num}/>      
        )}
      </div>
    </div>


    </>
  )
}
