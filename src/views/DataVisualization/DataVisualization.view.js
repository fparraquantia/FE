import { Box, useTheme } from "@mui/material";
import React from 'react';

//  import { PowerBiCharts } from "../../data/PowerBiCharts";

import { tokens } from "../../theme";

function DataVisualization() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        position: "relative",
      }}
    >
      {/* <PowerBiCharts
        height="100%"
        title="Data Visualization"
        src="https://app.powerbi.com/view?r=eyJrIjoiNGNhYzMwZDUtN2QxZi00ZDBjLTgzZjMtNjZjZjA3YmExNWM2IiwidCI6ImE4ODAzOTU0LWM2YTYtNGQ2MC1iNGUxLWQ3OGVjYjJjYTgyYSIsImMiOjh9"
        width="100%"
      /> */}
    </Box>
  );
}

export default DataVisualization;
