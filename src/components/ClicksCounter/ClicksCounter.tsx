import React from 'react';
import './ClicksCounter.css';

interface ClicksCounterProps {
  responseCount: number;
}

const ClicksCounter: React.FC<ClicksCounterProps> = ({ responseCount }) => {
  return (
    <div className='clicksCounter'>
      По версии сервера: {responseCount} раз
    </div>
  );
};

export default ClicksCounter;