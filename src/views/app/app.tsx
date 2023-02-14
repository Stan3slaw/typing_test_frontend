import { Box, TextField } from '@mui/material';
import React, { useState, useEffect } from 'react';

import wordsApiService from '../../core/services/api/words/words-api.service';
import { onInputChangeEvent, onInputCheckEvent } from '../../core/services/sockets/sockets.service';

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

const App: React.FC = () => {
  // const [isConnected, setIsConnected] = useState(socket.connected);
  const [words, setWords] = useState([]);
  const [isValidInput, setIsValidInput] = useState(true);

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     setIsConnected(true);
  //   });

  //   socket.on('disconnect', () => {
  //     setIsConnected(false);
  //   });

  //   socket.on('pong', (data) => {
  //     console.log(data);
  //   });

  //   return () => {
  //     socket.off('connect');
  //     socket.off('disconnect');
  //     socket.off('pong');
  //   };
  // }, []);

  useEffect(() => {
    (async () => {
      const response = await wordsApiService.getWords();
      setWords(response.data);
    })();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onInputChangeEvent.emit(e.target.value);
    onInputCheckEvent.on((data) => {
      setIsValidInput(data.isValid);
    });
  };

  return (
    <React.StrictMode>
      <Box sx={mainLayoutStyles}>
        <Box sx={contentWraperStyles}>
          <Box sx={wordsListContainerStyles}>
            {words.map((word) => (
              <Box
                display="inline-block"
                key={`${word}`}
                sx={{ ...wordStyles, color: !isValidInput ? 'red' : 'black' }}
              >
                {word}
              </Box>
            ))}
          </Box>
          <TextField fullWidth onChange={handleInputChange} />
        </Box>
      </Box>
    </React.StrictMode>
  );
};

export default App;
