import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Kuritaamerica from "./Tedagua.jpg";
import site2 from "./Provisur.jpg";
import site3 from "./site3.png";
import { FiTrash2 } from "react-icons/fi";
import { MdOutlineModeEdit } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { MdInfoOutline } from "react-icons/md";

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
            marginRight: "2%",
            boxShadow: "0px 4px 32px 0px #0000001a",
            borderRadius: "8px",
            display: "flex",
          }}
        >
          <Box sx={{ width: "90%", display: "flex", flexDirection: "column" }}>
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
                  display: "flex",
                  marginLeft: "2%",
                  marginTop: "1%",

                  flexDirection: selectedSite.length > 1 ? "column" : "row",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    fontSize: "1.8rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MdInfoOutline
                    color="#0069C8"
                    marginTop="3%"
                    marginLeft="10%"
                    size={26}
                  />
                  <Box  sx={{
                  }}> {site.name} </Box>
                </Box>
              </Box>
              <Box sx={{ color: "#ccc", marginTop: "2%", marginLeft: "5%" }}>
                <MdOutlineModeEdit size={22} />
                <FiTrash2 size={22} onClick={() => handleDeleteSite(site.id)} />
                <CiMenuKebab size={22} />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
                height: "80%",
                padding: "0.5rem",
                marginLeft: "2%",
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
                      <p style={{ color: "#808080" }}>Name </p>
                      <p style={{ color: "#B3B3B3" }}>{site.name}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p style={{ color: "#808080" }}>Address</p>
                      <p style={{ color: "#B3B3B3" }}>{site.address}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p style={{ color: "#808080" }}>Region</p>
                      <p style={{ color: "#B3B3B3" }}>{site.region}</p>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                      marginLeft: "6%",
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
                      <p style={{ color: "#808080" }}>Subregion </p>
                      <p style={{ color: "#B3B3B3" }}>{site.subRegion}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p style={{ color: "#808080" }}>Code Postal</p>
                      <p style={{ color: "#B3B3B3" }}>{site.postalCode}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p style={{ color: "#808080" }}>City</p>
                      <p style={{ color: "#B3B3B3" }}>{site.city}</p>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "35%",
                      marginLeft: "6%",
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
                      <p style={{ color: "#808080" }}>Tipology </p>
                      <p style={{ color: "#B3B3B3" }}>{site.tipology}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p style={{ color: "#808080" }}>Contact Name</p>
                      <p style={{ color: "#B3B3B3" }}>{site.contactName}</p>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "4vh",
                        marginRight: "0.5rem",
                      }}
                    >
                      <p style={{ color: "#808080" }}>Customer Name</p>
                      <p style={{ color: "#B3B3B3" }}>{site.customerName}</p>
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
                      <p style={{ color: "#808080" }}>Address</p>
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
                      <p style={{ color: "#808080" }}>Code Postal</p>
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
                      <p style={{ color: "#808080" }}>City</p>
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
                      <p style={{ color: "#808080" }}>Kurita Contact Person</p>
                      <p style={{ color: "#ccc" }}>{site.contact_name}</p>
                    </Box>
                  </Box>
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
                        marginLeft: "6%",
                      }}
                    >
                      <p style={{ color: "#808080" }}>Country</p>
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
                      <p style={{ color: "#808080" }}>Latitude</p>
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
                      <p style={{ color: "#808080" }}>Longitude</p>
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
              width: "30% ",
              marginLeft: "5%",
              padding: "1%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
            }}
          >
            {site.id === 1 && (
              <img
                src={Kuritaamerica}
                alt="Kurita_america"
                width={"100%"}
                style={{
                  borderRadius: "10px",
                  border: "2px solid #ffffff",
                }}
              />
            )}
            {site.id === 2 && (
              <img
                src={site2}
                alt="Kurita_america"
                width={"100%"}
                style={{
                  borderRadius: "10px",
                  border: "2px solid #ffffff",
                }}
              />
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
