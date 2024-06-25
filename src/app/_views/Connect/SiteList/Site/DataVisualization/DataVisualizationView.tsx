"use client";
import styles from "./DataVisualizationView.module.scss";
import { useParams, useSearchParams } from "next/navigation";
import { LargeCardSite } from "../../components/LargeCardSite/LargeCardSite";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import Link from "next/link";
import { Input } from "antd";
import { FaCircle } from "react-icons/fa6";
import { Button, IconButton } from "@mui/material";
import React, { useState, useRef } from "react";
import { FaExpand } from 'react-icons/fa'; 
import { useMemo } from "react";
const { Search } = Input;

export function DataVisualisationView() {
  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");

  const iframeRef = useRef<HTMLIFrameElement>(null); 
  const [showTable, setShowTable] = useState(true);
  const handleIconClick = () => {
    setShowTable(false); 
  };
  const enterFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  const siteId = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);


  return (
<div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <div style={{ flex: '0 1 auto', minHeight: '200px', marginBottom: '10px' }}>
      <LargeCardSite siteId={siteId} />
    </div>
    <div style={{ height: '1px', background: '#ccc', margin: '10px 0' }} />

    <div style={{ flex: '1 1 auto', overflow: 'auto' }}>
      <div className={styles.containerPowerBi}>

          <div className={styles.container}>
          <div className={styles.iframeContainer}>
      

            <iframe
              ref={iframeRef}
              className={styles.iframe}
              src="https://ifctooeen.azurewebsites.net"
              title="embedded-report"
              frameBorder="0"
              allowFullScreen={true}
            >


            </iframe>
            <button className={styles.fullscreenButton} onClick={enterFullscreen}>
                <FaExpand />
              </button>
          </div>
        </div>
   
      </div>
    </div>
  </div>
);
}
