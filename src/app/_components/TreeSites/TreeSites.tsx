import { RoutesUrl, RouteTitle } from "@/app/_constants/routes";
import { TTreeSite } from "@/app/_features/treeSites/network/getTreeSites";
import { PersonOutline } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { Tree } from "antd";
import { debounce } from "lodash";
import { useParams } from "next/navigation";
import { Dispatch, Key, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

import styles from "./TreeSites.module.scss";

interface TreeSitesProps {
  type?: "single" | "double" | "multi";
  enablePush?: boolean;
  controlledKeys?: `siteid-${number}`[];
  setControlledKeys?: Dispatch<SetStateAction<`siteid-${number}`[]>>;
  siteName?: string;
  disabled?: boolean;
}

interface TreeNode {
  title: string;
  key: string;
  checkable: boolean;
  children?: TreeNode[];
}

const mockTreeSites: TTreeSite[] = [
  
  {
    siteId: 1,
    siteName: "Planta Potabilizadora de Gamboa",
    regionName: "AMERICA",
    subregionName: "North",
    countryName: "USA",
    postalCode: "62305",
  },
  {
    siteId: 2,
    siteName: "Planta Desaladora Mina Spence",
    regionName: "EMEA",
    subregionName: "South",
    countryName: "France",
    postalCode: "92130",

  },
  {
    siteId: 3,
    siteName: "Planta Desaladora de Beni Saf",
    regionName: "ASEAN",
    subregionName: "--",
    countryName: "Indonesia",
    postalCode: "67156",

  },
  {
    siteId: 4,
    siteName: "Planta Desaladora de Escombreras",
    regionName: "ASEAN",
    subregionName: "--",
    countryName: "Indonesia",
    postalCode: "67156",

  },
  {
    siteId: 5,
    siteName: "Planta Desaladora de Duqm",
    regionName: "ASEAN",
    subregionName: "--",
    countryName: "Indonesia",
    postalCode: "67156",

  },
  {
    siteId: 6,
    siteName: "Planta Desaladora de Tuas III",
    regionName: "ASEAN",
    subregionName: "--",
    countryName: "Indonesia",
    postalCode: "67156",

  }
  // Agrega más sitios según sea necesario
];


export function TreeSites({
  type = "multi",
  enablePush = true,
  controlledKeys,
  setControlledKeys,
  siteName,
  disabled = false,
}: TreeSitesProps) {
  const params = useParams<{ siteId: string }>();
  const [siteNameDebounced, setSiteNameDebounced] = useState(siteName ?? "");
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([...(params.siteId ? [`siteid-${params.siteId}`] : [])]);
  const [checkedKeys, setCheckedKeys] = useState<Key[] | { checked: Key[]; halfChecked: Key[] }>([
    ...(params.siteId ? [`siteid-${params.siteId}`] : []),
  ]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

  const siteNameValueDebounce = useCallback(
    debounce((val: string) => setSiteNameDebounced(val), 400),
    []
  );

  useEffect(() => {
    siteNameValueDebounce(siteName ?? "");
  }, [siteName, siteNameValueDebounce]);

  useEffect(() => {
    if (controlledKeys && setControlledKeys) {
      setCheckedKeys(controlledKeys);
    }
  }, [controlledKeys]);

  const removePrefix = (str: string, prefix: string) => str.replace(`${prefix}-`, "");
  const generateKey = (parts: string[]) => parts.filter(Boolean).join("-");

  const buildLastSiteNode = (sites: TTreeSite[]) => {
    return sites.map((site) => ({
      title: site.siteName,
      key: `siteid-${site.siteId}`, // Asegurarse de que los sitios tengan su ID único
      checkable: true,
      children: undefined,
    }));
  };

  const buildTreeNodes = (sites: TTreeSite[]): TreeNode[] => {
    return sites.map((site) => ({
      title: site.siteName,
      key: `siteid-${site.siteId}`, // Asegurarse de que los sitios tengan su ID único
      checkable: true,
      children: undefined,
    }));
  };

  const treeData = useMemo(() => buildTreeNodes(mockTreeSites), []);

  const onExpand = (expandedKeysValue: Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onSelect = (selectedKeysValue: Key[]) => {
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    const keysArr = Object.values(checkedKeys);
    const isSameSite = params.siteId && keysArr.length == 1 && keysArr?.[0] == `siteid-${params.siteId}`;
    if (enablePush && !isSameSite) {
      const queryParams = Object.values(checkedKeys)
        .filter((key) => key.startsWith("siteid-"))
        .map((key) => key.replace("siteid-", ""))
        .join(",");

      // Aquí deberías tener tu lógica para manejar las queryParams
    } else if (enablePush && isSameSite) {
      // Aquí deberías tener tu lógica para manejar las queryParams cuando el sitio es el mismo
    }
  }, [checkedKeys, enablePush, params.siteId]);

  const onCheck = (checkedK: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
    if (!disabled) {
      const filteredKeys = Object.values(checkedK)
        .filter((k) => k.startsWith("siteid-"))
        .slice(type == "double" ? -2 : type == "single" ? -1 : 0);
      setCheckedKeys(filteredKeys);

      if (controlledKeys && setControlledKeys) {
        setControlledKeys(filteredKeys);
      }
    }
  };

  return (
    <div className={`${styles.container} ${disabled ? styles.containerDisabled : ""}`}>
      <div className={styles.containerTitle}>
        <PersonOutline />
        <p>{RouteTitle[RoutesUrl.siteList]}</p>
      </div>
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData}
      />
    </div>
  );
}
