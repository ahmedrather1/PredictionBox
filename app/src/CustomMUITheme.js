import { createTheme } from "@mui/material/styles";

export const customTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#fff",
          backgroundColor: "#a955c2",
          padding: "6px 30px",
          "&:hover": {
            backgroundColor: "#963db3",
          },
        },
        outlined: {
          borderColor: "#a955c2",
          color: "#a955c2",
          "&:hover": {
            backgroundColor: "#a955c2",
            color: "#fff",
          },
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&::before": {
            borderBottom: "1px solid #fff",
          },
          marginTop: "16px",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "#fff",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fff",
          "&.Mui-selected": {
            color: "#2596be",
          },
          paddingBottom: "20px",
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginTop: "10px", // Adjust this value as needed to add space at the top
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          backgroundColor: "#555555",
        },
        listbox: {
          backgroundColor: "#555555",
        },
        option: {
          color: "white",
        },
      },
    },
  },
});
