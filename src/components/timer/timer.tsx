import { Box } from '@mui/material';
import React from 'react';

import { TEN_SECONDS } from '../../core/hooks/use-timer/constants';

interface TimerProps {
  minutes: number;
  seconds: number;
}

const timerStyles = {
  background: '#3c4d5c',
  marginX: '10px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 30,
  color: '#fff',
  paddingX: '10px',
  cursor: 'default',
};

const Timer: React.FC<TimerProps> = ({ minutes, seconds }) => (
  <Box sx={timerStyles}>
    {minutes}:{seconds < TEN_SECONDS ? `0${seconds}` : seconds}
  </Box>
);

export default Timer;
