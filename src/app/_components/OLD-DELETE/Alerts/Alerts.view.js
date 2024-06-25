import { useState } from "react";
import { Box } from "@mui/material";
import { GoBell } from "react-icons/go";
import SidePanel from "../SidePanel/SidePanel.component";
import { CardTop } from "../CardTop/CardTop.component";
import MenuIcon from "@mui/icons-material/Menu";
import SelectionTree from "../selectionTree/selectionTree";
import CustomBreadcrumbs from "../CustomBreadcrumbs/CustomBreadcrumbs";
import AlertDashboard from "./AlertDashboard";
import AlertLog from "./AlertLog";
import AlertConfiguration from "./AlertConfiguration";
import { useParams } from "next/navigation";
import { useGetSite } from "@/app/_hooks/useSites";

const topPanelStyle = {
  display: "flex",
  alignItems: "center",
  marginLeft: "2rem",
  width: "fit-content",
};
const buttonmenuStyle = {
  witdh: "3rem",
  height: "100%",
  backgroundColor: "#eeeeee",
  borderRadius: "8px 8px 0 0",
  color: "yellow",
  padding: "0 1rem",
};

const Alerts = () => {
  const { id } = useParams();
  const { data: selectedSiteFromDB } = useGetSite(id);
  const [selectedSite, setSelectedSite] = useState(
    selectedSiteFromDB?.[0] && {}
  );
  console.log(selectedSite);

  const [toggle, setToggle] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("My Alerts");
  const sidepaneldata = [
    { title: "My Alerts", icon: <GoBell size={26} /> },
    { title: "Alert Log" },
    { title: "Alert Configuration" },
  ];
  const initial = "My Alerts";
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
          <MenuIcon
            sx={{
              fontSize: 40,
              color: "black",
              background: "#eeeeee",
              padding: 1,
              borderRadius: 2,
            }}
            onClick={toggleSidePanel}
          />
          <CustomBreadcrumbs
            selectedSite={selectedSite}
            selectedTitle={selectedTitle}
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
              width: "15%",
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
                {selectedTitle !== "My Alerts" && (
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
          <Box
            sx={{
              maxWidth: "100%",
              height: "80vh",
              margin: "0 1rem",
            }}
          >
            {selectedTitle === "My Alerts" && <AlertDashboard />}
            {selectedTitle === "Alert Log" && <AlertLog />}
            {selectedTitle === "Alert Configuration" && <AlertConfiguration />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Alerts;
