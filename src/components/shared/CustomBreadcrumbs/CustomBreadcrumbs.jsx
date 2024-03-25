import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";

const CustomBreadcrumbs = ({ selectedSite, selectedTitle }) => {
  return (
    <Breadcrumbs
      style={{
        height: "100%",
        backgroundColor: "transparent",
        paddingTop: "2rem",
        paddingLeft: "1rem",
      }}
    >
      <Link underline="hover" color="#0069C8" href="/">
        My Sites
      </Link>
      <Link underline="hover" color="#0069C8" href="/">
        {selectedSite ? selectedSite.name : ""}
      </Link>
      <Typography color="#0069C8">{selectedTitle}</Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
