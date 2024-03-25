import { useState } from "react";

import { useLinkClickHandler } from "react-router-dom";

import { useDispatch } from "react-redux";

import GoogleMapReact from "google-map-react";

import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tune from "@mui/icons-material/Tune";
import Add from "@mui/icons-material/Add";
import Create from "@mui/icons-material/Create";
import Delete from "@mui/icons-material/Delete";

import Hider from "../../../components/shared/Hider/Hider.component";

import MarkerIcon from "../../../components/shared/Icons/Marker.icon";
import AlertIcon from "../../../components/shared/Icons/Alert.icon";
import SelectionTree from "../../../components/shared/selectionTree/selectionTree";
import { SitesPath } from "../../../config/routes.config";

import { googleMapsApiKey } from "../../../config/config";
import { useGetSites } from "../../../app/hooks/useSites";

const sites = [
  {
    id: 1,
    name: "Planta Desaladora X432",
    address: "2620 Ellington Rd, Quincy, IL",
    region: "AMERICA",
    subRegion: "North",
    country: "USA",
    city: "Quincy",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 39.978214,
      longitude: -91.371475,
    },
    contactName: "Cynthia Masson",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 2,
    name: "Proyecto PROVISUR",
    address: "9 Chem. de Bretagne, 92130 Issy-les-Moulineaux",
    region: "EMEA",
    subRegion: "South",
    country: "France",
    city: "Issy-les-Moulineaux",
    postalCode: "92130",
    tipology: "Headquarter",
    coordinates: {
      latitude: 48.823816,
      longitude: 2.257877,
    },
    contactName: "Dylan Poulin",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 3,
    name: "Planta Desaladora de Beni Saf",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    name: "Planta Desaladora para la Mina Spence",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
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
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    coordinates: {
      latitude: 52.5200,
      longitude: 13.4050
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: ""
  }
];

const alerts = [
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1694516400000),
    level: 2,
    kpi: "CO2 Emissions",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1694794980000),
    level: 2,
    kpi: "CO2 Emissions",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695195420000),
    level: 1,
    kpi: "Energy loss by BD+MU",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695460320000),
    level: 2,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695460920000),
    level: 2,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695461520000),
    level: 2,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 2,
    kpi: "Feedwater Temperature",
  },
];

function Marker(props) {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (

    <>
      <Fab
        title={props.title}
        onClick={() => setIsCardOpen(!isCardOpen)}
        sx={{
          color: "#0069C8",
          background: "none",
          boxShadow: "none",
  
          position: "absolute",
          transform: "translate(-50%, -100%)",
          "&:hover": { background: "none" },
        }}
      >
        <Typography
          sx={{
            position: "absolute",
            color: "white",
            fontWeight: "bold",
            fontSize: "24px",
            transform: "translate(0%, -10%)",
          }}
        >
      
        </Typography>
        <Hider isHidden={!props.isAlert}>
          <AlertIcon />
        </Hider>
        <MarkerIcon />
      </Fab>
      <Hider isHidden={!isCardOpen}>
        <MarkerCard
          close={() => setIsCardOpen(false)}
          selectedSite={props.selectedSite}
        />
      </Hider>
    </>
  );
}

