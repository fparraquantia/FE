"use client";

import { buttonClasses, createTheme, toggleButtonClasses } from "@mui/material";
import { ThemeConfig } from "antd";

import { Colors } from "./variables/colors";

const defaultTheme = createTheme();

declare module "@mui/material/styles" {
  interface Palette {
    redAccent: {
      light: Colors.redAccentLight;
      dark: Colors.redAccentDark;
      main: Colors.redAccent;
      contrastText: Colors.grey1;
    };
    yellowAccent: {
      light: Colors.yellowAccentLight2;
      dark: Colors.yellowAccentDark2;
      main: Colors.yellowAccent;
      contrastText: Colors.grey1;
    };
    greenAccent: {
      light: Colors.greenAccentLight2;
      dark: Colors.greenAccentDark2;
      main: Colors.greenAccent;
      contrastText: Colors.grey1;
    };
    greyColor: {
      light: Colors.grey4;
      dark: Colors.grey6;
      main: Colors.grey5;
      contrastText: Colors.grey1;
    };
    greyAccent: {
      light: Colors.grey3;
      dark: Colors.grey5;
      main: Colors.grey4;
      contrastText: Colors.grey1;
    };
    greyLightColor: {
      light: Colors.grey2Light;
      dark: Colors.grey2Dark;
      main: Colors.grey2;
      contrastText: Colors.grey6;
    };
  }

  interface PaletteOptions {
    redAccent?: PaletteOptions["primary"];
    yellowAccent?: PaletteOptions["primary"];
    greenAccent?: PaletteOptions["primary"];
    greyColor?: PaletteOptions["primary"];
    greyAccent?: PaletteOptions["primary"];
    greyLightColor?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    redAccent: true;
    yellowAccent: true;
    greenAccent: true;
    greyColor: true;
    greyAccent: true;
    greyLightColor: true;
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    redAccent: true;
    yellowAccent: true;
    greenAccent: true;
    greyColor: true;
    greyAccent: true;
    greyLightColor: true;
  }
}
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    redAccent: true;
    yellowAccent: true;
    greenAccent: true;
    greyColor: true;
    greyLightColor: true;
  }
}

export const themeMUI = createTheme({
  palette: {
    primary: {
      light: Colors.brand4Light,
      dark: Colors.brand4Dark,
      main: Colors.brand4,
      contrastText: Colors.grey1,
    },
    secondary: {
      light: Colors.brand2Light,
      dark: Colors.brand2Dark,
      main: Colors.brand2,
      contrastText: Colors.grey6,
    },
    action: {
      disabledBackground: "",
      disabled: "white",
    },
    success: {
      main: Colors.greenAlert,
      contrastText: Colors.grey1,
    },
    warning: {
      main: Colors.orangeAlert,
      contrastText: Colors.grey1,
    },
    error: {
      main: Colors.redAlert,
      contrastText: Colors.grey1,
    },
    info: {
      main: Colors.yellowAlert,
      contrastText: Colors.grey1,
    },
    redAccent: {
      light: Colors.redAccentLight,
      dark: Colors.redAccentDark,
      main: Colors.redAccent,
      contrastText: Colors.grey1,
    },
    yellowAccent: {
      light: Colors.yellowAccentLight2,
      dark: Colors.yellowAccentDark2,
      main: Colors.yellowAccent,
      contrastText: Colors.grey1,
    },
    greenAccent: {
      light: Colors.greenAccentLight2,
      dark: Colors.greenAccentDark2,
      main: Colors.greenAccent,
      contrastText: Colors.grey1,
    },
    greyColor: {
      light: Colors.grey4,
      dark: Colors.grey6,
      main: Colors.grey5,
      contrastText: Colors.grey1,
    },
    greyAccent: {
      light: Colors.grey3,
      dark: Colors.grey5,
      main: Colors.grey4,
      contrastText: Colors.grey1,
    },
    greyLightColor: {
      light: Colors.grey2Light,
      dark: Colors.grey2Dark,
      main: Colors.grey2,
      contrastText: Colors.grey6,
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: {
        root: {
          [`&.${buttonClasses.disabled}`]: {
            opacity: 0.5,
          },
          [`&.${toggleButtonClasses.root}.${buttonClasses.disabled}`]: {
            color: defaultTheme.palette.action.disabled,
            borderColor: defaultTheme.palette.action.disabledBackground,
          },
          [`&.${toggleButtonClasses.root}.${buttonClasses.disabled}`]: {
            color: defaultTheme.palette.action.disabled,
            borderColor: defaultTheme.palette.action.disabledBackground,
          },
          [`&.${buttonClasses.root}.MuiLoadingButton-loading`]: {
            color: "inherit",
          },
          [`&.${buttonClasses.root}.MuiLoadingButton-loading .MuiLoadingButton-loadingIndicator`]: {
            color: "inherit",
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 200,
        },
      },
    },
  },
});

export const themeAnt: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: Colors.brand4,
    // borderRadius: 2,
    // Alias Token
    colorBgContainer: Colors.grey1,
  },
  components: {
    Button: {
      fontFamily: "Arial",
      algorithm: true, // Enable algorithm
    },
    Input: {
      colorPrimary: Colors.brand4,
      colorPrimaryBg: Colors.brand1,
      colorBgContainer: Colors.brand1,
      controlHeight: 32,
      inputFontSize: 16,
      colorBorder: Colors.brand1,
      fontFamily: "Arial",
      algorithm: true, // Enable algorithm
      colorTextLabel: Colors.grey4,
    },
    InputNumber: {
      colorPrimary: Colors.brand4,
      colorPrimaryBg: Colors.brand1,
      colorBgContainer: Colors.brand1,
      controlHeight: 32,
      inputFontSize: 16,
      colorBorder: Colors.brand1,
      fontFamily: "Arial",
      algorithm: true, // Enable algorithm
      colorTextLabel: Colors.grey4,
    },
    Select: {
      colorPrimary: Colors.brand4,
      colorPrimaryBg: Colors.brand1,
      colorBgContainer: Colors.brand1,
      controlHeight: 35,
      fontSize: 16,
      colorBorder: Colors.brand1,
      fontFamily: "Arial",
      algorithm: true, // Enable algorithm
      colorTextLabel: Colors.grey4,
    },
    Form: {
      labelColor: Colors.grey4,
      labelFontSize: 16,
    },
  },
};
