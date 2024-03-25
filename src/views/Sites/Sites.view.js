import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Link,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { sitesData } from "../Sites/data/mockData";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import ShareIcon from "@mui/icons-material/Share";
import SidePanel from "../../components/shared/SidePanel/SidePanel.component";
import { CardTop } from "../../components/shared/CardTop/CardTop.component";
import ManualEntryData from "../ManualEntryData/ManualEntryData.view";
import ModulesSensor from "../ModulesSensors/ModulesSensor.view";
// import ActionPlan from '../ActionPlan/ActionPlan.view'
import { IoMenu } from "react-icons/io5";
import SiteOverview from "../SiteOverview/SiteOverview.view";
import Synoptic from "../Synoptic/Synoptic";
import SelectionTree from "../../components/shared/selectionTree/selectionTree";
import { AiOutlineEye, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { TfiMenuAlt } from "react-icons/tfi";
import { FiLayers } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { GoBookmark } from "react-icons/go";
import CustomBreadcrumbs from "../../components/shared/CustomBreadcrumbs/CustomBreadcrumbs";
import ModulesSensors from "../ModulesSensors/ModulesSensor.view";
import OptimizationTools from "../OptimizationTools/OptimizationTools.view";

import { useGetSite } from "../../app/hooks/useSites";
import { useParams } from "react-router-dom";

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
  padding: "0px 1rem 5px",
  marginTop: "5px",
  boxShadow: "0px 4px 32px 0px #0000001A",
  clipPath: "inset(-30px -40px 0px -30px)",
};
const sites = [
  {
    id: 1,
    name: "Planta Potabilizadora de Gamboa",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 39.978214,
      longitude: -91.371475,
    },
    contactName: "Álvaro Rubio",
    customerName: "alvarorubio@grupocobra.com",
    weatherStation: "",
  },
  {
    id: 2,
    name: "Planta Desaladora Mina Spence",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 48.823816,
      longitude: 2.257877,
    },
    contactName: "Random Contact",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 3,
    name: "Planta Desaladora de Beni Saf",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -2.230808,
      longitude: 106.134938,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 4,
    name: "Planta Desaladora de Escombreras",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 40.4168,
      longitude: -3.7038,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 5,
    name: "Planta Desaladora de Duqm",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2093
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 6,
    name: "Planta Desaladora de Tuas III",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 7,
    name: "Planta Potabilizadora de Gamboa",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 55.7558,
      longitude: 37.6176
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 8,
    name: "Planta Desaladora de Yibuti",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 45.4215,
      longitude: -75.6919
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 9,
    name: "Planta Desaladora 534DF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -34.6037,
      longitude: -58.3816
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 10,
    name: "Planta Desaladora FDS34DF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -33.9258,
      longitude: 18.4232
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 11,
    name: "Planta Desaladora FDS534",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2093
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 12,
    name: "Planta Desaladora MN123",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 13,
    name: "Planta Desaladora R78E9",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 55.7558,
      longitude: 37.6176
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 14,
    name: "Planta Desaladora 453GDF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 41.9028,
      longitude: 12.4964
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 15,
    name: "Planta Desaladora 324GDF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 16,
    name: "Planta Desaladora SDF1",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 17,
    name: "Planta Desaladora 132DFS",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -22.9068,
      longitude: -43.1729
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 18,
    name: "Planta Desaladora GFD1DS",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: -37.8136,
      longitude: 144.9631
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 19,
    name: "Planta Desaladora 654FDS",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 35.6895,
      longitude: 139.6917
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 20,
    name: "Planta Desaladora DFS231",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 37.7749,
      longitude: -122.4194
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 21,
    name: "Planta Desaladora 234FDS",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 40.4168,
      longitude: -3.7038
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 22,
    name: "Planta Desaladora 534DF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 23,
    name: "Planta Desaladora 534DF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 51.1657,
      longitude: 10.4515
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  },
  {
    id: 24,
    name: "Planta Desaladora 534DF",
    address: "C/ Rnd. No. 7",
    region: "Test Region",
    subRegion: "North",
    country: "SPAIN",
    city: "Test City",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 52.5200,
      longitude: 13.4050
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  }
];

