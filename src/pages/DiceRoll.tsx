import {useState} from "react";
import {Button, Switch} from '@mui/material';
import ResultAlert from "../components/ResultAlert";

import dice1 from '../assets/dice_faces/dice1.png';
import dice2 from '../assets/dice_faces/dice2.png';
import dice3 from '../assets/dice_faces/dice3.png';
import dice4 from '../assets/dice_faces/dice4.png';
import dice5 from '../assets/dice_faces/dice5.png';
import dice6 from '../assets/dice_faces/dice6.png';

type intGamePhase = 'start' | 'rolling' | 'results';

interface intGameState {
    currNum: number,
    scoreHigh1:boolean,
    isRolling:boolean,
    result:number
}

const facelist: {[index:number]:string} = {1: dice1,
    2: dice2,
    3: dice3,
    4: dice4,
    5: dice5,
    6: dice6
};

export default function DiceGame() {
    const [gamePhase, setGamePhase] = useState<intGamePhase>('start');
    const [gameState, setGameState] = useState<intGameState>({
        currNum: 1,
        scoreHigh1:true,
        isRolling :false,
        result:0
    });
    // @ts-expect-error will only pass int
    const DiceIcon = ({value}) => {
        return (
            <img src={facelist[value]} alt={value.toString()}/>
        );
    };
    function rollDice() {
        setGameState(prev => ({...prev, isRolling: true}));
        const rollInterval = setInterval(() => {
            setGameState(prev => ({...prev, result:Math.floor(Math.random() * 6) + 1}));
        }, 100);
        setTimeout(()=> {
            clearInterval(rollInterval);
            setGameState(prev => ({
                ...prev, isRolling:false}));
            setGamePhase('results');
        },1000);
    }
    function OptionsMenu() {
      return (
          <>
              <form>
                  <label>{gameState.scoreHigh1 ? <>Player 1 is counting highs<br/>
                      Player 2 is counting lows.
                  </> : <> Player 1 is counting lows, Player 2 is counting lows</>}</label>
                  <Switch />
                  <PlayButton />
              </form>
          </>);
    }
    function PlayButton() {
        return (
            <Button variant={"contained"} onClick={rollDice}
            disableElevation>Play</Button>
        )
    }
    function ResultsScreen() {
        return (
            <>
                <ResultAlert winnerId={
                    gameState.result >= 4 && gameState.scoreHigh1 ? 1 : 2
                }/>
                <Button variant="contained" onClick={resetGame}>Replay?</Button>
            </>
        )
    }
    function resetGame() {
        setGamePhase("start");
        setGameState(prev =>({...prev, result : 0}));
    }
    return (
        <>
            <DiceIcon value={gameState.result}/>
            {gamePhase == "start" && <OptionsMenu/>}
            {gamePhase == "results" && <ResultsScreen/>}
        </>
    );
}