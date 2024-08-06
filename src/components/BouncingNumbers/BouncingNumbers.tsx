import React, { useEffect, useState } from 'react';
import { setCurrentNumber } from '../../store/numberSlice';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store'; 
import './BouncingNumbers.css';

interface BouncingNumbersProps {
  numbersArray: number[];
}

const unreachableNumbers = [0, 76, 79, 86, 92, 94, 97, 98];

const generateNumbers = (numbers: number[]) => {
  const reachableNumbers = numbers.filter((num) => !unreachableNumbers.includes(num));

  return reachableNumbers.map((id) => ({
    id,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 2 + 4,
    isStationary: false,
  }));
};

const BouncingNumbers: React.FC<BouncingNumbersProps> = ({ numbersArray }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState(generateNumbers(numbersArray));
  const [clickedId, setClickedId] = useState<number | null>(null);
  const globalNumber = useSelector((state: RootState) => state.currentNumber.currentNumber?.number || null);

  useEffect(() => {
    setNumbers(generateNumbers(numbersArray));
  }, [numbersArray]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumbers((prevNumbers) => {
        const newNumbers = prevNumbers.map((num) => {
          if (num.isStationary || num.id === clickedId) return num;

          let { x, y, vx, vy, size } = num;
          const radius = size / 2;

          if (x - radius <= 0 || x + radius >= 100) vx = -vx;
          if (y - radius <= 0 || y + radius >= 100) vy = -vy;

          return {
            ...num,
            x: x + vx,
            y: y + vy,
            vx,
            vy,
          };
        });

        for (let i = 0; i < newNumbers.length; i++) {
          for (let j = i + 1; j < newNumbers.length; j++) {
            if (newNumbers[i].isStationary || newNumbers[j].isStationary) continue;

            const dx = newNumbers[i].x - newNumbers[j].x;
            const dy = newNumbers[i].y - newNumbers[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const combinedRadius = (newNumbers[i].size / 2) + (newNumbers[j].size / 2);
            if (distance < combinedRadius) {
              const angle = Math.atan2(dy, dx);
              const speed_i = Math.sqrt(newNumbers[i].vx * newNumbers[i].vx + newNumbers[i].vy * newNumbers[i].vy);
              const speed_j = Math.sqrt(newNumbers[j].vx * newNumbers[j].vx + newNumbers[j].vy * newNumbers[j].vy);

              newNumbers[i].vx = speed_j * Math.cos(angle);
              newNumbers[i].vy = speed_j * Math.sin(angle);
              newNumbers[j].vx = speed_i * Math.cos(angle + Math.PI);
              newNumbers[j].vy = speed_i * Math.sin(angle + Math.PI);

              const overlap = (combinedRadius - distance) / 2;
              newNumbers[i].x += Math.cos(angle) * overlap;
              newNumbers[i].y += Math.sin(angle) * overlap;
              newNumbers[j].x -= Math.cos(angle) * overlap;
              newNumbers[j].y -= Math.sin(angle) * overlap;
            }
          }
        }

        return newNumbers;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [clickedId]);

  useEffect(() => {
    if (globalNumber !== null && numbers.some(num => num.id === globalNumber)) {
      handleBallClick(globalNumber);
    }
  }, [globalNumber]);

  const handleBallClick = (id: number) => {
    // console.log(`Number clicked: ${id}`);
    dispatch(setCurrentNumber({ id, number: id }));
    setClickedId(id);
    setNumbers((prevNumbers) =>
      prevNumbers.map((num) =>
        num.id === id ? { ...num, isStationary: true } : num
      )
    );
  };

  interface ExtendedCSSProperties extends React.CSSProperties {
    '--size'?: string;
  }

  const coverClassName = globalNumber ? "cover showCover" : "cover hideCover";

  return (
    <div className='whiteBackground'>
      <div className={coverClassName}></div>
      {numbers.map((num) => (
        <div
          key={num.id}
          className={`bouncingNumber ${num.id === clickedId ? 'centeredBall' : ''}`}
          style={{
            '--size': `${num.size}vh`,
            top: `${num.y}%`,
            left: `${num.x}%`
          } as ExtendedCSSProperties}
          onClick={() => handleBallClick(num.id)}
        >
          {num.id}
        </div>
      ))}
    </div>
  );
};

export default BouncingNumbers;
