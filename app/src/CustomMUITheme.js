import { createTheme } from '@mui/material/styles';

export const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#fff', // Set text color to white
          backgroundColor: '#a955c2', // Set background color to solid #a955c2
          padding: '6px 30px',
          '&:hover': {
            backgroundColor: '#963db3', // Optional: Darken the button on hover for a subtle effect
          },
        },
        outlined: {
          borderColor: '#a955c2',
          color: '#a955c2', // Set text color to #a955c2 for consistency or to #fff for white text in outlined buttons
          '&:hover': {
            backgroundColor: '#a955c2', // Change background on hover for outlined button, if desired
            color: '#fff', // Change text color on hover to white, if desired
          },
        },
      },
    },
    
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#fff', 
          '&::before': {
            borderBottom: '1px solid #fff', 
          },
          marginTop:'16px',
        },
      },
    },
    
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#fff', 
        },
      },
    },
    
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#fff',
        },
      },
    },
    
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: '#fff', 
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: '#fff', 
          '&.Mui-selected': {
            color: '#2596be',
          },
          paddingBottom: '20px'
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: '10px', // Adjust this value as needed to add space at the top
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: '#555555', 
        },
        listbox: {
          backgroundColor: '#555555', 
        },
        option: {
          color: 'white', 

        },
      },
    },
  },
});
