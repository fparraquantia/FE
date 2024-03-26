import React from "react";

import { useState, useEffect } from "react";
import styles from "./SiteOverview.view.css";
import { MdOutlineClose } from "react-icons/md";
import { GoBell } from "react-icons/go";
import ShareIcon from "@mui/icons-material/Share";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

import { FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Divider,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import TextField from "@mui/material/TextField";
// import SidePanel from "../../components/shared/SidePanel/SidePanel.component";
import PowerBiCharts from "../../data/PowerBiCharts";
import { PowerBIEmbed } from "powerbi-client-react";
import { models, Report, Embed, service, Page } from "powerbi-client";

import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import { CiMenuKebab } from "react-icons/ci";
import { BsArrowsAngleContract, BsArrowsAngleExpand } from "react-icons/bs";
import "./SiteOverview.view.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  "& form": { display: "flex", flexDirection: "column", gap: "10px" },
};

const embedConfig = {
  type: "report", // Supported types: report, dashboard, tile, visual, and qna.
  id: "<Report Id>",
  embedUrl: "<Embed Url>",
  accessToken: "<Access Token>",
  tokenType: models.TokenType.Embed, // Use models.TokenType.Aad if you're embedding for your organization.
  settings: {
    panes: {
      filters: {
        expanded: false,
        visible: false,
      },
    },
  },
};

const eventHandlers = new Map([
  [
    "loaded",
    function () {
      console.log("Report loaded");
    },
  ],
  [
    "rendered",
    function () {
      console.log("Report rendered");
    },
  ],
  [
    "error",
    function (event) {
      console.log(event.detail);
    },
  ],
]);

const cssClassName = "report-style-class";

const getEmbeddedComponent = (embeddedReport) => {
  window.report = embeddedReport;
};

function SiteOverview({
  handleSensor,
  powerBiSource,
  selectedTitle,
  selectedSite,
}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editInfo, setEditInfo] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    priority: "",
    type: "",
    description: "",
    status: 0,
    assigned: "",
    expectedDate: "",
    releaseDate: "",
    comment: "",
  });
  const [id1, setId1] = useState(null);
  const [id2, setId2] = useState(null);
  const [prevId, setPrevId] = useState(selectedSite?.id);

  useEffect(() => {
    // Realizar las operaciones que necesites utilizando prevId y selectedSite.id
    // Ejemplo: Actualizar id1 e id2

    setPrevId(selectedSite.id);
    setId1(prevId);
    setId2(id1);

    // Aquí puedes realizar cualquier otra operación que dependa de prevId y selectedSite.id
  }, [prevId, selectedSite.id]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === ""
                ? colors.greenAccent[600]
                : access === "user"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "user" && <EditIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  const dataInfo = [
    { title: "Type", value: "Event" },
    {
      title: "Description",
      value: "Weekly report - The report will include all KPIs trends.",
    },
    { title: "Status", value: "Done" },
    { title: "Assigned", value: "Assigned" },
    { title: "Country", value: "Europe" },
    { title: "Expected date", value: "25/09/2021" },
    { title: "Release date", value: "25/09/2021" },
    { title: "Comment", value: "Report already sent" },
  ];

  const dataItens = [
    {
      id: 1,
      type: "image",
      src:
        "https://mykuritaportal.kurita.eu/Kurita/loadFileImg?fileName=1633935859477-loadFileImg%20(2).png&type=site",
    },
    {
      id: 2,
      type: "powerBi",
      src:
        "https://app.powerbi.com/view?r=eyJrIjoiMTY3OTRjN2YtM2IxNi00ZDE1LTg2YjMtMGI0YWNjMmYyYzhmIiwidCI6ImE4ODAzOTU0LWM2YTYtNGQ2MC1iNGUxLWQ3OGVjYjJjYTgyYSIsImMiOjh9",
    },
    {
      id: 3,
      type: "image",
      src:
        "https://mykuritaportal.kurita.eu/Kurita/loadFileImg?fileName=1639418043876-wwtp1.jpg&type=site",
    },
    {
      id: 4,
      type: "powerBi",
      src:
        "https://app.powerbi.com/view?r=eyJrIjoiMTY3OTRjN2YtM2IxNi00ZDE1LTg2YjMtMGI0YWNjMmYyYzhmIiwidCI6ImE4ODAzOTU0LWM2YTYtNGQ2MC1iNGUxLWQ3OGVjYjJjYTgyYSIsImMiOjh9",
    },
    {
      id: 5,
      type: "image",
      src:
        "https://mykuritaportal.kurita.eu/Kurita/loadFileImg?fileName=1585215331253-CT3.jpg&type=site",
    },
    {
      id: 6,
      type: "powerBi",
      src:
        "https://app.powerbi.com/view?r=eyJrIjoiMTY3OTRjN2YtM2IxNi00ZDE1LTg2YjMtMGI0YWNjMmYyYzhmIiwidCI6ImE4ODAzOTU0LWM2YTYtNGQ2MC1iNGUxLWQ3OGVjYjJjYTgyYSIsImMiOjh9",
    },
  ];

  function handleClick(id, e) {
    if (e.detail === 2) {
      handleSensor(() => id);
    }
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here using formData object
  };

  return (
    <>
      <Box sx={{ width: "98%", display: "flex", alignItems: "center" }}>
  <div
    style={{
      height: "1.5px",
      width: "100%",
      backgroundColor: "#e6e6e6",
      marginTop : "2%"
    }}
  />
  <div style={{ marginTop : "1%",marginLeft: "10px", display: "flex", gap: "5px" }}>
    <SaveAltIcon
      sx={{
        color: "#B3B3B3",
        height: "1em",
        width: "1em",
      }}
    />
    <ShareIcon
      sx={{
        color: "#B3B3B3",
        height: "1em",
        width: "1em",
      }}
    />

  </div>
</Box>
      <div className="main-container">
          <iframe
            className="iframe"
            src="https://app.powerbi.com/reportEmbed?reportId=e2fb96ed-2be6-478d-980b-f935ea063c02&autoAuth=true&ctid=652a421e-a9e7-4cf6-9297-5048a3404291"
            title="embedded-report"
    
            allowFullScreen={true}
          ></iframe>
      </div>
    </>
  );
}

export default SiteOverview;
