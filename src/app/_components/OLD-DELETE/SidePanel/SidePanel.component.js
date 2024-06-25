import React, { useState } from "react";
import { Box, ListItemText } from "@mui/material";

export default function SidePanel(props) {
  const { toggle, onValuesChange, data, initial, children } = props;
  let defaultState = null;
  switch (window.location.pathname) {
    case "MultiSiteOV":
      defaultState = 0;
      break;
    case "TVDisplay":
    default:
      defaultState = 1;
      break;
  }
  const [selectedTitle, setSelectedTitle] = useState(initial);
  const sendValuesToParent = (selectedTitle) => {
    props.onValuesChange(selectedTitle);
  };
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {toggle && (
        <>
          <Box
            sx={{
              maxWidth: "100%",
              height: "100%",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            {data.map((item) => (
              <Box
                key={item.title}
                sx={{
                  width: "100%",
                  padding: "0",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  color: item.title === selectedTitle ? "#009cda" : "#b3b3b3",
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  sendValuesToParent(item.title);
                  setSelectedTitle(item.title);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                >
                  {!item.icon && <Box sx={{ width: "2rem" }}></Box>}
                  <ListItemText primary={item.title} />
                  <Box
                    sx={{
                      color:
                        item.title === selectedTitle ? "#009cda" : "#b3b3b3",
                    }}
                  >
                    {item.icon}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          {children}
        </>
      )}
    </Box>
  );
}
