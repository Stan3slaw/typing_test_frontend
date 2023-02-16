import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import { FIFTY_NINE_SECONDS, ONE_SECOND } from './constants';
import TimerStatuses from './enums';

const useTimer = (
  shouldTimerStart?: boolean,
  initialMinutes = 1,
  initialSeconds = 0,
): [number, number, TimerStatuses, Dispatch<SetStateAction<TimerStatuses>>] => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [timerStatus, setTimerStatus] = useState<TimerStatuses>(TimerStatuses.STOPPED);

  useEffect(() => {
    let timerInterval: NodeJS.Timer;

    if (shouldTimerStart) {
      timerInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timerInterval);
            setTimerStatus(TimerStatuses.ENDED);
          } else {
            setMinutes(minutes - 1);
            setSeconds(FIFTY_NINE_SECONDS);
          }
        }
      }, ONE_SECOND);

      if (timerStatus === TimerStatuses.ENDED) {
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
        clearInterval(timerInterval);
      }
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [minutes, seconds, shouldTimerStart, initialMinutes, initialSeconds, timerStatus]);

  return [minutes, seconds, timerStatus, setTimerStatus];
};

export default useTimer;
