import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: { primary: { main: '#4D5A69' }, secondary: { main: '#EEEEEE' }, background: { default: '#add5ff' } },
  typography: {
    fontFamily: 'Inter',
  },
  components: {
    MuiOutlinedInput: {
      variants: [
        {
          props: {},
          style: {
            height: '55px',
            borderRadius: '5px',
            backgroundColor: '#fff',
            fontSize: '30px',
          },
        },
      ],
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            borderRadius: '8px',
            textTransform: 'inherit',
            transition: 'none',
            color: 'white',
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            borderRadius: '8px',
            textTransform: 'inherit',
            transition: 'none',
            color: 'black',
          },
        },
        {
          props: { variant: 'text' },
          style: {
            '&:hover': { backgroundColor: 'transparent' },
          },
        },
      ],
    },
  },
});

export default theme;
