"use client";
import styles from "./LargeCardSite.module.scss";
import srcSite from "@/assets/images/site2.png";
import Image from "next/image";
import { IconButton } from "@mui/material";
import { ModeEditOutlineOutlined, MoreVert } from "@mui/icons-material";

const mockSites: { [key: number]: any } = {
 1: {
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
    contactName: "Alvaro Diaz",
    customerName: "random name",
    weatherStation: "",
    tedaguaId: "321X"
  },
 2:  {
    id: 2,
    name: "Planta Desaladora Mina Spence",
    address: "9 Chem. de Bretagne, 92130 Issy-les-Moulineaux",
    region: "EMEA",
    subRegion: "South",
    country: "France",
    city: "Issy-les-Moulineaux",
    postalCode: "92130",
    tedaguaId: "321X",
    tipology: "Headquarter",
    coordinates: {
      latitude: 48.823816,
      longitude: 2.257877,
    },
    contactName: "Fernando Parra",
    customerName: "random name",
    weatherStation: "",
  },
3:  {
    id: 3,
    name: "Planta Desaladora de Beni Saf",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    tedaguaId: "321X",

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
 4: {
    id: 4,
    name: "Planta Desaladora de Escombreras",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    tedaguaId: "321X",

    coordinates: {
      latitude: 40.4168,
      longitude: -3.7038,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
 5: {
    id: 5,
    name: "Planta Desaladora de Duqm",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    tedaguaId: "321X",

    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2093,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
 6: {
    id: 6,
    name: "Planta Desaladora de Tuas III",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    tedaguaId: "321X",

    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
};

export function LargeCardSite({ siteId }: { siteId: number }) {
  const siteData = mockSites[siteId] || mockSites[1]; // Selecciona el sitio basado en siteId, por defecto a 1

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerCardContent}>
        <div className={styles.containerCardContentHeader}>
          <div className={styles.containerCardContentHeaderTitle}>
            <p style={{ overflow: "visible" }}>{siteData.name}</p>
            <div className={styles.containerCardContentHeaderTitleDot} />
          </div>

          <div className={styles.containerCardContentHeaderButtons}>
            <IconButton aria-label="edit" onClick={() => {}}>
              <ModeEditOutlineOutlined />
            </IconButton>
            <IconButton aria-label="more" onClick={() => {}}>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className={styles.containerCardContentWrapper}>
          <div className={styles.containerCardContentWrapperData}>
            <div className={styles.containerCardContentWrapperDataColumn}>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Address:</p>
                <span>{siteData.address}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Code Postal:</p>
                <span>{siteData.postalCode}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>City:</p>
                <span>{siteData.city}</span>
              </div>
            </div>
            <div className={styles.containerCardContentWrapperDataColumn}>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Country:</p>
                <span>{siteData.country}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Latitude:</p>
                <span>{siteData.coordinates.latitude}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Longitude:</p>
                <span>{siteData.coordinates.longitude}</span>
              </div>
            </div>
            <div className={styles.containerCardContentWrapperDataColumn}>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Region:</p>
                <span>{siteData.regionName}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Sub. Region:</p>
                <span>{siteData.subregionName}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Tipology:</p>
                <span>{siteData.tipology}</span>
              </div>
            </div>
            <div className={styles.containerCardContentWrapperDataColumn}>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Tedagua C. Person:</p>
                <span>{siteData.contactName}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Customer Name:</p>
                <span>{siteData.customerName}</span>
              </div>
              <div className={styles.containerCardContentWrapperDataColumnRow}>
                <p>Weather Station:</p>
                <span>{siteData.weatherStation}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Image
        src={srcSite}
        className={styles.containerCardImage}
        alt="image-site"
      />
    </div>
  );
}
