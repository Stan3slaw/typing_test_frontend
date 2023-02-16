import { Box, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

import wordsApiService from '../../core/services/api/words/words-api.service';
import {
  getCurrentWordIndexEvent,
  getWordsEvent,
  onInputChangeEvent,
  onInputCheckEvent,
  onInputSubmitEvent,
  loadMoreWordsEvent,
  refreshWordsEvent,
} from '../../core/services/sockets/sockets.service';
import type { Word } from '../../core/types/word.types';
import { MAX_WORDS_NUMBER_IN_ROW } from '../../core/constants/words.constants';
import useTimer from '../../core/hooks/use-timer/use-timer';
import { TEN_SECONDS } from '../../core/hooks/use-timer/constants';
import Modal from '../../components/modal/modal';
import TimerStatuses from '../../core/hooks/use-timer/enums';

const mainLayoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  margin: '40px 65px 0px 65px',
  alignItems: 'center',
};
const contentWraperStyles = {
  width: '700px',
};
const wordsListContainerStyles = {
  height: '120px',
  padding: '10px 12px',
  marginBottom: '10px',
  overflow: 'hidden',
  lineHeight: '45px',
  background: '#fff',
  border: '1px solid #8eb6d8',
  borderRadius: '8px',
};
const wordStyles = { fontSize: '30px', mr: '10px' };
const inputContainerStyles = { display: 'flex' };
const timerStyles = {
  background: '#3c4d5c',
  marginLeft: '20px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '30px',
  color: '#fff',
  paddingX: '10px',
  cursor: 'default',
};
const scoreMessageStyles = { fontSize: '18px' };

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [inputWord, setInputWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isInputValid, setIsInputValid] = useState(true);
  const [shouldTimerStart, setShouldTimerStart] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const [minutes, seconds, timerStatus, setTimerStatus] = useTimer(shouldTimerStart);

  useEffect(() => {
    (async () => {
      const response = await wordsApiService.getWords();
      setWords(response.data);
    })();
  }, []);

  useEffect(() => {
    getCurrentWordIndexEvent.on((data) => {
      setCurrentWordIndex(data);
    });
  }, []);

  useEffect(() => {
    getWordsEvent.on((data) => {
      setWords(data);
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputWord(e.target.value);
    onInputChangeEvent.emit(e.target.value);
    onInputCheckEvent.on((data) => {
      setIsInputValid(data.isValid);
    });
  };

  const handleInputSubmit = (e: React.KeyboardEvent): void => {
    if (e.key === ' ') {
      e.preventDefault();
      words[currentWordIndex].isValid = words[currentWordIndex].word === inputWord;
      onInputSubmitEvent.emit();
      setInputWord('');
      setIsInputValid(true);

      if (words[currentWordIndex].isValid) {
        setTotalScore(totalScore + 1);
      }

      if (currentWordIndex === MAX_WORDS_NUMBER_IN_ROW) {
        loadMoreWordsEvent.emit();
      }
    }
  };

  const handleTimerStart = (): void => {
    if (!shouldTimerStart) {
      setShouldTimerStart(true);
    }
  };

  const onModalClose = (): void => {
    refreshWordsEvent.emit();
    setTimerStatus(TimerStatuses.STOPPED);
    setShouldTimerStart(false);
    setInputWord('');
    setIsInputValid(true);
    setTotalScore(0);
  };

  return (
    <>
      <Box sx={mainLayoutStyles}>
        <Box sx={contentWraperStyles}>
          <Box sx={wordsListContainerStyles}>
            {words.map((word, index) => (
              <Box
                display="inline-block"
                key={`${word.word}`}
                sx={{
                  ...wordStyles,
                  color: !word.isValid || (currentWordIndex === index && !isInputValid) ? 'red' : 'black',
                  backgroundColor: index < currentWordIndex ? '#EEEEEE' : '#FFFFF',
                }}
              >
                {word.word}
              </Box>
            ))}
          </Box>
          <Box sx={inputContainerStyles}>
            <TextField
              fullWidth
              autoComplete="off"
              value={inputWord}
              onChange={handleInputChange}
              onKeyPress={handleInputSubmit}
              onKeyDown={handleTimerStart}
            />
            <Box sx={timerStyles}>
              {minutes}:{seconds < TEN_SECONDS ? `0${seconds}` : seconds}
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal isOpen={timerStatus === TimerStatuses.ENDED} onClose={onModalClose}>
        <>
          <Typography variant="h4">Your Score</Typography>
          <Typography sx={scoreMessageStyles}>{totalScore} word(s) per minute</Typography>
        </>
      </Modal>
    </>
  );
};

export default App;
