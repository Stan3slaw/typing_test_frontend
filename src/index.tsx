import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import ReactDOM from 'react-dom/client';

import theme from './resources/styles/theme';
import App from './views/app/app';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
);
