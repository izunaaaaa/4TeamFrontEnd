import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  mm: string;
  ss: string;
}

const Timer = ({ mm, ss }: TimerProps) => {
  const intToString = (num: number) => {
    const number = Math.floor(num);
    return String(number);
  };

  const MM = mm ? parseInt(mm) : 0;
  const SS = ss ? parseInt(ss) : 0;

  const count = useRef<any>(MM * 60 + SS);
  const interval = useRef<any>(null);

  console.log(count.current);

  const [minute, setMinute] = useState(intToString(MM));
  const [second, setSecond] = useState(intToString(SS));

  useEffect(() => {
    interval.current = setInterval(() => {
      count.current -= 1;

      setMinute(intToString(count.current / 60));
      setSecond(intToString(count.current % 60));
    }, 1000);
  }, []);

  useEffect(() => {
    if (count.current <= 0) {
      clearInterval(interval.current);
    }
  }, [second]);

  return (
    <div>
      {minute} : {second}
    </div>
  );
};

export default Timer;
