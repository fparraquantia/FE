import React from "react";

import { useState } from "react";
import { SearchOutlined } from "@mui/icons-material";
import Add from "@mui/icons-material/Add";
import Download from "@mui/icons-material/Download";
import EditOutlined from "@mui/icons-material/EditOutlined";
import Share from "@mui/icons-material/Share";
import { GiSettingsKnobs } from "react-icons/gi";
import { MdOutlineTableRows } from "react-icons/md";
import { PiSquaresFour, PiTrash } from "react-icons/pi";
import { CiMenuKebab } from "react-icons/ci";
import styles from "./sites.module.css";
import InputBase from "@mui/material/InputBase";
import { Grid } from "@mui/material";
import Button from "../../../components/shared/Buttons/Button.component";
import { MdInfoOutline } from "react-icons/md";
import siteImg from "../../../assets/sitesList/ted.jpg";
import logo from "../../../assets/sitesList/logo.png";

import SpinnerLoader from "../../../components/shared/Loader/SpinnerLoader.component";
import ModalCreate from "./components/ModalCreate.js/ModalCreate";
import { useGetSites } from "../../../app/hooks/useSites";
import { Link } from "react-router-dom";
import { SitesPath } from "../../../config/routes.config";
import CustomInput from "../../../components/shared/CustomInput/CustomInput";

export default function SiteList() {
  //const { data: sites } = useGetSites();
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
        longitude: 151.2093,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -118.2437,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 37.6176,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -75.6919,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -58.3816,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 18.4232,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 151.2093,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -118.2437,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 37.6176,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 12.4964,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -74.006,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -0.1278,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -43.1729,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 144.9631,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 139.6917,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -122.4194,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: -3.7038,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 2.3522,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        longitude: 10.4515,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
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
        latitude: 52.52,
        longitude: 13.405,
      },
      contactName: "alvaro.diaz@tedagua.com",
      customerName: "random name",
      weatherStation: "",
    },
  ];

  const [active, setActive] = useState("cards");
  const [createModal, setCreateModal] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  return (
    <div className={styles.mySites}>
      <ModalCreate id={idEdit} show={createModal} setShow={setCreateModal} />
      <div className={styles.mySitesHeader}>
        <p className={styles.title}>My Sites</p>
        <div>
          <Add
            onClick={() => {
              setCreateModal(true);
              setIdEdit(0);
            }}
          />
          <Share />
          <Download />
          <EditOutlined />
        </div>
      </div>

      <div className={styles.mySearch}>
        <div>
          <p className={styles.titleTwo}>My Sites</p>
          <Grid
            display="flex"
            marginBottom={2}
            marginTop={2}
            borderRadius={5}
            backgroundColor="white"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search.." />
            <Button type="button" color="#B3B3B3" sx={{ p: 2 }}>
              <SearchOutlined />
            </Button>
          </Grid>{" "}
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button>Event Log</button>
      </div>
      <div className={styles.dataEntryContainer}>
        <div className={styles.dataEntry}>
          <div className={styles.dateTime}>
            <CustomInput
              initValue="2024-02-15"
              style="white"
              label="Data Entry"
              widthLabel={115}
              type="date"
              labelStyle="title"
              gap={5}
            />
          </div>
          <div className={styles.time}>
            <CustomInput
              initValue="08:00"
              style="white"
              type="time"
              labelStyle="title"
              gap={0}
            />
          </div>
          <div className={styles.iconsContainer}>
            <GiSettingsKnobs
              size={26}
              style={{ color: active === "settings" ? "#0069c8" : "#000000" }}
              onClick={() => setActive("settings")}
            />
            <MdOutlineTableRows
              size={26}
              style={{ color: active === "list" ? "#0069c8" : "#000000" }}
              onClick={() => setActive("list")}
            />
            <PiSquaresFour
              size={26}
              style={{ color: active === "cards" ? "#0069c8" : "#000000" }}
              onClick={() => setActive("cards")}
            />
          </div>
        </div>
      </div>
      {active === "list" && (
        <div className={styles.siteListContainer}>
          <table>
            <thead>
              <tr className={styles.siteListHeader}>
                <td>Site Name</td>
                <td>Address</td>
                <td>Alerts</td>
                <td>TV Display</td>
                <td>Code Postal</td>
                <td>City</td>

              </tr>
            </thead>
            <tbody className={styles.siteList}>
              {sites ? (
                sites.map((data, index) => (
                  <tr key={index} className={styles.siteListRow}>
                    <td>
                      <Link
                        to={`${SitesPath}/${data?.id || 0}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {data.name}
                      </Link>
                    </td>
                    <td>{data.address}</td>
                    <td>
                      <span
                        style={{
                          borderRadius: "50%",
                          backgroundColor:
                            data.alerts === 0
                              ? "#78D700"
                              : data.alerts === 1
                              ? "#FFD600"
                              : "#FF0000",
                        }}
                      ></span>
                    </td>
                    <td>{data.tv_display}</td>
                    <td>{data.postalCode}</td>
                    <td> {data.country}
                    </td>
                    <td>{data.contactName}</td>
                    <td>{data.kurita_controller_id}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {active === "cards" && (
        <div className={styles.siteCardContainer}>
          {sites ? (
            sites.map((data, index) => (
              <div key={index} className={styles.siteCard}>
                <div className={styles.siteCardHeader}>
                  <Link
                    to={`${SitesPath}/${data?.id || 0}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ width: "35px" }}
                        src={logo}
                        alt="site image"
                      />{" "}
                      <p
                        className={styles.bigTitle}
                        style={{ marginLeft: "10px" }}
                      >
                        {data.name}
                      </p>
                    </div>
                  </Link>
                  <div>
                    <EditOutlined
                      size={26}
                      style={{ color: "#cccccc" }}
                      onClick={() => {
                        setCreateModal(true);
                        setIdEdit(data?.id || 0);
                      }}
                    />
                    <PiTrash size={26} style={{ color: "#cccccc" }} />
                    <CiMenuKebab size={26} style={{ color: "#cccccc" }} />
                  </div>
                </div>
                <div className={styles.siteCardBody}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex" }}>
                      <p style={{ margin: 0, color: "#808080" }}>Address</p>
                      <p
                        style={{
                          margin: 0,
                          color: "#B3B3B3",
                          marginLeft: "15px",
                        }}
                      >
                        {data.address}
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <p style={{ margin: 0, color: "#808080" }}>
                        Contact Person
                      </p>
                      <p
                        style={{
                          margin: 0,
                          color: "#B3B3B3",
                          marginLeft: "15px",
                        }}
                      >
                        {data.contactName}
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <p style={{ margin: 0, color: "#808080" }}>Region</p>
                      <p
                        style={{
                          margin: 0,
                          color: "#B3B3B3",
                          marginLeft: "15px",
                        }}
                      >
                        {data.country}
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <p style={{ margin: 0, color: "#808080" }}>City</p>
                      <p
                        style={{
                          margin: 0,
                          color: "#B3B3B3",
                          marginLeft: "15px",
                        }}
                      >
                        {data.city}
                      </p>
                    </div>
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <p style={{ margin: 0, color: "#808080" }}>Customer</p>
                      <p
                        style={{
                          margin: 0,
                          color: "#B3B3B3",
                          marginLeft: "15px",
                        }}
                      >
                        {data.customerName}
                      </p>
                    </div>
                  </div>
                  <img
                    style={{ marginLeft: "20px" }}
                    src={siteImg}
                    alt="site image"
                  />
                </div>
              </div>
            ))
          ) : (
            <SpinnerLoader />
          )}
        </div>
      )}
    </div>
  );
}
