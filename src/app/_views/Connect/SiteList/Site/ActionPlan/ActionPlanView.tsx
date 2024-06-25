"use client";
import styles from "./ActionPlanView.module.scss";
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

interface TDataItem {
  id: number;
  assetName: string;
  assetType: string | null;
  optimizationDescription: string;
  assetStatus: string;
  assetAssigned: string | null;
  assetComment: string;
  assetId: string;
}

const sitesList = [
  {
    assets: 1,
    assetName: "Bomba Captación",
    assetId: "B423",
    assetType: "Bomba",
    optimizationDescription: "Captación de Agua de Mar",
    status: "Done",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 2,
    assetName: "Bomba Captación",
    assetId: "B534",
    assetType: "Bomba",
    optimizationDescription: "Captación de Agua de Mar",
    status: "In Progress",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 3,
    assetName: "Bomba Captación",
    assetId: "B123",
    assetType: "Bomba",
    optimizationDescription: "Captación de Agua de Mar",
    status: "Done",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 4,
    assetName: "Bomba Alta Presión",
    assetId: "L943",
    assetType: "Bomba",
    optimizationDescription: "Bomba Osmosis Inversa",
    status: "In Progress",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 5,
    assetName: "Bomba Alta Presión",
    assetId: "L234",
    assetType: "Bomba",
    optimizationDescription: "Bomba Osmosis Inversa",
    status: "Done",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 6,
    assetName: "Bomba Alta Presión",
    assetId: "L321",
    assetType: "Bomba",
    optimizationDescription: "Bomba Osmosis Inversa",
    status: "Done",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 7,
    assetName: "Dosificación de Químicos",
    assetId: "D432",
    assetType: "Dosificador",
    optimizationDescription: "Dosificación de Coagulantes",
    status: "Done",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 8,
    assetName: "Dosificación de Químicos",
    assetId: "D654",
    assetType: "Dosificador",
    optimizationDescription: "Dosificación de Biocidas",
    status: "In Progress",
    assigned: "Trabajador X01",
    comment: "Optimización Generada",
  },
  {
    assets: 8,
    assetName: "Sistema de Postramiento",
    assetId: "P432",
    assetType: "Sistema",
    optimizationDescription: "Ajuste químico del Agua",
    status: "In Progress",
    assigned: "Trabajador X01",
    comment: "Optimización en Curso",
  },
  {
    assets: 8,
    assetName: "Sistema de Postramiento",
    assetId: "P543",
    assetType: "Sistema",
    optimizationDescription: "Ajuste químico del Agua",
    status: "In Progress",
    assigned: "Trabajador X01",
    comment: "Optimización en Curso",
  },
  {
    assets: 8,
    assetName: "Sistema de Desinfección",
    assetId: "X645",
    assetType: "Sistema",
    optimizationDescription: "Ozonicación del Agua",
    status: "In Progress",
    assigned: "Trabajador X01",
    comment: "Optimización en Curso",
  }
];

export function ActionPlanView() {
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
  const columns: ColumnProps<TDataItem>[] = [
    {
      title: "Asset Name",
      dataIndex: "assetName",
      key: "assetName",
      width: "5%",
      sorter: (a, b) => a.assetName.length - b.assetName.length,
      ellipsis: true,
      render: (text, record) => (
        <Link href={""}>
          {text}
        </Link>
      ),
    },
    {
      title: "Type",
      dataIndex: "assetType",
      key: "assetType",
      width: "5%",
      sorter: (a, b) => (a.assetType?.length ?? 0) - (b.assetType?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Optimization Description",
      dataIndex: "optimizationDescription",
      key: "optimizationDescription",
      width: "8%",
      sorter: (a, b) => (a.optimizationDescription?.length ?? 0) - (b.optimizationDescription?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "assetStatus",
      key: "assetStatus",
      width: "5%",
      sorter: (a, b) => (a.assetStatus?.length ?? 0) - (b.assetStatus?.length ?? 0),
      ellipsis: true,
      render: (text, record) => {
        let color;
        switch (record.assetStatus) {
          case "Done":
            color = "#78D700";
            break;
          case "In Progress":
            color = "#FFD600";
            break;
          default:
            color = "#CCCCCC"; // Color gris para estados desconocidos
        }
        return (
          <span>
            <FaCircle color={color} style={{ marginRight: "5px" }} />
            {text}
          </span>
        );
      },
    },
    {
      title: "Assigned",
      dataIndex: "assetAssigned",
      key: "assetAssigned",
      width: "5%",
      sorter: (a, b) => (a.assetAssigned?.length ?? 0) - (b.assetAssigned?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Comment",
      dataIndex: "assetComment",
      key: "assetComment",
      width: "5%",
      sorter: (a, b) => (a.assetComment?.length ?? 0) - (b.assetComment?.length ?? 0),
      ellipsis: true,
    }
  ];

  const dataTable: TDataItem[] = useMemo(() => {
    return sitesList.map((site) => ({
      id: site.assets,
      assetName: site.assetName,
      assetType: site.assetType,
      optimizationDescription: site.optimizationDescription,
      assetStatus: site.status,
      assetAssigned: site.assigned,
      assetComment: site.comment,
      assetId: site.assetId
    }));
  }, []);

  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");

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
        {showTable ? (
          <>
            <Search
              placeholder="Search..."
              aria-placeholder="Search..."
              allowClear
              variant="filled"
              style={{ width: 350 }}
            />
            <Button style={{ marginLeft: '1%' }} variant="contained" onClick={handleIconClick}>
              NEW OPTIMIZATION
            </Button>
            <Table
              style={{ marginTop: '3%' }}
              columns={columns}
              dataSource={dataTable}
              pagination={{ position: ["bottomCenter"], pageSize: 6 }}
              scroll={{ y: 'calc(100vh - 300px)' }}
            />
          </>
        ) : (
          <div className={styles.container}>
          <div className={styles.iframeContainer}>
      

            <iframe
              ref={iframeRef}
              className={styles.iframe}
              src="https://easyopt.tecnalia.com/#/login?user=lot&password=passLot%2301"
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
        )}
      </div>
    </div>
  </div>
);
}
