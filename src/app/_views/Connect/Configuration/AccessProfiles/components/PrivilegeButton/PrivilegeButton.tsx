"use client";

import { Colors } from "@/_styles/variables/colors";
import { useGetProfileRoles } from "@/app/_pages/AccessProfile/network/getProfileRoles";
import { useGetRoles } from "@/app/_pages/AccessProfile/network/getRoles";
import {
  AssessmentOutlined,
  Edit,
  EditOff,
  ModeEditOutlineOutlined,
  NotificationsNoneOutlined,
  PersonOutline,
  PlaceOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton } from "@mui/material";
import { Switch } from "antd";
import React, { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";

import styles from "./PrivilegeButton.module.scss";

enum RoleCategory {
  Map = "Map",
  Alerts = "Alerts",
  MySites = "My Sites",
  Reports = "Reports",
  Settings = "Settings",
}

export type ExtendedRoleEnum = `${RoleEnum}_RO` | `${RoleEnum}_RW`;

export enum RoleEnum {
  MAP = "MAP",
  ALERTS = "ALERTS",
  ALERTSCONFIG = "ALERTSCONFIG",
  SITELIST = "SITELIST",
  SITEOV = "SITEOV",
  SITEMULTIOV = "SITEMULTIOV",
  ACTIONS = "ACTIONS",
  MODULES = "MODULES",
  MANUALENTRY = "MANUALENTRY",
  SYNOPTIC = "SYNOPTIC",
  DATAVIZ = "DATAVIZ",
  SHARES = "SHARES",
  TVDISPLAY = "TVDISPLAY",
  REPORTS = "REPORTS",
  REPORTSMULTI = "REPORTSMULTI",
  USERSCONFIG = "USERSCONFIG",
  PROFILESCONFIG = "PROFILESCONFIG",
}

export interface PrivilegeTypeData {
  title: string;
  value: RoleEnum;
}

export interface PrivilegeType {
  title: RoleCategory;
  icon: ReactNode;
  privileges: PrivilegeTypeData[];
}

type PrivilegesType = PrivilegeType[];

interface PrivilegeButtonProps {
  selectedProfile: string;
  setSave: Dispatch<SetStateAction<boolean>>;
  setRoleIds: Dispatch<SetStateAction<string[]>>;
}

export default function PrivilegeButton({ selectedProfile, setSave, setRoleIds }: PrivilegeButtonProps) {
  const { data: rolesData, isLoading: loadingRoles } = useGetRoles();
  const { data: profileRolesData, isLoading: loadingProfileRoles } = useGetProfileRoles({ groupId: selectedProfile ?? "" });
  const [roleNameIds, setRoleNameIds] = useState<ExtendedRoleEnum[]>([]);

  const initialIds = useMemo(() => profileRolesData?.map((profile) => profile.value as ExtendedRoleEnum), [profileRolesData]);

  useEffect(() => {
    const idsByRolesData = rolesData?.filter((roleEl) => roleNameIds.includes(roleEl.value as ExtendedRoleEnum)).map((el) => el.id);
    setRoleIds(idsByRolesData ?? []);
  }, [roleNameIds, rolesData]);

  useEffect(() => {
    setSave(false);
  }, [selectedProfile]);

  useEffect(() => {
    setRoleNameIds(initialIds ?? []);
  }, [initialIds]);

  const privilegesData: PrivilegesType = [
    {
      title: RoleCategory.Map,
      icon: <PlaceOutlined />,
      privileges: [{ title: "Map", value: RoleEnum.MAP }],
    },
    {
      title: RoleCategory.Alerts,
      icon: <NotificationsNoneOutlined />,
      privileges: [
        { title: "My Alerts", value: RoleEnum.ALERTS },
        { title: "Alert Log", value: RoleEnum.ALERTSCONFIG },
      ],
    },
    {
      title: RoleCategory.MySites,
      icon: <PersonOutline />,
      privileges: [
        { title: "Site List", value: RoleEnum.SITELIST },
        { title: "Site OV", value: RoleEnum.SITEOV },
        { title: "Multisite OV", value: RoleEnum.SITEMULTIOV },
        { title: "Action Plan", value: RoleEnum.ACTIONS },
        { title: "Modules & Sensors", value: RoleEnum.MODULES },
        { title: "Manual Entries", value: RoleEnum.MANUALENTRY },
        { title: "Synoptic", value: RoleEnum.SYNOPTIC },
        { title: "Data Visualization", value: RoleEnum.DATAVIZ },
        { title: "My Shares", value: RoleEnum.SHARES },
        { title: "TV Display", value: RoleEnum.TVDISPLAY },
      ],
    },
    {
      title: RoleCategory.Reports,
      icon: <AssessmentOutlined />,
      privileges: [
        { title: "Reports", value: RoleEnum.REPORTS },
        { title: "Multisite Reports", value: RoleEnum.REPORTSMULTI },
      ],
    },
    {
      title: RoleCategory.Settings,
      icon: <SettingsOutlined />,
      privileges: [
        { title: "Access Profiles", value: RoleEnum.PROFILESCONFIG },
        { title: "User Settings", value: RoleEnum.USERSCONFIG },
      ],
    },
  ];

  const toggleCategoryPrivileges = useCallback(
    (category: RoleCategory) => {
      setSave(true);
      setRoleNameIds((prevRoles) => {
        const rolesByCategoriesValues = privilegesData
          .find((privileges) => privileges.title == category)
          ?.privileges.map((rol) => rol.value);

        const allInReadOnly = !!rolesByCategoriesValues?.every((roleType) => prevRoles?.includes(`${roleType}_RO`));
        const allInReadWrite = !!rolesByCategoriesValues?.every((roleType) => prevRoles?.includes(`${roleType}_RW`));
        // When toggling off, also remove these ids from idsEdit
        const cleanIdsByCategory = prevRoles?.filter(
          (idRoleByCategory) => !rolesByCategoriesValues?.includes(idRoleByCategory.replace("_RO", "").replace("_RW", "") as RoleEnum),
        );

        const newIds: ExtendedRoleEnum[] = allInReadWrite
          ? cleanIdsByCategory
          : allInReadOnly
            ? [...cleanIdsByCategory, ...(rolesByCategoriesValues?.map((roleCategory) => `${roleCategory}_RW` as ExtendedRoleEnum) ?? [])]
            : [...cleanIdsByCategory, ...(rolesByCategoriesValues?.map((roleCategory) => `${roleCategory}_RO` as ExtendedRoleEnum) ?? [])];

        return newIds;
      });
    },
    [privilegesData, setSave],
  );

  const togglePrivilege = useCallback(
    (role: RoleEnum, isWrite: boolean) => {
      setSave(true);
      setRoleNameIds((prevRoles) => {
        const hasRoleWriteAlready = prevRoles.includes(`${role}_${"RW"}`);
        const hasRoleReadAlready = prevRoles.includes(`${role}_${"RO"}`);

        const idWithNoRole = prevRoles.filter((roleEl) => roleEl !== `${role}_RW` && roleEl !== `${role}_RO`);
        // If type write and already has this role then use Read Only
        return (isWrite && hasRoleWriteAlready) || (!isWrite && !hasRoleReadAlready && !hasRoleWriteAlready)
          ? [...idWithNoRole, `${role}_RO`]
          : isWrite && !hasRoleWriteAlready
            ? [...idWithNoRole, `${role}_RW`]
            : idWithNoRole;
      });
    },
    [setRoleNameIds, setSave],
  );

  const hasAllSelected = useCallback(
    (category: RoleCategory) =>
      privilegesData
        ?.find((categoryEl) => categoryEl.title == category)
        ?.privileges.every((priv) => roleNameIds?.includes(`${priv.value}_RO`) || roleNameIds?.includes(`${priv.value}_RW`)),
    [roleNameIds, privilegesData],
  );
  const hasAllEdited = useCallback(
    (category: RoleCategory) =>
      privilegesData
        ?.find((categoryEl) => categoryEl.title == category)
        ?.privileges.every((priv) => roleNameIds?.includes(`${priv.value}_RW`)),
    [roleNameIds, privilegesData],
  );

  const hasAnySelected = useCallback(
    (category: RoleCategory) =>
      privilegesData
        ?.find((categoryEl) => categoryEl.title == category)
        ?.privileges.some((priv) => roleNameIds?.includes(`${priv.value}_RO`) || roleNameIds?.includes(`${priv.value}_RW`)),
    [roleNameIds, privilegesData],
  );
  return (
    <>
      {privilegesData.map((privilegeData, index) => (
        <div
          key={`privilege-${index}`}
          className={`${styles.container} ${!selectedProfile ? styles.containerDisabled : ""}`}>
          <div className={styles.containerParent}>
            <LoadingButton
              loading={loadingRoles || loadingProfileRoles}
              disabled={!selectedProfile}
              variant="contained"
              onClick={() => toggleCategoryPrivileges(privilegeData.title)}
              className={styles.containerParentRow}
              color={
                hasAllEdited(privilegeData.title)
                  ? "redAccent"
                  : hasAllSelected(privilegeData.title)
                    ? "primary"
                    : hasAnySelected(privilegeData.title)
                      ? "secondary"
                      : "greyLightColor"
              }
              startIcon={privilegeData.icon}
              endIcon={hasAllEdited(privilegeData.title) ? <ModeEditOutlineOutlined /> : ""}>
              <div className={styles.containerParentRowData}>
                <p>{loadingRoles || loadingProfileRoles ? "" : privilegeData.title}</p>
              </div>
            </LoadingButton>
          </div>
          <div className={styles.containerWrapper}>
            {privilegeData.privileges.map((privilege, index) => (
              <div
                key={index}
                className={`${styles.containerWrapperFeature} ${
                  roleNameIds?.includes(`${privilege.value}_RO`) ? styles.containerWrapperFeatureSelected : ""
                } ${roleNameIds?.includes(`${privilege.value}_RW`) ? styles.containerWrapperFeatureSelectedEdit : ""}`}>
                <p>{privilege.title}</p>
                <div className={styles.containerWrapperFeatureButtons}>
                  <Switch
                    aria-label="set-read-only"
                    loading={loadingRoles || loadingProfileRoles}
                    disabled={!selectedProfile}
                    onChange={() => togglePrivilege(privilege.value, false)}
                    checked={roleNameIds?.includes(`${privilege.value}_RO`) || roleNameIds?.includes(`${privilege.value}_RW`)}
                  />
                  <IconButton
                    aria-label="set-read-write"
                    disabled={!roleNameIds?.includes(`${privilege.value}_RO`) && !roleNameIds?.includes(`${privilege.value}_RW`)}
                    onClick={() => togglePrivilege(privilege.value, true)}
                    color={roleNameIds?.includes(`${privilege.value}_RW`) ? "redAccent" : "greyColor"}
                    sx={{
                      "&:disabled": {
                        color: Colors.grey3,
                        opacity: 0.2,
                      },
                    }}>
                    {roleNameIds?.includes(`${privilege.value}_RW`) ? <Edit fontSize="medium" /> : <EditOff fontSize="medium" />}
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
