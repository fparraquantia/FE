"use client";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./AssetDetail.module.scss";
import { CircularProgress } from "@mui/material";
import { Error } from "@mui/icons-material";
import { Input, InputNumber } from "antd";
import CustomLabel from "@/app/_components/CustomLabel/CustomLabel";
import {
  useGetAssetProperties,
  useUpdateAssetProperties,
} from "@/app/_hooks/useAssets";
import { AssetProperties } from "@/app/_types/endpoint/Asset";

interface AssetDetailProps {
  assetId: number;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function AssetDetail({ assetId, show, setShow }: AssetDetailProps) {
  const [payload, setPayload] = useState<AssetProperties>();
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // Enable button when editing
  useEffect(() => {
    if (payload) {
      setButtonDisabled(false);
    }
  }, [payload]);

  // Asset Detail
  const {
    data: assetData,
    isLoading: isLoadingAsset,
    isError: errorAsset,
  } = useGetAssetProperties(assetId);

  // Edit Asset - Hook
  const { mutate: updateAsset, isPending: isPendingAsset } =
    useUpdateAssetProperties(assetId);

  // When closing update the inputs with DB data
  useEffect(() => {
    if (!show) {
      setPayload(assetData);
    }
    setButtonDisabled(true);
  }, [show, assetData]);

  // Button Accept - Update details
  const onAccept = useCallback(() => {
    if (payload) {
      updateAsset(payload, {
        onSettled: () => {
          setShow(false);
        },
      });
    }
  }, [updateAsset, payload, setShow]);
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title={"Selection Detail"}
      subtitle={"Asset information"}
      type="edit"
      onClickButton={onAccept}
      buttonDisabled={buttonDisabled}
      isLoadingButton={isPendingAsset}
    >
      <div className={styles.container}>
        {isLoadingAsset ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : errorAsset ? (
          <div className={styles.loading}>
            <Error />
            <span>Assets could not be loaded</span>
          </div>
        ) : (
          payload && (
            <>
              <div className={styles.containerInput}>
                <CustomLabel label="Name" widthLabel={260}>
                  <Input
                    style={{
                      width: "100%",
                    }}
                    defaultValue={payload.name}
                    onChange={(e) =>
                      setPayload((prev) => {
                        if (!prev) return undefined;
                        return {
                          ...prev,
                          name: e.target.value,
                        };
                      })
                    }
                  />
                </CustomLabel>
              </div>
              <div className={styles.containerInput}>
                <CustomLabel label="Brand" widthLabel={260}>
                  <Input
                    style={{
                      width: "100%",
                    }}
                    defaultValue={payload.brand}
                    onChange={(e) =>
                      setPayload((prev) => {
                        if (!prev) return undefined;
                        return {
                          ...prev,
                          brand: e.target.value,
                        };
                      })
                    }
                  />
                </CustomLabel>
              </div>

              {payload.properties.map((property, index) => (
                <div key={index} className={styles.containerInput}>
                  <CustomLabel label={property.property || ""} widthLabel={260}>
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      defaultValue={Number(property.value)}
                      onChange={(e) =>
                        setPayload((prev) => {
                          if (!prev) return undefined;
                          return {
                            ...prev,
                            properties: prev.properties.map((p, i) =>
                              i === index
                                ? { ...p, value: e ? Number(e) : null }
                                : p
                            ),
                          };
                        })
                      }
                    />
                  </CustomLabel>
                </div>
              ))}
            </>
          )
        )}
      </div>
    </CustomModal>
  );
}
