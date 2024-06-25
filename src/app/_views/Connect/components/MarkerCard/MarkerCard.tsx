"use client";
import React from "react";
import styles from "./MarkerCard.module.scss";
import { Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
import Link from "next/link";
import { getRoutesSiteData, RoutesSiteUrl } from "@/app/_constants/routes";

export const MarkerCard = ({
  id,
  name,
  // tipology,
  contactName,
  emailAddress,
  close,
}: {
  id: number;
  name: string;
  // tipology: string;
  contactName: string;
  emailAddress: string;
  close: () => void;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <div className={styles.containerHeaderContent}>
          <p>{name}</p>
          <div className={styles.containerHeaderContentDot} />
        </div>
        <IconButton aria-label="close" size="small" onClick={() => close()}>
          <Close fontSize="small" />
        </IconButton>
      </div>
      <div className={styles.containerTipology}>{""}</div>
      <div className={styles.containerFooter}>
        <div className={styles.containerFooterContent}>
          <div className={styles.containerFooterContentRow}>
            <p>Contact:</p>
            <span>{contactName}</span>
          </div>
          <div className={styles.containerFooterContentRow}>
            <p>E-mail:</p>
            <span>{emailAddress}</span>
          </div>
        </div>
        <Button
          href={getRoutesSiteData(id)[RoutesSiteUrl.overview].href}
          variant="contained"
          size="medium"
          LinkComponent={Link}
        >
          Overview
        </Button>
      </div>
    </div>
  );
};
