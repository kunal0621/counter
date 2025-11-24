import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [timerSecond, setTimerSecond] = useState(59)
  const [timerMin, setTimerMin] = useState(4)
  const [value, setValue] = useState('pause')
  const [timerName, setTimerName] = useState('DEFAULT')
  const intervalID = useRef(null)
  const timerSecRef = useRef('')
  const timerMinRef = useRef(4)

  const handleStart = () => {
    if (intervalID.current) {
      return
    }
    intervalID.current = setInterval(() => {
      setTimerSecond(prev => {
        const newTime = prev - 1
        timerSecRef.current = newTime
        return newTime
      })
      if (timerSecRef.current === 0 && timerMinRef.current > 0) {
        setTimerMin(prev => {
          const newSec = prev - 1
          timerMinRef.current = newSec
          return newSec
        })
        setTimerSecond(59)
      }
      if (timerSecRef.current === 1 && timerMinRef.current === 0) {
        handleReset()
      }
    }, 1000);
  }

  const handleReset = () => {
    if (intervalID.current) {
      clearInterval(intervalID.current)
    }
    intervalID.current = null
    setTimerMin(4)
    setTimerName('default'.toUpperCase())
    setTimerSecond(59)
  }

  const handleStop = () => {
    if (intervalID.current && value === 'pause') {
      clearInterval(intervalID.current)
      intervalID.current = null
    } else {
      handleStart()
    }
    if (value === 'pause') {
      setValue('play')
    } else {
      setValue('pause')
    }
  }

  const format = (time) => {
    return String(time).padStart(2, '0')
  }

  const handleTimerManger = (timerText) => {
    // eslint-disable-next-line default-case
    switch (timerText) {
      case 'default':
        setTimerMin(4)
        setTimerSecond(59)
        setTimerName('default'.toUpperCase())
        handleStart()
        break;
      case 'plank':
        setTimerMin(0)
        setTimerSecond(59)
        setTimerName('plank'.toUpperCase())
        handleStart()
        break
      case 'egg-boil':
        setTimerMin(9)
        setTimerSecond(59)
        setTimerName('egg-boil'.toUpperCase())
        handleStart()
        break
      case 'crunches':
        setTimerMin(1)
        setTimerSecond(59)
        setTimerName('crunches'.toUpperCase())
        handleStart()
        break
      case 'face-mask':
        setTimerMin(14)
        setTimerSecond(59)
        setTimerName('face-mask'.toUpperCase())
        handleStart()
        break
    }
  }

  return (
    <div className="App">
      <div className="clock">
        <div className="clock-inner">
          <div className="clock-label">{timerName}</div>
          <div className="time">
            <span className="minutes">{format(timerMin)}</span>
            <span className="separator">:</span>
            <span className="seconds">{format(timerSecond)}</span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button className='btn start' onClick={handleStart}>Start</button>
        <button className='btn reset' onClick={handleReset}>Reset</button>
        <button className='btn pause' onClick={handleStop}>Pause / Play</button>
      </div>
      <div className='timer-manager'>
        <h3>Frequentely Used Timers</h3>
        <div className='button-container'>
          <button className='default-manager btn' onClick={() => handleTimerManger('default')}>DEFAULT</button>
          <button className='plank-manager btn' onClick={() => handleTimerManger('plank')}>PLANK</button>
          <button className='egg-boil-manager btn' onClick={() => handleTimerManger('egg-boil')}>EGG BOILS</button>
          <button className='crunches-manager btn' onClick={() => handleTimerManger('crunches')}>CRUNCHES</button>
          <button className='face-mask-manager btn' onClick={() => handleTimerManger('face-mask')}>FACE MASK</button>
        </div>
      </div>
    </div>
  );
}

export default App;
