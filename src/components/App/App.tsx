import React, { useState, useEffect, useRef } from 'react';
import Clicker from '../Clicker/Clicker';
import ClicksCounter from '../ClicksCounter/ClicksCounter';
import './App.css';
import useFetch from '../../hooks/useFetch';

const App: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const ref = useRef(0);
  const { data, isLoading, error, fetchData } = useFetch();

  const handleClick = () => {
    setClickCount(clickCount => clickCount + 1);
    setTimerIsActive(true);
  };

  const resetCount = () => {
    setClickCount(0);
  };

  useEffect(() => {
    ref.current = clickCount;
  }, [clickCount]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (timerIsActive) {
      timer = setTimeout(() => {
        fetchData('https://lk.zont-online.ru/api/button_count', {
          method: 'POST',
          headers: {
            'X-ZONT-Client': 'pochta@gmail.com',
            'Content-Type': 'application/json',
        },
          body: JSON.stringify({
          count: ref.current,
        }),
      });
        resetCount();
        setTimerIsActive(false);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [timerIsActive]);

  return (
    <div className='app'>
      <Clicker disabled={isLoading} handleClick={handleClick} clickCount={clickCount}/>
      <ClicksCounter responseCount={data?.count || 0}/>
      {error ? <p style={{color: 'red'}}>{error.error_ui}</p>: null}
    </div>
  );
};

export default App;