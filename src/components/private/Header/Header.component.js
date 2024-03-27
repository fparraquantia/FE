import { useLinkClickHandler } from "react-router-dom";
import React from "react";

import { Grid } from "@mui/material";

import {
  PlaceOutlined,
  PersonOutlineOutlined,
  SettingsOutlined,
  AssessmentOutlined,
  NotificationsNoneOutlined,
  CalculateOutlined,
  SearchOutlined,
} from "@mui/icons-material";

import InputBase from "@mui/material/InputBase";

import ROUTES from "../../../config/routes.config";

import Button from "../../shared/Buttons/Button.component";

import "./Header.component.css";

export default function Header(props) {
  const translate = props.translator;

  return (
    <Grid container direction="row" paddingLeft={2} paddingRight={2}>
      <Grid item>
        <img
          className="header-icon"
          src="/images/td_logo.png"
          alt="kurita-logo"
        />
      </Grid>

      <Grid item>
        <Button
          onClick={useLinkClickHandler(ROUTES.Map)}
          width="100%"
          height="100%"
          color="#B3B3B3"
        >
          <PlaceOutlined />
          Map
        </Button>
      </Grid>

      <Grid item>
        <Button
          onClick={useLinkClickHandler(ROUTES.SiteListPath)}
          width="100%" height="100%" color="#B3B3B3">
          <PersonOutlineOutlined />
          My sites
        </Button>
      </Grid>

      <Grid item>
        <Button
          onClick={useLinkClickHandler(ROUTES.ConfigurationPath)}
          width="100%" height="100%" color="#B3B3B3">
          <SettingsOutlined />
          Settings
        </Button>
      </Grid>

      <Grid item>
        <Button
          onClick={useLinkClickHandler(ROUTES.Reports)}
          width="100%" height="100%" color="#B3B3B3">
          <AssessmentOutlined />
          Reports
        </Button>
      </Grid>

      <Grid item>
        <Button
          onClick={useLinkClickHandler(ROUTES.AlertsPath)}
          width="100%" height="100%" color="#B3B3B3">
          <NotificationsNoneOutlined />
          Alerts
        </Button>
      </Grid>

      <Grid display="flex" marginBottom={2} marginTop={2} borderRadius={5} backgroundColor="#F7FAFD" >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search.." />
        <Button type="button" color="#B3B3B3" 

        sx={{ p: 2}}>
          <SearchOutlined   />
        </Button>
      </Grid>

      <Grid
        display="flex"
        justifyContent="space-between"
        p={2}
        style={{ height: "70px", marginLeft: "70px", color: "#B3B3B3",  
}}
      > 
        
  
      </Grid>
    </Grid>
  );
}
