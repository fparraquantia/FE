import { Box, Divider, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";
import { userData } from "../data/mockData";
import InputBase from "@mui/material/InputBase";
import { SearchOutlined } from "@mui/icons-material";
import Button from "../../components/shared/Buttons/Button.component";

export default function Configuration(props) {
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "profileName",
      headerName: "Profile",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "firstName",
      headerName: "First Name",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "lastName",
      headerName: "Last Name",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },
    {
      field: "listEmail",
      headerName: "Alert List",
      flex: 1,
    },
    {
      field: "readOnly",
      headerName: "User Rights",
      flex: 1,
      renderCell: ({ row: { readOnly } }) => {
        return readOnly ? "Read Only" : "Edit";
      },
    },
  ];

  return (
    <Box m="50px">
      <Box
        sx={{
          borderRadius: "4px",
          display: "flex",
          gap: 3,
          height: "80vh",
        }}
      >
        <Card sx={{ height: "100%", width: "75%" }}>
          <CardHeader
            titleTypographyProps={{ fontSize: 20, fontWeight: 900 }}
            title="User Management"
          />
          <Divider variant="middle" />
          <CardContent>
            <Box
              sx={{
                height: "72vh",
              }}
            >
              <DataGrid checkboxSelection rows={userData} columns={columns} />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ height: "100%", width: "25%" }}>
          <CardHeader
            titleTypographyProps={{ fontSize: 20, fontWeight: 900 }}
            title="Site Authorized"
          />
          <Divider variant="middle" />
          <CardContent>
        
            <Box
              sx={{
                height: "72vh",
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                p={2}
                style={{ height: "70px", marginLeft: "35%", color: "#B3B3B3" }}
              >
                <Grid item>
                  <img
                    className="profile-user"
                    src="/images/Kurita Connect 360 - Avatar-Girl.png"
                    alt="kurita-profile-user"
                    style={{ height: "200%", width: "auto" }}
                    
                  />
                </Grid>
              </Grid>
              <Grid
                display="flex"
                marginBottom={2}
                marginTop={10}
                borderRadius={5}
                backgroundColor="#F7FAFD"
              >
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search..." />
                <Button type="button" color="#B3B3B3" sx={{ p: 2 }}>
                  <SearchOutlined />
                </Button>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
