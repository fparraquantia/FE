"use client";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styles from "./AddAsset.module.scss";
import { useParams, useSearchParams } from "next/navigation";
import { CircularProgress, IconButton } from "@mui/material";
import { Add, Error } from "@mui/icons-material";
import { Colors } from "@/_styles/variables/colors";
import {
  useCreateAsset,
  useGetAssets,
  useGetAssetsBySite,
} from "@/app/_hooks/useAssets";
import { Select } from "antd";
import { DefaultOptionType } from "antd/es/select";
import CustomLabel from "@/app/_components/CustomLabel/CustomLabel";

interface AddModuleProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function AddAsset({ show, setShow }: AddModuleProps) {
  const [selectAssets, setSelecteAssets] = useState<DefaultOptionType[]>();

  const params = useParams<{ siteId: string }>();
  const searchParams = useSearchParams();
  const sitesIds = searchParams.get("sites-ids");
  const siteId = useMemo(() => {
    const queryParam = Number(sitesIds?.split(",")[0]);
    const idParam = Number(params.siteId);
    return queryParam > 0 ? queryParam : idParam;
  }, [params.siteId, sitesIds]);

  const {
    data: assetsBySite,
    isLoading: loadingAssetsSite,
    isError: error,
  } = useGetAssetsBySite(siteId);

  const { data: assets, isLoading: loadingAsset } = useGetAssets();

  const { mutate: createAsset, isPending: loadingCreate } =
    useCreateAsset(siteId);
  const optionsAssets = useMemo(
    () =>
      assets?.map((asset) => ({
        label: asset.name,
        value: asset.id,
        disabled:
          assetsBySite?.some((assetSite) => assetSite.typeId == asset.id) ||
          selectAssets?.some(
            (selectedAsset) => selectedAsset.value == asset.id
          ),
      })),
    [assets, assetsBySite, selectAssets]
  );

  const onAccept = useCallback(() => {
    selectAssets?.map((selectAsset) => {
      createAsset(selectAsset.value as number, {
        onSettled: () => {
          setShow(false);
        },
      });
    });
  }, [selectAssets, createAsset, setShow]);

  useEffect(() => {
    setSelecteAssets([]);
  }, [show]);
  return (
    <CustomModal
      show={show}
      setShow={setShow}
      title={"Associated assets"}
      subtitle={"Add an asset"}
      type="add"
      onClickButton={onAccept}
      isLoadingButton={loadingCreate}
    >
      <div className={styles.container}>
        {loadingAssetsSite ? (
          <div className={styles.loading}>
            <CircularProgress />
          </div>
        ) : error ? (
          <div className={styles.loading}>
            <Error />
            <span>Assets could not be loaded</span>
          </div>
        ) : (
          assetsBySite?.map((asset, index) => (
            <div key={asset.id} className={styles.containerInput}>
              <CustomLabel label={`Asset ${index + 1}`}>
                <Select
                  style={{
                    width: 300,
                  }}
                  value={{ label: asset.typeName, value: asset.id }}
                  disabled
                />
              </CustomLabel>
            </div>
          ))
        )}

        {selectAssets?.map((selectedAsset, index) => (
          <div key={index} className={styles.containerInput}>
            <CustomLabel
              label={`Asset ${(assetsBySite?.length || 0) + 1 + index}`}
            >
              <Select
                style={{
                  width: 300,
                  zIndex: 20000,
                }}
                onChange={(_, options) =>
                  setSelecteAssets((prev = []) => {
                    const updatedAssets =
                      prev.length > index
                        ? prev.map((item, idx) =>
                            idx === index ? options : item
                          )
                        : [...prev, options];
                    return updatedAssets;
                  })
                }
                loading={loadingAsset}
                options={optionsAssets}
              />
            </CustomLabel>
          </div>
        ))}

        <div className={styles.containerButton}>
          <IconButton
            size="medium"
            onClick={() =>
              setSelecteAssets((prev) => [
                ...(prev || []),
                { label: "", value: 0 },
              ])
            }
            disabled={selectAssets?.some((selected) => selected.label == "")}
          >
            <Add
              fontSize="large"
              sx={{
                width: 80,
                height: 80,
                color: Colors.grey3,
              }}
            />
          </IconButton>
        </div>
      </div>
    </CustomModal>
  );
}
