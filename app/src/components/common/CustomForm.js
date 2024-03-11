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
            marginBottom: '8px'
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
