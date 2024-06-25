import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./NewAssetModal.module.scss";
import { FiPlus } from "react-icons/fi";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import { useGetAssets } from "@/app/_hooks/useAssets";

export default function NewAssetModal({
  show,
  setShow,
  onClickButton,
  assetsData,
}) {
  const { data: assets } = useGetAssets();
  const [selectedNames, setSelectedNames] = useState([
    {
      id: -1,
      name: "",
      description: "",
    },
  ]);

  useEffect(() => {
    if (!show) {
      setSelectedNames([{ id: -1, name: "", description: "" }]);
    }
  }, [show]);

  const alreadyHasUnselected = useMemo(
    () => selectedNames.some((asset) => asset.id === -1),
    [selectedNames]
  );

  const buttonDisabled = useMemo(
    () => !selectedNames.some((asset) => asset.id !== -1),
    [selectedNames]
  );

  const handleChangeAsset = (index) => (value) => {
    const valueData = value?.[0]
      ? { id: value[0]?.value, name: value[0]?.label, description: "" }
      : { id: -1, name: "", description: "" };

    setSelectedNames((prevData) => {
      const editedAssets = prevData.map((item, idx) =>
        idx === index ? valueData : item
      );
      return [...editedAssets];
    });
  };
  const addNewAsset = useCallback(() => {
    if (!alreadyHasUnselected) {
      setSelectedNames((prevData) => [
        ...prevData,
        { id: -1, name: "", description: "" },
      ]);
    }
  }, [alreadyHasUnselected]);

  // Opciones select countries
  const assetOptions = useMemo(() => {
    if (assets && assets?.length > 0) {
      return assets.map((asset) => ({
        label: asset?.name || "",
        value: asset?.id || -1,
      }));
    } else {
      return [];
    }
  }, [assets]);

  const SelectAsset = useCallback(
    ({ index, asset }) => {
      return (
        <div key={index} className={styles.modalCreateContainerScrollDataInput}>
          <CustomSelect
            initValue=""
            label={`Asset ${
              (assetsData?.length > 0 && assetsData?.length + index + 1) || 1
            }`}
            widthLabel={100}
            style="secondary"
            onChange={handleChangeAsset(index)}
            options={assetOptions}
          />
        </div>
      );
    },
    [assetsData, assetOptions]
  );

  const onAccept = () => {
    onClickButton(selectedNames);
    setShow(false);
  };

  return (
    <CustomModal
      title="Associated Asset"
      show={show}
      setShow={setShow}
      buttonDisabled={buttonDisabled}
      onClickButton={onAccept}
    >
      <div className={`${styles.modalCreate}`}>
        {show ? (
          <div className={styles.modalCreateContainer}>
            <div className={styles.modalCreateContainerScroll}>
              <div className={styles.modalCreateContainerScrollData}>
                <p className={`${styles.modalCreateContainerScrollDataTitle}`}>
                  ADD AN ASSET
                </p>
                {selectedNames &&
                  selectedNames?.map((asset, index) => (
                    <SelectAsset key={index} index={index} asset={asset} />
                  ))}
                <div className={styles.modalCreateContainerScrollDataAddButton}>
                  <FiPlus
                    size={80}
                    color={"#E6E6E6"}
                    className={`
                     ${styles.modalCreateContainerScrollDataAddButtonIcon}
                     ${
                       alreadyHasUnselected
                         ? styles.modalCreateContainerScrollDataAddButtonIconDisabled
                         : ""
                     }
                    `}
                    onClick={addNewAsset}
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
