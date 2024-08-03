import React, { useEffect, useState } from 'react';
import './BouncingNumbers.css'; // Ensure you have a corresponding CSS file

interface BouncingNumbersProps {
  numbersArray: number[];
}

const unreachableNumbers = [76, 79, 86, 92, 94, 97, 98];

// Generate random initial positions, velocities, and sizes for the numbers
const generateNumbers = (numbers: number[]) => {
  const reachableNumbers = numbers.filter((num) => !unreachableNumbers.includes(num));

  return reachableNumbers.map((id) => ({
    id,
    x: Math.random() * 90 + 5,
    y: Math.random() * 90 + 5,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    size: Math.random() * 2 + 4, // size range between 4vh and 6vh
  }));
};

const BouncingNumbers: React.FC<BouncingNumbersProps> = ({ numbersArray }) => {
    const [numbers, setNumbers] = useState(generateNumbers(numbersArray));
  
    useEffect(() => {
      const interval = setInterval(() => {
        setNumbers((prevNumbers) => {
          const newNumbers = prevNumbers.map((num) => {
            let { x, y, vx, vy, size } = num;
            const radius = size / 2;
  
            // Check boundaries with respect to the radius
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

        // Check for collisions
        for (let i = 0; i < newNumbers.length; i++) {
            for (let j = i + 1; j < newNumbers.length; j++) {
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
  
                // Separate overlap
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
      }, 30);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleBallClick = (id: number) => {
      console.log(`Number clicked: ${id}`);
    };
  
    return (
      <div className='whiteBackground'>
        {numbers.map((num) => (
          <div
            key={num.id}
            className='bouncingNumber'
            style={{
              top: `${num.y}%`,
              left: `${num.x}%`,
              width: `${num.size}vh`,
              height: `${num.size}vh`,
              fontSize: `${num.size / 2}vh`,
            }}
            onClick={() => handleBallClick(num.id)}
          >
            {num.id}
          </div>
        ))}
      </div>
    );
  };
  
  export default BouncingNumbers;