const Sites = () => {
  const { id } = useParams();
  const { data: dataSiteFromDB, isLoading, isError } = useGetSite(id);
  const [selectedSite, setSelectedSite] = useState({});

  useEffect(() => {
    const dataSiteFromDB2 = sites.find((site) => site.id == id);

    console.log("dataSiteFromDBdataSiteFromDB", dataSiteFromDB2);
    // Verifica si hay datos disponibles y actualiza el estado
    if (dataSiteFromDB2) {
      setSelectedSite(dataSiteFromDB2);
    }
  }, [sites]);

  const [toggle, setToggle] = useState(true); // Establecer toggle en true inicialmente
  const [selectedTitle, setSelectedTitle] = useState("SiteOverView");
  const sidepaneldata = [
    { title: "SiteOverView", icon: <AiOutlineEye size={23} /> },
    { title: "Business Operation", icon: <TfiMenuAlt size={23} /> },
    { title: "Modules & Sensors", icon: <FiLayers size={23} /> },
    { title: "Optimization Tools", icon: <BiEdit size={23} /> },
    { title: "Model Visualization", icon: <GoBookmark size={23} /> },
  ];
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

  if (isLoading) return <p>Cargando...</p>;
  if (isError)
    return <p>Ha ocurido un error inesperado. Vuelve a intentarlo ...</p>;
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
          marginTop: "1%",

          width: "100%",
          height: "7vh",
        }}
      >
        <Box style={topPanelStyle}>
          <IoMenu size={26} onClick={toggleSidePanel} style={buttonmenuStyle} />
          <CustomBreadcrumbs
            selectedSite={selectedSite}
            selectedTitle={selectedTitle}
          />
        </Box>
        <Box
          sx={{ display: "flex", alignContent: "center", marginRight: "2%" }}
        >
          <IconButton onClick={""}>
            <AddIcon
              sx={{
                color: "#B3B3B3",
                height: "1.2em",
                width: "1.2em",
              }}
            />
          </IconButton>
          <IconButton onClick={""}>
            <ShareIcon
              sx={{
                color: "#B3B3B3",
              }}
            />
          </IconButton>
          <IconButton onClick={""}>
            <MoreVertIcon
              sx={{
                color: "#B3B3B3",
                height: "1.2em",
                width: "1.2em",
              }}
            />
          </IconButton>
          <IconButton onClick={""}>
            <SaveAltIcon
              sx={{
                color: "#B3B3B3",
                height: "1.2em",
                width: "1.2em",
              }}
            />
          </IconButton>
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
              background: "white",
              width: "400px",
              height: "100%",
              boxShadow: "0px 4px 32px 0px #0000001A",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              margin: "0 1rem 0 2rem",
            }}
          >
            <Box sx={{ height: "55%", width: "100%" }}>
              <SidePanel
                toggle={true}
                onValuesChange={handleValuesChange}
                data={sidepaneldata}
              />
            </Box>
            <Box
              component="div"
              sx={{
                width: "80%",
                height: "2px",
                backgroundColor: "#e6e6e6",
                margin: "auto",
              }}
            ></Box>
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
          {(selectedTitle === "SiteOverView" ||
            selectedTitle === "Multi-Site OV" ||
            selectedTitle === "Action Plan" ||
            (selectedTitle === "Synoptic" && selectedSite)) && (
            <Box sx={{ width: "100%", height: "20vh", display: "flex" }}>
              <CardTop
                selectedSite={selectedSite}
                selectedTitle={selectedTitle}
              />
            </Box>
          )}
          <Box
            sx={{
              width: "100%",
              height:
                selectedTitle === "SiteOverView" ||
                selectedTitle === "Multi-Site OV" ||
                selectedTitle === "Action Plan" ||
                selectedTitle === "Modules & Sensors" ||
                selectedTitle === "Synoptic"
                  ? "60vh"
                  : "80vh",
            }}
          >
            {selectedTitle === "Modules & Sensors" && <ModulesSensors />}
            {selectedTitle === "Manual Entry Data" && <ManualEntryData />}


            {selectedTitle === "Optimization Tools" && (
             <Box sx={{ width: "100%", height: "20vh"}}>
             <CardTop
               selectedSite={selectedSite}
               selectedTitle={selectedTitle}
             />
             <OptimizationTools />
           </Box>
            )}

            {/* {selectedTitle === 'Action Plan' && <ActionPlan />} */}
            {(selectedTitle === "SiteOverView" ||
              selectedTitle === "Multi-Site OV") && (
              <SiteOverview
                selectedTitle={selectedTitle}
                selectedSite={selectedSite}
              />
            )}
            {selectedTitle === "Synoptic" && <Synoptic />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sites;
