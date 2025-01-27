import PropTypes from "prop-types";
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { useMemo } from "react";

import { typography } from "./typography";
import { overrides } from "./overrides";

const ThemeProvider = ({ children }) => {
  const memoizedValue = useMemo(
    () => ({
      typography,
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
};

export default ThemeProvider;

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
