"use client";

import { TreeSites } from "@/app/_components/TreeSites/TreeSites";
// import { useChangeUserSites } from "@/app/_features/treeSites/network/changeUserSites";
// import { useGetUserSites } from "@/app/_features/treeSites/network/getUserSites";
// import { useGetUsers } from "@/app/_pages/UserSettings/network/getUsers";
import srcAvatar from "@/assets/images/avatar-hombre.png";
import { ModeEditOutlineOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";
import Search from "antd/es/input/Search";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

import styles from "./CardUser.module.scss";

interface CardUserProps {
  idUser: string;
}

// Mocked user data
const mockedUsers = [
  {
    id: "1",
    firstName: "Alvaro",
    lastName: "Diaz",
    phone: "123-456-7890",
    group: { name: "Admin" }
  },
  {
    id: "2",
    firstName: "Fernando",
    lastName: "Parra",
    phone: "098-765-4321",
    group: { name: "User" }
  }
  // Add more users as needed
];

// Mocked user sites
const mockedUserSites = ["siteid-1", "siteid-2"]; // Example site IDs

export function CardUser({ idUser }: CardUserProps) {
  const [users, setUsers] = useState(mockedUsers); // Use mocked data
  const [userSites, setUserSites] = useState(mockedUserSites); // Use mocked site data
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [idsTreeSites, setIdsTreeSites] = useState<`siteid-${number}`[]>([]);
  const [searchSite, setSearchSite] = useState("");
  const currentUser = useMemo(() => users?.find((el) => el.id == idUser), [idUser, users]);

  useEffect(() => {
    // const userSitesIds: `siteid-${number}`[] = userSites?.map((siteId) => `siteid-${siteId}` as const) || [];
    // setIdsTreeSites(userSitesIds);
  }, [userSites, isEditingMode]);

  useEffect(() => {
    setIsEditingMode(false);
  }, [idUser]);

  const onChangeUserSites = useCallback(() => {
    if (!!idUser && idUser != "none") {
      const siteIds: number[] = idsTreeSites.map((siteId) => Number(siteId.replace("siteid-", "")));
      console.log(siteIds);
      // Mock changeUserSites function
      setTimeout(() => {
        setUserSites(idsTreeSites);
        setIsEditingMode(false);
      }, 1000); // Simulate API call delay
    }
  }, [idsTreeSites, idUser]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerWrapperTitle}>
            <div className={styles.dot} />
            <p>{idUser != "none" ? "Site Perimeter" : "Site Authorized"}</p>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentAvatar}>
          <Image
            style={{ borderRadius: 150 }}
            src={srcAvatar}
            alt="avatar-user"
            height={144}
            width={144}
          />
          <p>{idUser != "none" ? `${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}` : "Alvaro Díaz"}</p>
        </div>

        {!!idUser && idUser != "none" && (
          <>
            <Search
              placeholder="Search..."
              aria-placeholder="Search..."
              allowClear
              value={searchSite}
              onSearch={(e) => setSearchSite(e)}
              onChange={(e) => setSearchSite(e.target.value)}
              style={{
                width: "100%",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            />
            <div className={styles.containerButtons}>
              <div className={styles.containerButtonsLeft}>
                <p>Site Access</p>
                <span>{idsTreeSites.length} sites</span>
              </div>
              <div className={styles.containerButtonsRight}>
                {isEditingMode ? (
                  <>
                    <Button
                      variant="contained"
                      color="greyLightColor"
                      size="small"
                      sx={{ width: 60, padding: 0, minWidth: 0, height: 30, textTransform: "none" }}
                      onClick={() => setIsEditingMode(false)}>
                      Cancel
                    </Button>
                    <LoadingButton
                      variant="contained"
                      size="small"
                      loading={false} // No loading state needed for mock data
                      sx={{ width: 60, padding: 0, minWidth: 0, height: 30, textTransform: "none" }}
                      onClick={onChangeUserSites}>
                      Edit
                    </LoadingButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="close"
                    onClick={() => setIsEditingMode(true)}>
                    <ModeEditOutlineOutlined />
                  </IconButton>
                )}
              </div>
            </div>
          </>
        )}
        <div className={styles.containerElement}>
          <div className={styles.containerElementContent}>
            <TreeSites
              type="multi"
              enablePush={false}
              controlledKeys={idsTreeSites}
              setControlledKeys={setIdsTreeSites}
              disabled={!isEditingMode}
              siteName={searchSite}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
