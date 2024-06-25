import { ArrowDownward } from "@mui/icons-material";
import { Checkbox, CircularProgress, MenuItem, Pagination, Radio, Select, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction, useMemo, useState } from "react";

import styles from "./CustomTable.module.scss";

type ColumnConfig = {
  minWidth?: string;
  flex?: number;
  field: string;
  headerLabel: string;
  sortable?: boolean;
  sortDirection?: "asc" | "desc" | "none";
};

export type RowDataCustomTable = {
  id: number | string;
  data: {
    [key: string]: {
      label: string | number;
      CustomLabel?: (value: string | number) => React.ReactNode;
    };
  };
};

interface CustomTableProps {
  columns: ColumnConfig[];
  data: RowDataCustomTable[];
  isLoading: boolean;
  defaultSort?: { index: number; asc: boolean };
  checkedsIds?: (number | string)[];
  setCheckedsIds?: Dispatch<SetStateAction<(number | string)[]>>;
  checkedId?: string;
  setCheckedId?: Dispatch<SetStateAction<string>>;
}

export const CustomTable = ({
  columns,
  data,
  isLoading,
  defaultSort = { index: 0, asc: true },
  checkedsIds,
  setCheckedsIds,
  checkedId,
  setCheckedId,
}: CustomTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortIndex, setSortIndex] = useState<{ index: number; asc: boolean }>(defaultSort);

  const totalCount = useMemo(() => data.length || 0, [data]);
  const pageCount = Math.ceil(totalCount / rowsPerPage);

  const handleChangeCurrentPage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const sortedData = useMemo(() => {
    const sortableColumn = columns[sortIndex.index];
    if (!sortableColumn?.sortable) {
      return data;
    }

    return [...data].sort((a, b) => {
      const aValue = a.data[sortableColumn.field]?.label || "";
      const bValue = b.data[sortableColumn.field]?.label || "";

      if (aValue < bValue) {
        return sortIndex.asc ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortIndex.asc ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortIndex, columns]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    return sortedData?.slice(startIndex, endIndex);
  }, [sortedData, currentPage, rowsPerPage]);

  const handleCheck = (id: string) => {
    if (checkedsIds && setCheckedsIds) {
      setCheckedsIds((prev) => (prev.find((el) => el == id) ? prev.filter((el) => el != id) : [...prev, id]));
    }
    if (checkedId && setCheckedId) {
      setCheckedId((prev) => (prev == id ? "none" : id));
    }
  };
  return (
    <>
      <div className={styles.containerTable}>
        <div className={styles.containerTableHeader}>
          {checkedsIds && (
            <Checkbox
              checked={checkedsIds.length == data.length && checkedsIds.length > 0}
              indeterminate={checkedsIds.length !== data.length && checkedsIds.length > 0}
              onChange={() => setCheckedsIds && setCheckedsIds((prev) => (prev.length == data.length ? [] : data.map((el) => el.id)))}
            />
          )}
          {checkedId && (
            <Radio
              checked={checkedId == "none"}
              // onChange={handleChangeRadioButton}
              value={"none"}
              name="checked-id"
              inputProps={{ "aria-label": "checked-id" }}
              disabled
            />
          )}
          {columns.map((column, index) => (
            <div
              key={index}
              onClick={() =>
                column.sortable &&
                setSortIndex({
                  index: sortIndex.index === index && !sortIndex.asc ? -1 : index,
                  asc: sortIndex.index === index ? !sortIndex.asc : true,
                })
              }
              className={`${styles.containerTableHeaderColumn} ${sortIndex.index == index ? styles.containerTableHeaderColumnSort : ""}`}
              style={{
                minWidth: column.minWidth || "80px",
                // maxWidth: column.minWidth || "80px",
                width: column.minWidth || "80px",
                flex: column.flex || 1,
              }}>
              <p className={styles.title}>{column.headerLabel}</p>
              {column.sortable && (
                <div className={`${styles.icon} ${!sortIndex.asc && sortIndex.index === index ? styles.desc : ""}`}>
                  <ArrowDownward sx={{ fontSize: 20 }} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.containerTableBody}>
          {isLoading ? (
            <div className={styles.containerTableBodyEmptyTable}>
              <div>
                <CircularProgress />
              </div>
            </div>
          ) : paginatedData.length > 0 ? (
            paginatedData.map(({ id, data }) => (
              <div
                key={id}
                className={`${styles.containerTableBodyRow} ${
                  !!checkedsIds?.find((el) => el == id) || checkedId == id ? styles.containerTableBodyRowSelected : ""
                } ${!!checkedsIds || checkedId ? styles.containerTableBodyRowSelectable : ""}`}
                onClick={() => handleCheck(String(id))}>
                {checkedsIds && <Checkbox checked={!!checkedsIds.find((el) => el == id)} />}
                {checkedId && (
                  <Radio
                    checked={checkedId == id}
                    // onChange={handleChangeRadioButton}
                    value={id}
                    name="checked-id"
                    inputProps={{ "aria-label": "checked-id" }}
                  />
                )}
                {columns.map((column, colIndex) => {
                  const CustomLabel = data[column.field]?.CustomLabel;
                  const label = data[column.field]?.label || "";

                  return (
                    <div
                      key={colIndex}
                      className={styles.containerTableBodyRowColumn}
                      style={{
                        minWidth: column.minWidth || "80px",
                        // maxWidth: column.minWidth || "80px",
                        width: column.minWidth || "80px",
                        flex: column.flex || 1,
                      }}>
                      {CustomLabel ? CustomLabel(label) : <p>{label}</p>}
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className={styles.containerTableBodyEmptyTable}>
              <p>No data...</p>
            </div>
          )}
          <div className={styles.containerTableBodyPagination}>
            <div className={styles.containerTableBodyPaginationRows}>
              <p className={styles.containerTableBodyPaginationRowsText}>Display:</p>
              <div>
                <Select
                  sx={{ width: 65, height: 22, borderRadius: 20, fontSize: 14 }}
                  value={String(rowsPerPage)}
                  onChange={handleChangeRowsPerPage}>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={15}>15</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </div>
            </div>
            <div className={styles.containerTableBodyPaginationItem}>
              <Pagination
                count={pageCount}
                page={currentPage}
                size="small"
                color="primary"
                showFirstButton
                showLastButton
                onChange={handleChangeCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
