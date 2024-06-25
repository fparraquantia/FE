"use client";

import { Colors } from "@/_styles/variables/colors";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
// import { useChangeGroupRoles } from "@/app/_pages/AccessProfile/network/changeProfileRoles";
// import { useDeleteProfile } from "@/app/_pages/AccessProfile/network/deleteProfile";
// import { useGetGroups } from "@/app/_pages/AccessProfile/network/getProfiles";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, IconButton } from "@mui/material";
import React, { useCallback, useMemo, useState } from "react";

import styles from "./AccessProfiles.module.scss";
import { ModalAddProfile } from "./components/ModalAddProfile/ModalAddProfile";
import PrivilegeButton from "./components/PrivilegeButton/PrivilegeButton";

// Mocked profiles data
const mockedProfiles = [
  { id: "1", name: "Admin" },
  { id: "2", name: "User" },
  { id: "3", name: "Guest" }
  // Add more profiles as needed
];

export default function AccessProfiles() {
  const [profilesData, setProfilesData] = useState(mockedProfiles); // Use mocked data
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [save, setSave] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleIds, setRoleIds] = useState<string[]>([]);
  // const { mutate: changeGroupRoles, isPending: changingRoles } = useChangeGroupRoles({ groupId: selectedProfile });
  // const { mutate: deleteProfile, isPending: deletingProfile } = useDeleteProfile();
  const [changingRoles, setChangingRoles] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState(false);

  const currentProfile = useMemo(() => profilesData?.find((el) => el.id == selectedProfile), [selectedProfile, profilesData]);

  const handleDelete = useCallback(() => {
    if (selectedProfile) {
      setDeletingProfile(true);
      // Simulate API call delay
      setTimeout(() => {
        setProfilesData((prev) => prev.filter(profile => profile.id !== selectedProfile));
        setSelectedProfile("");
        setShowDeleteModal(false);
        setDeletingProfile(false);
      }, 1000);
    }
  }, [selectedProfile]);

  const handleProfileSelection = useCallback((id: string) => {
    setSelectedProfile((prev) => (prev === id ? "" : id));
  }, []);

  const onSave = useCallback(() => {
    setChangingRoles(true);
    // Simulate API call delay
    setTimeout(() => {
      console.log("Roles changed to:", roleIds);
      setChangingRoles(false);
    }, 1000);
  }, [roleIds]);

  return (
    <div className={styles.container}>
      <ModalAddProfile
        show={showAdd}
        setShow={setShowAdd}
      />
      <ModalAddProfile
        show={showEdit}
        setShow={setShowEdit}
        idProfile={selectedProfile}
      />
      <CustomModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        title={"Delete profile"}
        type="delete"
        onClickButton={handleDelete}
        isLoadingButton={deletingProfile}>
        <p className={styles.containerDelete}>
          Are you sure you want to delete this profile
          <span> {currentProfile?.name ?? ""}</span>?
        </p>
      </CustomModal>
      <div className={styles.containerCard}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <div className={styles.headerWrapperTitle}>
              <div className={styles.dot} />
              <p>Profiles</p>
            </div>
            <IconButton
              aria-label="add-profile"
              onClick={() => setShowAdd(true)}>
              <Add />
            </IconButton>
          </div>
        </div>
        <div className={styles.content}>
          {profilesData?.map((profile, index) => (
            <Button
              key={index}
              onClick={() => handleProfileSelection(profile.id)}
              variant="contained"
              color={selectedProfile === profile.id ? "primary" : "greyLightColor"}
              className={styles.contentRow}>
              <div className={styles.contentRowData}>
                <p>{profile.name}</p>
              </div>
            </Button>
          ))}
          {!profilesData || profilesData.length == 0 ? (
            <div className={styles.contentAdd}>
              <IconButton
                size="medium"
                aria-label="add-profile"
                onClick={() => setShowAdd(true)}>
                <Add
                  fontSize="large"
                  sx={{ width: 80, height: 80, color: Colors.grey3 }}
                />
              </IconButton>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={styles.containerCard2}>
        <div className={styles.header}>
          <div className={styles.headerWrapper}>
            <div className={styles.headerWrapperTitle}>
              <div className={styles.dot} />
              <p>Associated features</p>
            </div>
            {selectedProfile ? (
              <div className={styles.headerWrapperButtons}>
                <Button
                  aria-label="delete-profile"
                  variant="text"
                  size="medium"
                  color="error"
                  onClick={() => setShowDeleteModal(true)}>
                  <Delete fontSize="small" />
                </Button>
                <Button
                  aria-label="edit-profile"
                  startIcon={<Edit />}
                  variant="contained"
                  size="small"
                  color="greyLightColor"
                  onClick={() => setShowEdit(true)}
                  sx={{ width: 80, justifyContent: "space-between" }}>
                  Edit
                </Button>
                <LoadingButton
                  loading={changingRoles}
                  variant="contained"
                  aria-label="save-profile"
                  startIcon={<Save />}
                  size="small"
                  color="greenAccent"
                  disabled={!save}
                  sx={{ width: 80, justifyContent: "space-between" }}
                  onClick={onSave}>
                  {!changingRoles ? "Save" : ""}
                </LoadingButton>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.content}>
          <PrivilegeButton
            selectedProfile={selectedProfile}
            setSave={setSave}
            setRoleIds={setRoleIds}
          />
        </div>
      </div>
    </div>
  );
}