function MarkerCard(props) {
  const moveToSitesPage = useLinkClickHandler(
    `${SitesPath}/${props?.selectedSite?.id || 0}`
  );

  return (
    <div
      style={{
        width: "395px",
        height: "152px",
        backgroundColor: "white",
        position: "absolute",
        borderRadius: "10px",
        transform: "translate(10%, -25%)",
        zIndex: 2000,
      }}
    >
      <Grid container padding={2} direction="column">
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Typography fontSize="19px" fontWeight="bold">
                    {props.selectedSite.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <AlertIcon position="inherit" transform="none" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={props.close}
                sx={{
                  minWidth: "20px",
                  color: "#B3B3B3",
                  "&:hover": {
                    background: "none",
                  },
                }}
              >
                X
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item paddingBottom={2}>
          <Typography fontSize="18px" color="#B3B3B3">
            {props.selectedSite.tipology}
          </Typography>
        </Grid>
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Typography color="#808080" fontSize="14px">
                        Contact
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="#B3B3B3" fontSize="14px">
                        {props.selectedSite.contactName}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography color="#808080" fontSize="14px">
                        E-mail
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography color="#B3B3B3" fontSize="14px">
                        xxxxx
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button
                onClick={(e) => {
                  moveToSitesPage(e);
                }}
                sx={{
                  backgroundColor: "#0069C8",
                  color: "white",
                  borderRadius: "10px",
                  "&:hover": {
                    backgroundColor: "#0069C8",
                  },
                }}
              >
                Overview
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

function MapSidePanel(props) {
  const [eventLogOpen, setEventLogOpen] = useState(false);

  const ComponentToRender = eventLogOpen ? EventLog : SitesList;

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "3%",
        width: "395px",
        backgroundColor: "white",
        borderRadius: "15px",
        transform: "translate(0%, -50%)",
      }}
    >
      <ComponentToRender onEventLogClick={setEventLogOpen} />
    </div>
  );
}

function SitesList(props) {
  return (
    <Grid container direction="column" padding={3}>
      <Grid item paddingBottom={5}>
        <img
          src="/images/td_logo_2.png"
          alt="logo"
          width="48px"
          height="48px"
        />
      </Grid>

      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography fontSize="19px" fontWeight="bold">
              My Sites
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => props.onEventLogClick(true)}
              sx={{
                backgroundColor: "#0069C8",
                color: "white",
                borderRadius: "10px",
                "&:hover": { backgroundColor: "#0069C8" },
              }}
            >
              Event Log
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>Searcbar</Grid>

      <Grid item paddingTop={1} paddingBottom={1}>
        <Divider />
      </Grid>

      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <AlertIcon position={null} transform="translate(0%, 5%)" />
              </Grid>
              <Grid item>
                <Typography fontSize="18px" color="#B3B3B3">{`(${
                  sites.filter((marker) => marker.isAlert).length
                })`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container>
              <Grid item>
                <IconButton>
                  <Tune />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Add />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Create />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Delete />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <SelectionTree onSiteSelection={() => {}} />
      </Grid>
    </Grid>
  );
}

function EventLog(props) {
  return (
    <Grid container direction="column" padding={3}>
      <Grid item>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography
              fontSize="19px"
              fontWeight="bold"
              textTransform="uppercase"
            >
              Event Log
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => props.onEventLogClick(false)}
              sx={{
                color: "#E6E6E6",
                minWidth: "20px",
              }}
            >
              X
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid item paddingTop={1} paddingBottom={1}>
        <Divider />
      </Grid>

      <Grid item>Searcbar</Grid>

      <Grid item paddingTop={4}>
        <Grid container direction="column">
          {alerts.map((alert) => {
            return (
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Grid container spacing={1}>
                      <Grid item>
                        <AlertIcon
                          color={alert.level === 2 ? "red" : "yellow"}
                          transform={null}
                          position={null}
                        />
                      </Grid>

                      <Grid item>
                        <Grid container direction="column">
                          <Grid item>
                            <Typography
                              fontSize="18px"
                              color="#808080"
                              maxWidth="202px"
                            >
                              {alert.kpi}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography fontSize="16px" color="#B3B3B3">
                              {alert.date.toLocaleString("en-UK")}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography
                      fontSize="18px"
                      color="#B3B3B3"
                      maxWidth="100px"
                      whiteSpace="break-spaces"
                      sx={{
                        wordWrap: "break-word",
                      }}
                    >
                      {alert.site}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Landing(props) {
  const translate = props.translator;
  const { data: sitesD } = useGetSites();
  const center = { lat: 24, lng: -12 };
  console.log(sitesD);
  return (
    <>
      <GoogleMapReact
        bootstrapURLKeys={{ key: googleMapsApiKey }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={center}
        defaultZoom={0}
      >
        {sites.map((site, index) => (
          <Marker
       
            key={index}
            lat={site.coordinates.latitude}
            lng={site.coordinates.longitude}
            selectedSite={site}
    
        
            {...site}
          />
        ))}
      </GoogleMapReact>
      <MapSidePanel />
    </>
  );
}
