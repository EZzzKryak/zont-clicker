import { FC } from 'react';
import './Clicker.css';

interface ClickerProps {
    handleClick: () => void;
    clickCount: number;
    disabled: boolean;
}

const Button: FC<ClickerProps> = ({handleClick, clickCount, disabled}) => {
  return (
    <div className='clicker'>
      <button className='clicker__button' onClick={handleClick} disabled={disabled}>
      {disabled ? 'ЗАГРУЗКА' : 'КЛИКНУТЬ'}
      </button>
      <div className='clicker__screen'>
        Кликнули {clickCount} раз
      </div>
    </div>
  );
};

export default Button;