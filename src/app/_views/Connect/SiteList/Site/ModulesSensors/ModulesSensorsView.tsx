"use client";
import { Button, CircularProgress, IconButton } from "@mui/material";
import styles from "./ModulesSensorsView.module.scss";
import { Add, ModeEditOutlineOutlined } from "@mui/icons-material";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import moduleSvg from "@/assets/svg/module.svg";
import sensorSvg from "@/assets/svg/sensor.svg";
import boilerSrc from "@/assets/images/boiler.png";
import heatexchangerSrc from "@/assets/images/heatexchanger.png";
import Image from "next/image";
import {
  useGetAssetProperties,
  useGetAssetsBySite,
} from "@/app/_hooks/useAssets";
import { AddModule } from "./components/AddModule/AddModule";
import { AddAsset } from "./components/AddAsset/AddAsset";
import { ModuleDetail } from "./components/ModuleDetail/ModuleDetail";
import { AssetDetail } from "./components/AssetDetail/AssetDetail";

export function ModulesSensorsView() {
  // ID SITE
  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");
  const siteId = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  // Selected IDs
  const [idSelectedModule, setIdSelectedModule] = useState<number>(0);
  const [idSelectedSensor, setIdSelectedSensor] = useState<number>(0);
  const [idSelectedAsset, setIdSelectedAsset] = useState<number>(0);
  const [viewDetail, setViewDetail] = useState<
    "none" | "module" | "sensor" | "asset"
  >("none");

  // MODALS
  const [showAddModule, setShowAddModule] = useState(false);
  const [showDetailModule, setShowDetailModule] = useState(false);
  const [showAddAsset, setShowAddAsset] = useState(false);
  const [showDetailAsset, setShowDetailAsset] = useState(false);

  // Data Modules
  const modulesDataStatic = [
    {id: 1,
      device: "LS02-43",
      name: "Módulo de Osmosis",
      brand: "Brand A",
      model: "Model A",
      installationDate: "2023-01-01",
      communication: "Wifi",
      sensors: [
        { id: 1, modelId: "LSA123", endPoint: "Sensor de Presión", installDate: "2023-01-02",
          assets : [ {
            id : 1,typeName : "928-A", name : "Bomba de Osmosis"},
            {
              id : 2,typeName : "928-B", name : "Bomba de Calor"}
          ]
        },
        { id: 2, modelId: "XSFD42", endPoint: "Sensor de Temperatura", installDate: "2023-01-03" },
        { id: 3, modelId: "LSA123", endPoint: "Sensor de Voltaje", installDate: "2023-01-02" },
        { id: 4, modelId: "XSFD42", endPoint: "Sensor de Intensidad", installDate: "2023-01-03" },
        { id: 5, modelId: "LSA123", endPoint: "Sensor de Purificación", installDate: "2023-01-02" },
        { id: 6, modelId: "XSFD42", endPoint: "Sensor de", installDate: "2023-01-03" }
      ]
    },
    {
      id: 2,
      device: "LS02-5431",
      name: "Módulo de Bombeo",
      brand: "Brand B",
      model: "Model B",
      installationDate: "2023-02-01",
      communication: "Bluetooth",
    
    },
    {
      id: 3,
      device: "LS02-4354",
      name: "Módulo de Desalinización",
      brand: "Brand C",
      model: "Model C",
      installationDate: "2023-03-01",
      communication: "Ethernet",
    },
    {
      id: 4,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },
    {
      id: 5,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },   {
      id: 6,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },   {
      id: 7,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },   {
      id: 8,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },   {
      id: 9,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },   {
      id: 10,
      device: "LS02-4321",
      name: "Módulo de Químicos",
      brand: "Brand D",
      model: "Model D",
      installationDate: "2023-04-01",
      communication: "RFID",
    },
  ];


  // Sets the value of the detail view to be shown
  useEffect(() => {
    if (
      (viewDetail == "asset" && idSelectedAsset == 0) ||
      (viewDetail == "sensor" && idSelectedSensor == 0) ||
      (viewDetail == "module" && idSelectedModule == 0)
    ) {
      setViewDetail(
        idSelectedAsset > 0
          ? "asset"
          : idSelectedSensor > 0
            ? "sensor"
            : idSelectedModule > 0
              ? "module"
              : "none"
      );
    }
  }, [idSelectedModule, idSelectedSensor, idSelectedAsset, viewDetail]);
  console.log(modulesDataStatic
    .find((module) => module.id === idSelectedModule));
  // Show detail view (Module, Asset)
  const showDetail = useCallback(() => {
    if (viewDetail == "module" && idSelectedModule > 0) {
      setShowDetailModule(true);
    } else if (viewDetail == "asset" && idSelectedAsset > 0) {
      setShowDetailAsset(true);
    }
  }, [viewDetail]);
  return (
    <div className={styles.container}>
      <ModuleDetail
        moduleId={idSelectedModule}
        show={showDetailModule}
        setShow={setShowDetailModule}
      />
      <AssetDetail
        assetId={idSelectedAsset}
        show={showDetailAsset}
        setShow={setShowDetailAsset}
      />
      <AddModule show={showAddModule} setShow={setShowAddModule} />
      <AddAsset show={showAddAsset} setShow={setShowAddAsset} />
      <div className={styles.containerCard}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <div className={styles.headerWrapperTitle}>
              <div className={styles.dot} />
              <p>Connected modules</p>
            </div>
            <IconButton
              aria-label="add-module"
              onClick={() => setShowAddModule(true)}
            >
              <Add />
            </IconButton>
          </div>
        </div>
        <div className={styles.content}>
  {modulesDataStatic.map((module) => (
    <Button
      key={module.id}
      onClick={() => {
        if (viewDetail === "module") {
          setIdSelectedModule((prev) =>
            prev !== module.id ? module.id : 0
          );
        } else {
          setIdSelectedModule(module.id);
          setViewDetail("module");
        }
      }}
      variant={idSelectedModule === module.id ? "contained" : "text"}
      className={`${styles.contentRow} ${
        idSelectedModule === module.id
          ? viewDetail === "module"
            ? styles.contentRowDetail
            : styles.contentRowSelected
          : ""
      }`}
    >
 <Image
                  alt="module-icon"
                  src={moduleSvg}
                  className={styles.contentRowImage}
                />
                <div className={styles.contentRowData}>
                  <span>{module.device}</span>
                  <p>{module.name}</p>
                </div>
              </Button>
  ))}
</div>
      </div>

      <div className={styles.containerCard}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <div className={styles.headerWrapperTitle}>
              <div className={styles.dot} />
              <p>Associated sensors</p>
            </div>
          </div>
        </div>
        <div className={styles.content}>
        {modulesDataStatic
            .find((module) => module.id === idSelectedModule)
            ?.sensors?.map((sensor) => (
              <Button
                key={sensor.id}
                onClick={() => {
                  if (viewDetail == "sensor") {
                    setIdSelectedSensor((prev) =>
                      prev != sensor.id ? sensor.id : 0
                    );
                  } else {
                    setIdSelectedSensor(sensor.id);
                    setViewDetail("sensor");
                  }
                }}
                variant={idSelectedSensor == sensor.id ? "contained" : "text"}
                className={`${styles.contentRow} ${
                  idSelectedSensor == sensor.id
                    ? viewDetail == "sensor"
                      ? styles.contentRowDetail
                      : styles.contentRowSelected
                    : ""
                }`}
              >
                <Image
                  alt="sensor-icon"
                  src={sensorSvg}
                  className={styles.contentRowImage}
                />
                <div className={styles.contentRowData}>
                  <span>{sensor.modelId}</span>
                  <p>{sensor.endPoint}</p>
                </div>
              </Button>
            ))
          }
            
        </div>
      </div>

      <div className={styles.containerColumn}>
        <div className={styles.containerColumnCardMid}>
          <div className={styles.header}>
            <div className={styles.headerWrapper}>
              <div className={styles.headerWrapperTitle}>
                <div className={styles.dot} />
                <p>Associated assets</p>
              </div>
              <IconButton
                aria-label="add-assets"
                onClick={() => setShowAddAsset(true)}
              >
                <Add />
              </IconButton>
            </div>
          </div>
          <div className={styles.content}>
          {modulesDataStatic
      .find((module) => module.id === idSelectedModule)
      ?.sensors?.find((sensor) => sensor.id === idSelectedSensor)
      ?.assets?.map((asset) => (
                <Button
                  key={asset.id}
                  onClick={() => {
                    if (viewDetail == "asset") {
                      setIdSelectedAsset((prev) =>
                        prev != asset.id ? asset.id : 0
                      );
                    } else {
                      setIdSelectedAsset(asset.id);
                      setViewDetail("asset");
                    }
                  }}
                  variant={idSelectedAsset == asset.id ? "contained" : "text"}
                  className={`${styles.contentRow} ${styles.asset} ${
                    idSelectedAsset == asset.id
                      ? viewDetail == "asset"
                        ? styles.contentRowDetail
                        : styles.contentRowSelected
                      : ""
                  }`}
                >
                  <div className={styles.contentRowData}>
                    <span>{asset.typeName}</span>
                    <p>{asset.name}</p>
                  </div>
                  <Image
                    alt="asset-image"
                    src={asset.id == 1 ? boilerSrc : heatexchangerSrc}
                    className={styles.contentRowImage}
                  />
                </Button>
              ))
            }
       
          </div>
        </div>
        <div className={styles.containerColumnCardMid}>
          <div className={styles.header}>
            <div className={styles.headerWrapper}>
              <div className={styles.headerWrapperTitle}>
                <div className={styles.dot} />
                <p>Selection Details</p>
              </div>
              <IconButton
                aria-label="edit"
                disabled={viewDetail == "sensor" || viewDetail == "none"}
                onClick={showDetail}
              >
                <ModeEditOutlineOutlined />
              </IconButton>
            </div>
          </div>
          <div className={styles.content}>
  {viewDetail === "sensor" ? (
    // SENSOR DETAIL
    <div className={styles.contentDetails}>
      {modulesDataStatic
        .find((module) => module.id === idSelectedModule)
        ?.sensors?.filter((sensor) => sensor.id === idSelectedSensor)
        .map((sensor) => (
          <div key={sensor.id}>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>ID</span>
              <p>{sensor.id}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Name</span>
              <p>{sensor.endPoint}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Installation Date</span>
              <p>{sensor.installDate}</p>
            </div>
          </div>
        ))}
    </div>
  ) : viewDetail === "module" ? (
    // MODULE DETAIL
    <div className={styles.contentDetails}>
      {modulesDataStatic
        .filter((module) => module.id === idSelectedModule)
        .map((module) => (
          <div key={module.id}>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>ID</span>
              <p>{module.id}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Name</span>
              <p>{module.name}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Brand</span>
              <p>{module.brand}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Model</span>
              <p>{module.model}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Device</span>
              <p>{module.device}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Installation Date</span>
              <p>{module.installationDate}</p>
            </div>
            <div className={styles.contentDetailsData} style={{ paddingTop: "15px" }}>
              <span>Communication</span>
              <p>{module.communication}</p>
            </div>
          </div>
        ))}
    </div>
  ) : (
    ""
  )}
</div>



          
        </div>
      </div>
    </div>
  );
}
