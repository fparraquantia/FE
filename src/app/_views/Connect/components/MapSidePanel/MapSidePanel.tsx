"use client";

import { TreeSites } from "@/app/_components/TreeSites/TreeSites";
import { RoutesUrl, RouteTitle } from "@/app/_constants/routes";
import { normalizeText } from "@/app/_helpers/pipes";
import srcLogo from "@/assets/images/tedagua-logo-simple.png";
import { Add, Close, Delete, ModeEditOutlineOutlined, TuneOutlined } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import Search from "antd/es/input/Search";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

import styles from "./MapSidePanel.module.scss";

interface AlertType {
  site: string;
  date: Date;
  level: 0 | 1 | 2;
  kpi: string;
}

const alerts: AlertType[] = [
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1694516400000),
    level: 1,
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
    level: 0,
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
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
  {
    site: "Coca Cola Amatil ID",
    date: new Date(1695462120000),
    level: 0,
    kpi: "Feedwater Temperature",
  },
];

export const MapSidePanel = ({ searchSite, setSearchSite }: { searchSite: string; setSearchSite: Dispatch<SetStateAction<string>> }) => {
  const [sidePanel, setSidePanel] = useState(true);
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    return alerts.filter((el) => normalizeText(el?.kpi || "").includes(normalizeText(search)));
  }, [search]);

  return (
    <div className={styles.container}>
      {sidePanel ? (
        <>
          <div className={styles.containerContent}>
            <Image
              src={srcLogo}
              className={styles.containerContentLogo}
              alt="logo-map"
            />

            <div className={styles.containerContentHeader}>
              <p>{RouteTitle[RoutesUrl.siteList]}</p>
              <Button
                variant="contained"
                onClick={() => setSidePanel(false)}>
                Event log
              </Button>
            </div>

            <Search
              placeholder="Search..."
              aria-placeholder="Search..."
              allowClear
              value={searchSite}
              onSearch={(e) => setSearchSite(e)}
              onChange={(e) => setSearchSite(e.target.value)}
              style={{
                width: "100%",
                paddingTop: 20,
                paddingBottom: 20,
              }}
            />
          </div>
          <div className={styles.containerButtons}>
            <div className={styles.containerButtonsLeft}>
              <div className={styles.containerButtonsLeftDot} />
              <p>(0)</p>
            </div>
            <div className={styles.containerButtonsRight}>
              <IconButton
                aria-label="filter"
                onClick={() => {}}>
                <TuneOutlined />
              </IconButton>
              <IconButton
                aria-label="add"
                onClick={() => {}}>
                <Add />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => {}}>
                <ModeEditOutlineOutlined />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => {}}>
                <Delete />
              </IconButton>
            </div>
          </div>
          <div className={styles.containerTreeSite}>
            <div className={styles.containerTreeSiteContent}>
              <TreeSites
                type="multi"
                siteName={searchSite}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.containerLogHeader}>
            <p>EVENT LOG</p>
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => {
                setSidePanel(true);
              }}>
              <Close fontSize="small" />
            </IconButton>
          </div>
          <Search
            placeholder="Search..."
            aria-placeholder="Search..."
            allowClear
            value={search}
            onSearch={(e) => setSearch(e)}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              paddingTop: 20,
              paddingBottom: 20,
            }}
          />
          <div className={styles.containerLogs}>
            <div className={styles.containerLogsContent}>
              {filteredLogs.map((el, index) => (
                <div
                  key={index}
                  className={styles.containerLogsContentElement}>
                  <div
                    className={`${styles.containerLogsContentElementDot} ${
                      el.level == 1 ? styles.green : el.level == 2 ? styles.yellow : styles.red
                    }`}
                  />
                  <div className={styles.containerLogsContentElementText}>
                    <p>{el.kpi}</p>
                    <span>{el.date.toLocaleString("en-UK")}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
