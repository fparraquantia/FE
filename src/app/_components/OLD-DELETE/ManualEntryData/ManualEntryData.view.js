import { HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { AiOutlinePlus, AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { PiTrash } from "react-icons/pi";
import { MdOutlineModeEdit } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";
import { BsBoxArrowInDown } from "react-icons/bs";
import { BiCalendar, BiSolidDownArrow, BiTime } from "react-icons/bi";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { get, getResponseJson, isOk } from "./axios.helper";
import styles from "./styles.module.css";
import mockGraph from "./mockGraph.png";
import boiler from "./asset1.png";
import heatexchanger from "./asset5.png";
import AddManualEntryModal from "./components/AddManualEntryModal/AddManualEntryModal";
import AssociatedAssetModal from "./components/AssociatedAssetModal/AssociatedAssetModal";
import NewAssetModal from "./components/NewAssetModal/NewAssetModal";
import AssetDetailModal from "./components/AssetDetailModal/AssetDetailModal";
import CustomInput from "../CustomInput/CustomInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import { useParams, useSearchParams } from "next/navigation";
import ApiNotification from "../../ApiNotification/ApiNotification";
import { BACKEND_URL } from "@/core/constants";

const mockData = [
  {
    params: "pH",
    unit: "",
    makeupWater: "7",
    feedWater: "",
    blowdownWater: "",
    condensateReturn: "0",
    minLimit: "0.1",
    maxLimit: "3",
    asset: "Boiler",
  },
  {
    params: "Conductivity",
    unit: "µS/cm",
    makeupWater: "30",
    feedWater: "45",
    blowdownWater: "1400",
    condensateReturn: "5",
    minLimit: "0.1",
    maxLimit: "1700",
    asset: "Boiler",
  },
  {
    params: "Silica",
    unit: "ppm",
    makeupWater: "0.7",
    feedWater: "",
    blowdownWater: "",
    condensateReturn: "0",
    minLimit: "0.1",
    maxLimit: "3",
    asset: "Heat Exchanger",
  },
  {
    params: "M-alkalinity",
    unit: "mmol/l",
    makeupWater: "0",
    feedWater: "",
    blowdownWater: "",
    condensateReturn: "0",
    minLimit: "0.1",
    maxLimit: "3",
    asset: "Heat Exchanger",
  },
  {
    params: "Oxygen",
    unit: "",
    makeupWater: "",
    feedWater: "200",
    blowdownWater: "",
    condensateReturn: "",
    minLimit: "0.1",
    maxLimit: "3",
    asset: "Heat Exchanger",
  },
  {
    params: "Phosphate",
    unit: "ppm",
    makeupWater: "",
    feedWater: "2",
    blowdownWater: "10",
    condensateReturn: "",
    minLimit: "0.1",
    maxLimit: "3",
    asset: "Heat Exchanger",
  },
  {
    params: "Sulfite",
    unit: "ppm",
    makeupWater: "",
    feedWater: "2",
    blowdownWater: "20",
    condensateReturn: "",
    minLimit: "0.1",
    maxLimit: "3",
    asset: "Heat Exchanger",
  },
];
const mockAssets = [
  {
    id: 1,
    name: "Boiler",
    description: "Boiler Room 7",
    image: boiler,
    brand: "",
    pumpcapacity: "",
    liquidtemperature: "",
    backpreasure: "",
    operatingpreassure: "",
    pumpefficiency: "",
    pumphead: "",
    motorpower: "",
  },
  {
    id: 2,
    name: "Heat Exchanger",
    description: "Asset 2",
    image: heatexchanger,
    brand: "",
    pumpcapacity: "",
    liquidtemperature: "",
    backpreasure: "",
    operatingpreassure: "",
    pumpefficiency: "",
    pumphead: "",
    motorpower: "",
  },
];

export default function ManualEntryData(props) {
  const [manualInput, setManualInput] = useState([]);
  const [isManualInputLoading, setIsManualInputLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [current, setCurrent] = useState({});
  const [toggleData, setToggleData] = useState(false);
  const [modal, setModal] = useState(false);
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [viewAssets, setViewAssets] = useState(false);
  const [newAssets, setNewAssets] = useState(false);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [filter, setFilter] = useState("");
  const [addManualEntry, setAddManualEntry] = useState(false);

  const [selectedAssetIndex, setSelectedAssetIndex] = useState(null);
  const [viewAssetsDetails, setViewAssetsDetails] = useState(null);
  const [assetsData, setAssetsData] = useState(mockAssets);
  const [parameters, setParameters] = useState(mockData);
  const [indexEdit, setIndexEdit] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  const params = useParams();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");

  const id = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  useEffect(() => {}, []);
  const addNewParameter = useCallback(
    (newParameter) => {
      setParameters((prevParameters) => [newParameter, ...prevParameters]);
      setIndexEdit((prev) => ({
        ...prev,
        [0]: { ...newParameter },
      }));
    },
    [setParameters]
  );

  const updateEditingData = useCallback(
    (index, field, value) => {
      setIndexEdit((prev) => ({
        ...prev,
        [index]: { ...prev[index], [field]: value },
      }));
      setHasChanges(true);
    },
    [hasChanges]
  );

  const saveChanges = useCallback(() => {
    setParameters((prev) =>
      prev.map((item, idx) =>
        idx in indexEdit ? { ...item, ...indexEdit[idx] } : item
      )
    );
    setIndexEdit({});
    setHasChanges(false);
  }, [parameters, indexEdit, hasChanges]);

  // CAMBIOS RAFA EMPIEZA AQUI -------------------- >>>>>>>>>>>>>>>>>>>>>>
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [dateValue, setDateValue] = useState("2024-02-29");
  const [timeValue, setTimeValue] = useState("00:00");

  useEffect(() => {
    const fetchManualInput = async () => {
      setIsManualInputLoading(true);

      const db = await get(
        `/manualEntry/${dateValue}T${timeValue}:00Z?siteId=${id}`
      );

      if (isOk(db.status)) {
        console.log(db);
        setManualInput(getResponseJson(db));
      } else setManualInput([]);

      setIsManualInputLoading(false);
    };
    if (!isManualInputLoading) {
      fetchManualInput();
    }
  }, [timeValue, dateValue]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
      setIsUploadEnabled(true);
    }
  };
  const handleDragOver = (event) => {
    // FIXME: this does nothing
    event.preventDefault();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileName(file.name);
    }
  };

  const openFileSelector = () => {
    fileInputRef.current.click();
  };
  const sendManualEntry = () => {
    var data = new FormData();
    data.append("manualEntryFile", selectedFile);
    fetch(
      `${BACKEND_URL}/manualEntry/ExcelFile/${id}`,
      {
        method: "POST",
        body: data,
      }
    )
      .then((response) => {
        if (response.status === 201) {
          setModal(false);
          ApiNotification.success(
            "Manual entry uploaded",
            "The manual entry file was uploaded successfully"
          );
        } else {
          ApiNotification.error(
            "Manual entry error",
            "There was an error uploading the manual entry file"
          );
        }
      })
      .then((data) => console.log(data));
  };
  const onTimeChange = (event) => {
    console.log("Time;", event);
    setTimeValue(event);
  };
  const onDateChange = (event) => {
    console.log("Fecha;", event);
    setDateValue(event);
  };

  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>
  // CAMBIOS RAFA ACABA AQUÍ-------------------- >>>>>>>>>>>>>>>>>>>>>>

  const handleClick = (data) => {
    setCurrent(data);
    setShowDetails(true);
  };

  const addNewAsset = (selectedNames) => {
    // Asumiendo que selectedName es el nombre del nuevo activo

    const newId =
      assetsData && assetsData?.length == 0 ? 1 : assetsData.length + 1;

    const newAssetsToAdd = selectedNames.reduce((acc, asset) => {
      if (asset?.id !== -1 && asset?.name) {
        const newAsset = {
          id: asset.id || newId,
          name: asset.name || `Boiler`,
          description: asset.description || `Asset ${acc?.length || 0 + newId}`,
          image: heatexchanger,
          brand: "",
          pumpcapacity: "",
          liquidtemperature: "",
          backpreasure: "",
          operatingpreassure: "",
          pumpefficiency: "",
          pumphead: "",
          motorpower: "",
        };
        acc.push(newAsset);
      }
      return acc;
    }, []);

    // Agrega el nuevo activo y actualiza el estado
    setAssetsData((currentAssetsData) => [
      ...currentAssetsData,
      ...(newAssetsToAdd || []),
    ]);
  };

  const onClickAssetDetail = useCallback(
    (assetDetail) => {
      setAssetsData((currentAssetsData) => {
        const updatedAssetsData = [...currentAssetsData];
        updatedAssetsData[selectedAssetIndex] = assetDetail;
        return updatedAssetsData;
      });
    },
    [selectedAssetIndex]
  );

  const addedAssets = useMemo(() => {
    return assetsData.filter((_asset, index) => selectedAssets.includes(index));
  }, [selectedAssets, assetsData]);

  const selectedAsset = useMemo(() => {
    console.log(assetsData);
    return assetsData?.[selectedAssetIndex] || undefined;
  }, [selectedAssetIndex, assetsData]);

  return (
    <div className={styles.manualEntryContainer}>
      <NewAssetModal
        show={newAssets}
        setShow={setNewAssets}
        onClickButton={addNewAsset}
        assetsData={assetsData}
      />
      <AddManualEntryModal
        show={addManualEntry}
        setShow={setAddManualEntry}
        onAddParameter={addNewParameter}
      />
      <AssociatedAssetModal
        onClickAddAsset={() => {
          setViewAssets(false);
          setNewAssets(true);
        }}
        assetsData={assetsData}
        show={viewAssets}
        setShow={setViewAssets}
        selectedAssets={selectedAssets}
        setSelectedAssets={setSelectedAssets}
      />
      <AssetDetailModal
        show={viewAssetsDetails}
        setShow={setViewAssetsDetails}
        selectedAsset={selectedAsset}
        onClickButton={onClickAssetDetail}
      />
      <div className={styles.manualEntryContainerLeft}>
        <div className={styles.manualEntryHeader}>
          <div className={styles.manualEntryFilters}>
            <div className={styles.dateTime}>
              <CustomInput
                initValue="2024-02-29"
                style="white"
                label="Date & Time"
                widthLabel={135}
                type="date"
                labelStyle="title"
                gap={5}
                onChange={onDateChange}
              />
            </div>
            <div className={styles.time}>
              <CustomInput
                initValue="00:00"
                style="white"
                type="time"
                labelStyle="title"
                gap={0}
                onChange={onTimeChange}
              />
            </div>
            <div className={styles.applicationCont}>
              <CustomSelect
                style="white"
                label="Application"
                widthLabel={115}
                labelPosition="right"
                labelStyle="title"
                options={[]}
                gap={5}
              />
            </div>
            <div className={styles.assetCont}>
              <CustomSelect
                style="white"
                label="Asset"
                widthLabel={60}
                labelPosition="right"
                labelStyle="title"
                options={[]}
                gap={5}
              />
            </div>
          </div>
          <div className={styles.manualEntryControls}>
            <AiOutlinePlus
              size={26}
              onClick={() => {
                setAddManualEntry(true);
              }}
            />
            <MdOutlineModeEdit size={26} />
            <TbShare2 size={26} onClick={() => setModal(true)} />
            <BsBoxArrowInDown
              size={26}
              onClick={() => {
                saveChanges();
              }}
              color={hasChanges ? "green" : ""}
            />
            <PiTrash size={26} />
          </div>
        </div>
        <div className={styles.manualEntryTable}>
          <div className={styles.manualEntryTableHeaders}>
            <input type="checkbox" />
            <div>Parameters</div>
            <div>Unit</div>
            <div>Makeup Water</div>
            <div>Feed Water</div>
            <div>Blowdown Water</div>
            <div>Condensate return</div>
            <div>Min. limit</div>
            <div>Max. limit</div>
          </div>
          {manualInput
            .filter((data) => (filter !== "" ? data.asset === filter : data))
            .map((data, index) => {
              const isEditing = index in indexEdit;
              return (
                <div key={index} className={styles.tableRow}>
                  <input
                    type="radio"
                    id={`radio-${index}`}
                    name="uniqueSelection"
                    onClick={() => handleClick(data)}
                  />
                  <label
                    htmlFor={`radio-${index}`}
                    className={styles.customRadio}
                  ></label>
                  <div>{data.paramName}</div>
                  <div>{data.unitLabel}</div>
                  <div>
                    {isEditing ? (
                      <CustomInput
                        initValue={data.makeupwater}
                        onChange={(value) =>
                          updateEditingData(index, "makeupwater", value)
                        }
                      />
                    ) : (
                      data.makeupwater
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <CustomInput
                        initValue={data.feedwater}
                        onChange={(value) =>
                          updateEditingData(index, "feedwater", value)
                        }
                      />
                    ) : (
                      data.feedwater
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <CustomInput
                        initValue={data.blowdown}
                        onChange={(value) =>
                          updateEditingData(index, "blowdown", value)
                        }
                      />
                    ) : (
                      data.blowdown
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <CustomInput
                        initValue={data.condensate}
                        onChange={(value) =>
                          updateEditingData(index, "condensate", value)
                        }
                      />
                    ) : (
                      data.condensate
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <CustomInput
                        initValue={data.limitMin}
                        onChange={(value) =>
                          updateEditingData(index, "limitMin", value)
                        }
                        style="grey"
                      />
                    ) : (
                      data.minLimit
                    )}
                  </div>
                  <div>
                    {isEditing ? (
                      <CustomInput
                        initValue={data.limitMax}
                        onChange={(value) =>
                          updateEditingData(index, "limitMax", value)
                        }
                        style="grey"
                      />
                    ) : (
                      data.limitMax
                    )}
                  </div>
                </div>
              );
            })}
          {/* <Box sx={{ height: '100%', overflowY: 'scroll' }}>
            <Hider isHidden={!isManualInputLoading}>
              <CircularProgress />
            </Hider>
            {manualInput ? manualInput.map((input, index) => <TableRow {...input} odd={index % 2 === 1} />) : <></>}
          </Box> */}
        </div>
      </div>
      {modal && (
        <div className={styles.uploadModal}>
          <div>
            <p>Upload File</p>
            <div onClick={() => setModal(false)}>+</div>
          </div>
          <div
            className={styles.draganddrop}
            onClick={openFileSelector}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <HiOutlineDocumentArrowUp size={60} color="#ffffff" />
            <p style={{ fontSize: "18px" }}>Select a file to upload</p>
            <p style={{ fontSize: "14px" }}>Or drag and drop it here</p>
            <input
              type="file"
              accept=".xls,.xlsm,.xlsx"
              ref={fileInputRef}
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />
            {selectedFileName && <p>{selectedFileName}</p>}
          </div>
          <div>Or upload from URL</div>
          <div>
            <input type="text" placeholder="Add the File URL" />
            <button disabled={!isUploadEnabled} onClick={sendManualEntry}>
              Upload
            </button>
          </div>
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
      {showDetails && (
        <div className={styles.manualEntryContainerRight}>
          <div className={styles.rightSection}>
            <div>
              <div className={styles.circleBlue}></div>
              <p className={styles.sectionTitle}>Data History & Alerts</p>
            </div>
            <div className={styles.dataButtons}>
              <div
                className={
                  toggleData ? styles.dataButton : styles.dataButtonActive
                }
                onClick={() => setToggleData(false)}
              >
                DATA
              </div>
              <div
                className={
                  !toggleData ? styles.dataButton : styles.dataButtonActive
                }
                onClick={() => setToggleData(true)}
              >
                ALERT
              </div>
            </div>
            {!toggleData ? (
              <>
                <div className={styles.params}>{current.params}</div>
                <div className={styles.graph}>
                  <img src={mockGraph} alt="mock graph" height={"100%"} />
                </div>
              </>
            ) : (
              <div className={styles.alerts}>
                <div>
                  <p>Alert time </p>
                  <p>Limit </p>
                  <p>Value </p>
                  <p>Variation </p>
                </div>
                <div>
                  <p>21/10/2023 14:10:00 </p>
                  <p>Max </p>
                  <p>{current.maxLimit} </p>
                  <p style={{ color: "#ff0000" }}>+9% </p>
                </div>
                <div>
                  <p>14/10/2023 09:30:00 </p>
                  <p>Max </p>
                  <p>{current.maxLimit} </p>
                  <p style={{ color: "#ff0000" }}>+9% </p>
                </div>
                <div>
                  <p>08/10/2023 18:00:00 </p>
                  <p>Max </p>
                  <p>{current.maxLimit} </p>
                  <p style={{ color: "#ff0000" }}>+9% </p>
                </div>{" "}
                <div>
                  <p>08/10/2023 18:00:00 </p>
                  <p>Max </p>
                  <p>{current.maxLimit} </p>
                  <p style={{ color: "#ff0000" }}>+9% </p>
                </div>
              </div>
            )}
          </div>
          <div className={styles.rightSection}>
            <div>
              <div className={styles.circleBlue}></div>
              <p className={styles.sectionTitle}>Associated Asset</p>
              <AiOutlinePlus
                onClick={() => setViewAssets(true)}
                size={30}
                style={{
                  position: "absolute",
                  right: "30px",
                  color: "#b3b3b3",
                }}
              />
            </div>
            <div className={styles.myselectedassets}>
              {addedAssets.map((asset, index) => (
                <div
                  key={index}
                  onClick={() =>
                    setSelectedAssetIndex((prev) =>
                      prev == index ? -1 : index
                    )
                  }
                >
                  <div
                    className={`${styles.assetinfo} ${
                      selectedAssetIndex == index
                        ? styles.myselectedassetsSelected
                        : ""
                    }`}
                  >
                    <p>{asset?.description || ""}:</p>
                    <p>{asset?.name || ""}</p>
                  </div>
                  <img
                    src={asset?.image || ""}
                    alt={asset?.name || ""}
                    width="83px"
                    height="43px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.rightSection}>
            <div>
              <div className={styles.circleBlue}></div>
              <p className={styles.sectionTitle}>Asset Details</p>
              <AiOutlineEdit
                onClick={() => setViewAssetsDetails(true)}
                size={30}
                style={{
                  position: "absolute",
                  right: "30px",
                  color: "#b3b3b3",
                }}
              />
            </div>
            {selectedAsset && (
              <>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Name</p>
                  <p>{selectedAsset?.name || ""}</p>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Operating Preasure</p>
                  <p>{selectedAsset?.operatingpreassure || ""}</p>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <p>Design capacity</p>
                  <p>{selectedAsset?.pumpcapacity || ""}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
