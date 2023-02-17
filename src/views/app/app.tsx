import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { BiRevision } from 'react-icons/bi';

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
import Modal from '../../components/modal/modal';
import TimerStatuses from '../../core/hooks/use-timer/enums';
import Timer from '../../components/timer/timer';
import WordsList from './words-list/words-list';

const mainLayoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  margin: '40px 65px 0px 65px',
  alignItems: 'center',
};
const contentWraperStyles = {
  width: '700px',
};
const inputContainerStyles = { display: 'flex' };
const scoreMessageStyles = { fontSize: 18 };
const refreshButtonStyles = { fontSize: 28 };

const App: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [inputWord, setInputWord] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isInputValid, setIsInputValid] = useState(true);
  const [totalScore, setTotalScore] = useState(0);

  const [minutes, seconds, timerStatus, setTimerStatus] = useTimer();

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
    if (timerStatus === TimerStatuses.STOPPED) {
      setTimerStatus(TimerStatuses.STARTED);
    }
  };

  const refreshState = (): void => {
    refreshWordsEvent.emit();
    setInputWord('');
    setIsInputValid(true);
    setTotalScore(0);
  };

  const onModalClose = (): void => {
    setTimerStatus(TimerStatuses.STOPPED);
    refreshState();
  };

  const handleWordsRefresh = (): void => {
    setTimerStatus(TimerStatuses.REFRESHED);
    refreshState();
  };

  return (
    <>
      <Box sx={mainLayoutStyles}>
        <Box sx={contentWraperStyles}>
          <WordsList words={words} currentWordIndex={currentWordIndex} isInputValid={isInputValid} />
          <Box sx={inputContainerStyles}>
            <TextField
              fullWidth
              autoComplete="off"
              value={inputWord}
              onChange={handleInputChange}
              onKeyPress={handleInputSubmit}
              onKeyDown={handleTimerStart}
            />
            <Timer minutes={minutes} seconds={seconds} />
            <Button variant="contained" sx={refreshButtonStyles} onClick={handleWordsRefresh}>
              <BiRevision />
            </Button>
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
