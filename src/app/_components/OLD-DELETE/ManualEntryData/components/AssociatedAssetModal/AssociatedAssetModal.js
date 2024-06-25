import React, { useEffect, useMemo, useState } from "react";
import styles from "./AssociatedAssetModal.module.scss";
import { FiPlus } from "react-icons/fi";
import CustomInput from "../../../CustomInput/CustomInput";
import CustomModal from "@/app/_components/CustomModal/CustomModal";

export default function AssociatedAssetModal({
  show,
  setShow,
  assetsData,
  selectedAssets,
  setSelectedAssets,
  onClickAddAsset,
}) {
  const [selectedAssetsIndex, setSelectedAssetsIndex] = useState(
    selectedAssets
  );

  const onClickAsset = (index) => {
    setSelectedAssetsIndex((prev) => {
      if (prev.includes(index)) {
        // Eliminar el índice si ya está presente
        return prev.filter((i) => i !== index);
      } else {
        // Añadir el índice si no está presente
        return [...prev, index];
      }
    });
  };

  const buttonDisabled = useMemo(() => selectedAssetsIndex?.length == 0, [
    selectedAssetsIndex,
  ]);
  const onClickButton = () => {
    setSelectedAssets(selectedAssetsIndex);
    setShow(false);
  };

  return (
    <CustomModal
      title="Associated Asset"
      show={show}
      setShow={setShow}
      buttonDisabled={buttonDisabled}
      onClickButton={onClickButton}
    >
      <div className={`${styles.modalCreate}`}>
        {show ? (
          <div className={styles.modalCreateContainer}>
            <div className={styles.modalCreateContainerScroll}>
              <div className={styles.modalCreateContainerScrollData}>
                <p className={`${styles.modalCreateContainerScrollDataTitle}`}>
                  ADD AN EXISTING ASSET
                </p>
                {assetsData?.map((asset, index) => (
                  <div
                    key={index}
                    className={styles.modalCreateContainerScrollDataInput}
                  >
                    <div
                      className={`${
                        styles.modalCreateContainerScrollDataInputCheckbox
                      } ${
                        selectedAssetsIndex?.includes(index) || false
                          ? styles.modalCreateContainerScrollDataInputCheckboxChecked
                          : ""
                      }`}
                      onClick={() => onClickAsset(index)}
                    />
                    <CustomInput
                      initValue={asset?.description || ""}
                      label={asset?.name || ""}
                      widthLabel={200}
                      style="grey"
                      disabled={true}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalCreateContainerScrollAdd}>
              <div className={styles.modalCreateContainerScrollData}>
                <p className={`${styles.modalCreateContainerScrollDataTitle}`}>
                  ADD AN EXISTING ASSET
                </p>
                <div className={styles.modalCreateContainerScrollDataAddButton}>
                  <FiPlus
                    size={80}
                    color={"#E6E6E6"}
                    className={
                      styles.modalCreateContainerScrollDataAddButtonIcon
                    }
                    onClick={onClickAddAsset}
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
