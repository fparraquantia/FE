"use client";
import React, { useState } from "react";
import styles from "./SiteListView.module.scss";
import { RoutesUrl, RouteTitle } from "@/app/_constants/routes";
import { Button, IconButton } from "@mui/material";
import {
  Add,
  FileDownloadOutlined,
  GridViewOutlined,
  ModeEditOutlineOutlined,
  ShareOutlined,
  TableRowsOutlined,
  TuneOutlined,
} from "@mui/icons-material";
// import ModalCreate from "@/app/_components/OLD-DELETE/ModalCreate.js/ModalCreate";
import { ModalCreate } from "./components/ModalCreate/ModalCreate";
import { Input } from "antd";
import { ListSites } from "./components/ListSites/ListSites";
import { CardSites } from "./components/CardSites/CardSites";
import { PageContainer } from "@/app/_components/PageContainer/PageContainer";
const { Search } = Input;

export function SiteListView() {
  const [active, setActive] = useState<"list" | "cards" | "settings">("list");
  const [createModal, setCreateModal] = useState(false);
  const [idEdit, setIdEdit] = useState(0);

  const ElementRight = () => (
    <div className={styles.elementRight}>
      <IconButton
        aria-label="close"
        onClick={() => {
          setCreateModal(true);
          setIdEdit(0);
        }}
      >
        <Add />
      </IconButton>
      <IconButton aria-label="close" onClick={() => {}}>
        <ShareOutlined />
      </IconButton>
      <IconButton aria-label="close" onClick={() => {}}>
        <FileDownloadOutlined />
      </IconButton>
      <IconButton aria-label="close" onClick={() => {}}>
        <ModeEditOutlineOutlined />
      </IconButton>
    </div>
  );
  return (
    <PageContainer
      ElementRight={<ElementRight />}
      breadcrumps={[{ href: "", text: RouteTitle[RoutesUrl.siteList] }]}
    >
      <ModalCreate id={idEdit} show={createModal} setShow={setCreateModal} />

      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <p>{RouteTitle[RoutesUrl.siteList]}</p>
          <Search
            placeholder="Search..."
            aria-placeholder="Search..."
            allowClear
            // onSearch={onSearch}
            variant="filled"
            style={{
              width: 350,
            }}
          />
        </div>

        <div className={styles.containerEventLog}>
          <Button variant="contained" size="large">
            Event Log
          </Button>
        </div>
        <div className={styles.containerFilter}>
          <div className={styles.containerFilterButtons}>
            <IconButton
              aria-label="close"
              onClick={() => setActive("settings")}
              color={active == "settings" ? "primary" : "greyColor"}
            >
              <TuneOutlined />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={() => setActive("list")}
              color={active == "list" ? "primary" : "greyColor"}
            >
              <TableRowsOutlined />
            </IconButton>
            <IconButton
              aria-label="close"
              onClick={() => setActive("cards")}
              color={active == "cards" ? "primary" : "greyColor"}
            >
              <GridViewOutlined />
            </IconButton>
          </div>
        </div>
        {active == "list" ? (
          <ListSites />
        ) : active == "cards" ? (
          <CardSites setCreateModal={setCreateModal} setIdEdit={setIdEdit} />
        ) : (
          <></>
        )}
      </div>
    </PageContainer>
  );
}
