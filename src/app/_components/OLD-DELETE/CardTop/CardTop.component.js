import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Kuritaamerica from "./Kurita_america.png";
import site2 from "./site2.png";
import site3 from "./site3.png";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

export const CardTop = ({ selectedSite, selectedTitle }) => {
  const [maxSites, setMaxSites] = useState(2); // Máximo de sitios permitidos
  const [showSites, setShowSites] = useState([selectedSite]);

  useEffect(() => {
    // Verificar si ya hay dos sitios seleccionados cuando selectedTitle es "Multi-Site OV"
    if (selectedTitle === "Multi-Site OV") {
      setMaxSites(2);
    } else {
      setMaxSites(1);
    }
  }, [selectedTitle]);

  const handleDeleteSite = (id) => {
    // Filtrar la lista para eliminar el sitio con el ID correspondiente
    const updatedSites = showSites.filter((site) => site.id !== id);
    setShowSites(updatedSites);
  };

  useEffect(() => {
    // Agregar el sitio seleccionado a showSites cuando cambia selectedSite
    setShowSites((prevShowSites) => {
      // Si showSites ya tiene dos elementos, quita el primero antes de agregar uno nuevo.
      if (prevShowSites.length >= maxSites) {
        prevShowSites.shift();
      }
      // Verificar si el sitio ya está en showSites antes de agregarlo
      if (prevShowSites.find((site) => site.id === selectedSite.id)) {
        return prevShowSites;
      }
      // Agrega el nuevo sitio a showSites
      return [...prevShowSites, selectedSite];
    });
  }, [selectedSite, maxSites]);

  if (!selectedSite) {
    return null; // No renderizar nada si no hay selectedSite
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {showSites.map((site) => (
        <Box
          key={site.id}
          sx={{
            width: showSites.length > 1 ? "49%" : "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            boxShadow: "2px 2px 10px 5px #00000033",
            borderRadius: "8px",
            display: "flex",
          }}
        >
          <Box sx={{ width: "70%", display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                height: "25%",
                padding: "0.5rem",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: showSites.length > 1 ? "80%" : "50%",
                  flexDirection: selectedSite.length > 1 ? "column" : "row",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ fontSize: "2rem" }}>{site.name}</Box>
                <Box sx={{ color: "#ccc" }}> Modules & Sensors</Box>
              </Box>
              <Box sx={{ color: "#ccc" }}>
                <MdOutlineModeEdit size={26} />
                <FiTrash2 size={26} onClick={() => handleDeleteSite(site.id)} />
                <CiMenuKebab size={26} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                height: "60%",
                padding: "0.5rem",
              }}
            >
              {showSites.length === 1 ? (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Address</p>
                      <p style={{ color: "#ccc" }}>{site.address}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Code Postal</p>
                      <p style={{ color: "#ccc" }}>{site.postal_code}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>City</p>
                      <p style={{ color: "#ccc" }}>{site.city}</p>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Country</p>
                      <p style={{ color: "#ccc" }}>{site.country}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Latitude</p>
                      <p style={{ color: "#ccc" }}>
                        {site?.coordinates?.latitud}
                      </p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Longitude</p>
                      <p style={{ color: "#ccc" }}>
                        {site?.coordinates?.longitud}
                      </p>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Kurita Contact Person</p>
                      <p style={{ color: "#ccc" }}>{site.contact_name}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Kurita Customer</p>
                      <p style={{ color: "#ccc" }}>{site.customer_name}</p>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "60%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Address</p>
                      <p style={{ color: "#ccc" }}>{site.address}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Code Postal</p>
                      <p style={{ color: "#ccc" }}>{site.postal_code}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>City</p>
                      <p style={{ color: "#ccc" }}>{site.city}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Kurita Contact Person</p>
                      <p style={{ color: "#ccc" }}>{site.contact_name}</p>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "40%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Country</p>
                      <p style={{ color: "#ccc" }}>{site.country}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Latitude</p>
                      <p style={{ color: "#ccc" }}>
                        {site.coordinates.latitude}
                      </p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "2.5vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p>Longitude</p>
                      <p style={{ color: "#ccc" }}>
                        {site.coordinates.longitude}
                      </p>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: "25%",
              padding: "0.2rem ",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {site.id === 1 && (
              <img src={Kuritaamerica} alt="Kurita_america" width={"100%"} />
            )}
            {site.id === 2 && (
              <img src={site2} alt="Kurita_america" width={"100%"} />
            )}
            {site.id >= 3 && (
              <img src={site3} alt="Kurita_america" width={"100%"} />
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
