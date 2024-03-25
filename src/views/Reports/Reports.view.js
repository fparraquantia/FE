import React from "react";
import { useState } from "react";
import { Box } from "@mui/material";

import SidePanel from "../../components/shared/SidePanel/SidePanel.component";
import SelectionTree from "../../components/shared/selectionTree/selectionTree";
import CustomBreadcrumbs from "../../components/shared/CustomBreadcrumbs/CustomBreadcrumbs";
import { IoMenu } from "react-icons/io5";
import { GrDocumentPerformance } from "react-icons/gr";
import { TfiMenuAlt } from "react-icons/tfi";
import ReportSite from "./ReportSite.view";
import ReportMultiSingleView from "./ReportMultiSingleView.view";
import ReportEditor from "./ReportEditor.view";
import { useGetSite } from "../../app/hooks/useSites";
import { useParams } from "react-router-dom";
// TODO:

const topPanelStyle = {
  display: "flex",
  alignItems: "center",
  marginLeft: "2rem",
  width: "fit-content",
};
const buttonmenuStyle = {
  witdh: "3rem",
  height: "100%",
  backgroundColor: "#ffffff",
  borderRadius: "8px 8px 0 0",
  color: "#009CDA",
  padding: "0 1rem",
};
const Reports = () => {
  const { id } = useParams();
  const { data: selectedSiteFromDB } = useGetSite(id);
  const [selectedSite, setSelectedSite] = useState(
    selectedSiteFromDB?.[0] && {}
  );
  console.log(selectedSite);

  const [toggle, setToggle] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("Reports");
  const sidepaneldata = [
    { title: "Reports", icon: <GrDocumentPerformance size={26} /> },
    { title: "Report Multiple View", icon: <TfiMenuAlt size={26} /> },
    {
      title: "Report Editor",
      icon: <TfiMenuAlt size={26} style={{ color: "transparent" }} />,
    },
  ];
  const initial = "Reports";
  const toggleSidePanel = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  const handleSiteSelection = (selectedSite) => {
    setSelectedSite(selectedSite);
  };
  // En el componente padre (Sites)
  const handleValuesChange = (selectedTitle, activeItem) => {
    setSelectedTitle(selectedTitle);
  };
  console.log(selectedSite);
  return (
    <Box
      sx={{
        maxWidth: "100%",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/*PANEL SUPERIOR: BOTÓN DE SIDEBAR, SCRUMBREAD E ICONOS*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          width: "100%",
          height: "7vh",
        }}
      >
        <Box style={topPanelStyle}>
          <IoMenu size={26} onClick={toggleSidePanel} style={buttonmenuStyle} />
          <CustomBreadcrumbs
            selectedSite={selectedSite}
            selectedTitle={initial}
          />
        </Box>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          flex: toggle ? 1 : "none",
        }}
      >
        {toggle && (
          <Box
            sx={{
              width: "20%",
              height: "100%",
              boxShadow: "2px 5px 10px 5px #00000033",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              margin: "0 1rem 0 2rem",
            }}
          >
            <Box
              sx={{
                height: "60%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <SidePanel
                toggle={toggle}
                onValuesChange={handleValuesChange}
                data={sidepaneldata}
                initial={initial}
              >
                {selectedTitle !== "Reports" && (
                  <SelectionTree
                    onSiteSelection={handleSiteSelection}
                    selectedTitle={selectedTitle}
                  />
                )}
              </SidePanel>
            </Box>
          </Box>
        )}

        <Box
          sx={{
            minWidth: toggle ? "80%" : "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {selectedTitle === "Reports" && (
            <Box sx={{ width: "100%", display: "flex" }}>
              <ReportSite
                selectedSite={selectedSite}
                selectedTitle={selectedTitle}
              />
            </Box>
          )}
          {selectedTitle === "Report Multiple View" && (
            <Box sx={{ width: "100%", display: "flex" }}>
              <ReportMultiSingleView
                selectedSite={selectedSite}
                selectedTitle={selectedTitle}
              />
            </Box>
          )}
          {selectedTitle === "Report Editor" && (
            <Box sx={{ width: "100%", display: "flex" }}>
              <ReportEditor
                selectedSite={selectedSite}
                selectedTitle={selectedTitle}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Reports;
