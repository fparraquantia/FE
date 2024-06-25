"use client";

import { normalizeText } from "@/app/_helpers/pipes";
import { Button, Menu } from "@mui/material";
import GoogleMapReact from "google-map-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";


import styles from "./MapView.module.scss";
import { MapSidePanel } from "./components/MapSidePanel/MapSidePanel";
import { MarkerCard } from "./components/MarkerCard/MarkerCard";

const searchParams = useSearchParams();
const NEXT_PUBLIC_GOOGLE_API_KEY = 'AIzaSyD2zoDnIjXXET20PLPMwbNSjZHNatZKg2A'
const Marker = ({
  id,
  name,
  contactName,
  emailAddress,
  lat: _lat,
  lng: _lng,
}: {
  id: number;
  name: string;
  contactName: string;
  emailAddress: string;
  lng: number;
  lat: number;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.wrapper}>
      <Button
        className={styles.wrapperPin}
        aria-controls={open ? "marker-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <p>
          {1} <div className={styles.wrapperDot} />
        </p>
      </Button>
      <Menu
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        id="marker-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MarkerCard
          id={id}
          name={name}
          contactName={contactName}
          emailAddress={emailAddress}
          close={handleClose}
        />
      </Menu>
    </div>
  );
};

export const MapView = () => {
  const [loadedMap, setIsLoaded] = useState(false);
  const [searchSite, setSearchSite] = useState("");
  const sitesIdsFromParams = searchParams.get("sites-ids");

  const { data: session } = useSession();
  console.log(session);

  const sitesList = [
    {
      id: 1,
      name: "Planta Potabilizadora de Gamboa",
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
      name: "Planta Desaladora Mina Spence",
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
      contactName: "Fernando Parra",
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
      name: "Planta Desaladora de Duqm",
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
    }
  ];

  const filteredSites = useMemo(() => {
    const sitesIdsFromParamsArray = sitesIdsFromParams?.split(",");
    return sitesList.filter((site) => {
      const idsCoincidence = !sitesIdsFromParams || sitesIdsFromParamsArray?.includes(site.id.toString());

      const searchCoincidence = normalizeText(site?.name || "").includes(normalizeText(searchSite));
      return idsCoincidence && searchCoincidence;
    });
  }, [sitesIdsFromParams, sitesList, searchSite]);

  return (
    <div className={styles.container}>
      <MapSidePanel
        searchSite={searchSite}
        setSearchSite={setSearchSite}
      />
      <GoogleMapReact
        bootstrapURLKeys={{
          key: NEXT_PUBLIC_GOOGLE_API_KEY,
        }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={{ lat: 24, lng: -12 }}
        defaultZoom={0}
        onGoogleApiLoaded={() => {
          setIsLoaded(true);
        }}>
        {loadedMap &&
          filteredSites.map(
            (site) =>
              site.coordinates?.latitude &&
              site.coordinates.longitude &&
              site.name && (
                <Marker
                  key={`pin-${site.id}`}
                  id={site.id}
                  name={site.name || ""}
                  contactName={site.customerName || ""}
                  lat={Number(site.coordinates.latitude)}
                  lng={Number(site.coordinates.longitude)}
                  emailAddress={site.contactName || ""}
                />
              ),
          )}
      </GoogleMapReact>
    </div>
  );
};
