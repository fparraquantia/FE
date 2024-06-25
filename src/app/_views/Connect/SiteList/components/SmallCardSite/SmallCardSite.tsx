"use client";
import { useGetSite } from "@/app/_hooks/useSites";
import styles from "./SmallCardSite.module.scss";
import srcSite from "@/assets/images/site2.png";
import Image from "next/image";
import { IconButton } from "@mui/material";
import { ModeEditOutlineOutlined, MoreVert } from "@mui/icons-material";

export function SmallCardSite({ siteId }: { siteId: number }) {
  const { data: siteData } = useGetSite(siteId);

  return (
    <div className={styles.containerCard}>
      <div className={styles.containerCardHeader}>
        <div className={styles.containerCardHeaderTitle}>
          <p>{siteData?.name}</p>
          <div className={styles.containerCardHeaderTitleDot} />
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
      <div className={styles.containerCardContent}>
        <div className={styles.containerCardContentData}>
          <div className={styles.containerCardContentDataColumn}>
            <div className={styles.containerCardContentDataColumnRow}>
              <p>Region:</p>
              <span>{siteData?.regionName}</span>
            </div>
            <div className={styles.containerCardContentDataColumnRow}>
              <p>Address:</p>
              <span>{siteData?.address}</span>
            </div>
            <div className={styles.containerCardContentDataColumnRow}>
              <p>Contact Person:</p>
              <span>{siteData?.contactName}</span>
            </div>
            <div className={styles.containerCardContentDataColumnRow}>
              <p>E-mail:</p>
              <span>{siteData?.emailAddress}</span>
            </div>
          </div>
        </div>
        <Image
          src={srcSite}
          className={styles.containerCardImage}
          alt="image-site"
        />
      </div>
    </div>
  );
}
