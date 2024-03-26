import React from 'react';

import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const PowerBiCharts = ({ height, src, tittle, width }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <iframe
      title={tittle}
      width={width}
      height={height}
      src={src}
      frameborder="0"
      allowFullScreen="true"
    ></iframe>
  );
};

export default PowerBiCharts;
