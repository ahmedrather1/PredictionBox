import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const CustomForm = ({ schema, onSubmit }) => {
  const [data, setData] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(data);
  };

  const customTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: '#a955c2',
            borderBottom: '1px solid #fff',
          },
          outlined: {
           
            borderColor: '#a955c2', 
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
  
  

  return (
    <ThemeProvider theme={customTheme}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <JsonForms
            schema={schema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data }) => setData(data)}
            // validationMode={data? "ValidateAndHide"}
          />
          <Button type="submit" variant="outlined" className="mt-2 ">
            Submit
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default CustomForm;
