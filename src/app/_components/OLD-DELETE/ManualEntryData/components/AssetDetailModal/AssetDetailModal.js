import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./AssetDetailModal.module.scss";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import CustomInput from "../../../CustomInput/CustomInput";
import CustomSelect from "../../../CustomSelect/CustomSelect";
export default function AssetDetailModal({
  show,
  setShow,
  selectedAsset,
  onClickButton,
}) {
  const [detailAsset, setDetailAssets] = useState(selectedAsset);

  useEffect(() => {
    if (show) {
      setDetailAssets(selectedAsset);
    }
  }, [show]);

  const buttonDisabled = useMemo(
    () => !(detailAsset?.name && detailAsset != ""),
    [detailAsset]
  );

  const handleChangeAsset = (type) => (value) => {
    setDetailAssets((prevData) => ({
      ...prevData,
      [type]: value ?? "",
    }));
  };

  const onAccept = () => {
    onClickButton(detailAsset);
    setShow(false);
  };
  console.log(detailAsset);

  return (
    <CustomModal
      title="Selection Details"
      show={show}
      setShow={setShow}
      buttonDisabled={buttonDisabled}
      onClickButton={onAccept}
      type="edit"
    >
      <div className={`${styles.modalCreate}`}>
        {show ? (
          <div className={styles.modalCreateContainer}>
            <div className={styles.modalCreateContainerScroll}>
              <div className={styles.modalCreateContainerScrollData}>
                <p className={`${styles.modalCreateContainerScrollDataTitle}`}>
                  ADD AN ASSET
                </p>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.id || 0}
                    style="grey"
                    label="ID"
                    widthLabel={215}
                    disabled
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.name || ""}
                    style="secondary"
                    label="Name"
                    widthLabel={215}
                    onChange={handleChangeAsset("name")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomSelect
                    initValue=""
                    style="secondary"
                    label="Products"
                    widthLabel={215}
                    options={[]}
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.brand || ""}
                    style="secondary"
                    label="Brand"
                    widthLabel={215}
                    onChange={handleChangeAsset("brand")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.pumpcapacity || ""}
                    style="secondary"
                    label="Pump Capacity (l/h)"
                    widthLabel={215}
                    onChange={handleChangeAsset("pumpcapacity")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.liquidtemperature || ""}
                    style="secondary"
                    label="Liquid Temperature (ºC)"
                    widthLabel={215}
                    onChange={handleChangeAsset("liquidtemperature")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.backpreasure || ""}
                    style="secondary"
                    label="Back Pressure (bar)"
                    widthLabel={215}
                    onChange={handleChangeAsset("backpreasure")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.operatingpreassure || ""}
                    style="secondary"
                    label="Operating Pressure (bar)"
                    widthLabel={215}
                    onChange={handleChangeAsset("operatingpreassure")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.pumpefficiency || ""}
                    style="secondary"
                    label="Pump Effiency (%)"
                    widthLabel={215}
                    onChange={handleChangeAsset("pumpefficiency")}
                    placeholder="--"
                  />
                </div>
                <div className={styles.modalCreateContainerScrollDataInput}>
                  <CustomInput
                    initValue={selectedAsset?.pumphead || ""}
                    style="secondary"
                    label="Pump Head (m)"
                    widthLabel={215}
                    onChange={handleChangeAsset("pumphead")}
                    placeholder="--"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </CustomModal>
  );
}
