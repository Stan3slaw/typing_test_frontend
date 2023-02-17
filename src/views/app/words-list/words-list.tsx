import { Box } from '@mui/material';
import React from 'react';

import type { Word } from '../../../core/types/word.types';

interface WordsListStyles {
  words: Word[];
  currentWordIndex: number;
  isInputValid: boolean;
}

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
const wordStyles = { fontSize: 30, mr: '10px' };

const WordsList: React.FC<WordsListStyles> = ({ words, currentWordIndex, isInputValid }) => (
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
);

export default WordsList;
