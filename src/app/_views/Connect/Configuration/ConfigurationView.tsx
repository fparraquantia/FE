"use client";

import { Colors } from "@/_styles/variables/colors";
import CustomModal from "@/app/_components/CustomModal/CustomModal";
import { CustomTable, RowDataCustomTable } from "@/app/_components/CustomTable/CustomTable";
import { normalizeText } from "@/app/_helpers/pipes";
import { Add, Delete, ModeEditOutlineOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Input } from "antd";
import React, { useCallback, useMemo, useState } from "react";

import styles from "./ConfigurationView.module.scss";
import { CardUser } from "./components/CardUser/CardUser";
import { ModalAddUser } from "./components/ModalAddUser/ModalAddUser";
import { ModalEditUser } from "./components/ModalEditUser/ModalEditUser";

const { Search } = Input;

// Mocked user data
const mockedUsers = [
  {
    id: "1",
    firstName: "Alvaro",
    lastName: "Diaz",
    email: "alvaro.diaz@grupocobra.com",
    phone: "123-456-7890",
    group: { name: "Admin" }
  },
  {
    id: "2",
    firstName: "Fernando",
    lastName: "Parra",
    email: "fernando.parra@grupocobra.com",
    phone: "098-765-4321",
    group: { name: "User" }
  }
  // Add more users as needed
];

export default function ConfigurationView() {
  const [users, setUsers] = useState(mockedUsers); // Use mocked data
  const [checkedId, setCheckedId] = useState<string>("none");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false); // Mocking delete state

  const currentUser = useMemo(() => users?.find((el) => el.id === checkedId), [checkedId, users]);

  const filteredUsers = useMemo(() => {
    return users?.filter((user) => {
      const searchFirstnameCoincidence = normalizeText(user.firstName || "").includes(normalizeText(searchUser));
      const searchLastnameCoincidence = normalizeText(user.lastName ?? "").includes(normalizeText(searchUser));
      const searchEmailCoincidence = normalizeText(user.email ?? "").includes(normalizeText(searchUser));
      const searchGroupCoincidence = normalizeText(user.group.name ?? "").includes(normalizeText(searchUser));

      return (
        searchFirstnameCoincidence ||
        searchLastnameCoincidence ||
        searchEmailCoincidence ||
        searchGroupCoincidence
      );
    });
  }, [users, searchUser]);

  const columns = [
    {
      field: "firstName",
      headerLabel: "First Name",
      sortable: true,
      minWidth: "50px"
    },
    {
      field: "lastName",
      headerLabel: "Last Name",
      sortable: true,
      minWidth: "50px"
    },
    {
      field: "email",
      headerLabel: "Email",
      sortable: true,
      minWidth: "50px"
    },
    {
      field: "phone",
      headerLabel: "Phone",
      sortable: true,
      minWidth: "50px"
    },
    { field: "group", headerLabel: "Profile", sortable: true, minWidth: "50px" }
  ];

  const data: RowDataCustomTable[] = useMemo(
    () =>
      (filteredUsers || [])?.map(
        (user) =>
          ({
            id: user.id,
            data: Object.entries(user).reduce(
              (acc, [key, value]) => {
                if (value !== undefined && (typeof value === "string" || typeof value === "number")) {
                  acc[key] = { label: value };
                }
                if (value !== undefined && typeof value === "object") {
                  acc[key] = { label: value?.name ?? "" };
                }
                return acc;
              },
              {} as RowDataCustomTable["data"]
            )
          }) as RowDataCustomTable
      ),
    [filteredUsers]
  );

  const handleDelete = useCallback(() => {
    if (!!checkedId && checkedId !== "none") {
      setDeletingUser(true);
      setTimeout(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== checkedId));
        setCheckedId("none");
        setShowDeleteModal(false);
        setDeletingUser(false);
      }, 1000); // Simulate delete delay
    }
  }, [checkedId]);

  return (
    <div className={styles.container}>
      <ModalAddUser show={showAdd} setShow={setShowAdd} />
      <ModalEditUser show={showEdit} setShow={setShowEdit} userId={checkedId} />

      <CustomModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        title={"Delete profile"}
        type="delete"
        onClickButton={handleDelete}
        isLoadingButton={deletingUser}
      >
        <p className={styles.containerDelete}>
          Are you sure you want to delete this user
          <span> {`${currentUser?.firstName ?? ""} ${currentUser?.lastName ?? ""}`}</span>?
        </p>
      </CustomModal>
      <div className={styles.containerTable}>
        <div className={styles.containerFilter}>
          <Search
            placeholder="Search..."
            aria-placeholder="Search..."
            allowClear
            onSearch={(e) => setSearchUser(e)}
            onChange={(e) => setSearchUser(e.target.value)}
            variant="filled"
            style={{
              width: 350
            }}
          />
          <div className={styles.containerFilterButtons}>
            <IconButton aria-label="add" color="greyColor" onClick={() => setShowAdd(true)}>
              <Add />
            </IconButton>
            <IconButton
              onClick={() => setShowEdit(true)}
              aria-label="edit"
              disabled={checkedId === "none"}
              color="greyColor"
              sx={{
                "&:disabled": {
                  opacity: 0.2,
                  color: Colors.grey5
                }
              }}
            >
              <ModeEditOutlineOutlined />
            </IconButton>
            <IconButton
              onClick={() => setShowDeleteModal(true)}
              aria-label="delete"
              disabled={checkedId === "none"}
              color="greyColor"
              sx={{
                "&:disabled": {
                  opacity: 0.2,
                  color: Colors.grey5
                }
              }}
            >
              <Delete />
            </IconButton>
          </div>
        </div>
        <CustomTable
          columns={columns}
          data={data}
          isLoading={false} // No loading state needed for mock data
          defaultSort={{ index: -1, asc: false }}
          checkedId={checkedId}
          setCheckedId={setCheckedId}
        />
      </div>
      <CardUser idUser={checkedId} />
    </div>
  );
}
