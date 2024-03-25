import React, { useState } from "react";
import { IoArrowDown, IoArrowForward } from "react-icons/io5";
import { countryDataArray } from "../../../views/data/mockData";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { Box } from "@mui/material";

const SelectionTree = ({ onSiteSelection, selectedTitle }) => {
  // Estado para realizar un seguimiento de la expansión en todos los niveles
  const [expandedLevels, setExpandedLevels] = useState([]);

  // Estado para realizar un seguimiento de la selección de los sitios
  const [selectedSites, setSelectedSites] = useState({});

  // Función para manejar la expansión/cierre de elementos en cualquier nivel
  const handleExpand = (key) => {
    if (expandedLevels.includes(key)) {
      // Si la clave ya está en el estado expandido, la eliminamos para cerrarla
      setExpandedLevels((prevState) =>
        prevState.filter((item) => item !== key)
      );
    } else {
      // Si la clave no está en el estado expandido, la agregamos para expandirla
      setExpandedLevels((prevState) => [...prevState, key]);
    }
  };

  // Función para manejar la selección/deselección de un sitio específico
  const handleSiteToggle = (site) => {
    setSelectedSites((prevState) => {
      // Clona el estado previo
      const updatedSites = { ...prevState };

      // Verifica si el sitio ya estaba seleccionado
      if (updatedSites[site.id]) {
        // Si estaba seleccionado, lo eliminamos
        delete updatedSites[site.id];
      } else {
        // Si no estaba seleccionado, lo marcamos como seleccionado
        updatedSites[site.id] = true;
      }

      return updatedSites;
    });
  };

  // Función para verificar si un sitio está seleccionado
  const isSiteSelected = (site) => {
    return selectedSites[site.id] || false;
  };

  const handleSiteSelection = (site) => {
    if (selectedTitle === "SiteOverView") {
      // Si selectedTitle es 'SiteOverView', permitir solo una selección
      setSelectedSites({ [site.id]: true });
    } else if (selectedTitle === "Multi-Site OV") {
      // Si selectedTitle es 'Multi-Site OV', permitir hasta dos selecciones
      if (isSiteSelected(site)) {
        // Si el sitio ya estaba seleccionado, deseleccionarlo
        handleSiteToggle(site);
      } else if (Object.keys(selectedSites).length < 2) {
        // Si hay menos de dos sitios seleccionados, permitir la selección
        handleSiteToggle(site);
      }
    }

    // Llama a la función de devolución de llamada para notificar la selección
    onSiteSelection(site);
  };

  return (
    <Box
      sx={{
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignContent: "center",
        marginTop: "2rem",
        fontSize: "1.2rem",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          paddingLeft: "1rem",
          marginBottom: "1rem",
          color: "#b3b3b3",
          fontSize: "1.2rem",
        }}
      >
        <GoPerson />
        My Sites
      </Box>
      {countryDataArray.map((item, index) => (
        <div key={index}>
          {/* Elemento de región con checkbox */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="checkbox"
              style={{ width: "1.2rem", height: "1.2rem" }}
              checked={isSiteSelected(item)} // Verifica si el sitio está seleccionado
              onChange={() => handleSiteSelection(item)} // Maneja la selección/deselección del sitio
            />
            <div
              style={{
                cursor: "pointer",
                paddingLeft: "1rem",
                textTransform: "capitalize",
                color: "#b3b3b3",
              }}
              onClick={() => handleExpand(`region-${index}`)}
            >
              {item.region.toLowerCase()}
            </div>
            <div
              style={{ cursor: "pointer", color: "#b3b3b3" }}
              onClick={() => handleExpand(`region-${index}`)}
            >
              {expandedLevels.includes(`region-${index}`) ? (
                <AiFillCaretRight size={16} />
              ) : (
                <AiFillCaretDown size={16} />
              )}
            </div>
          </div>
          {expandedLevels.includes(`region-${index}`) && (
            <div>
              {/* Elemento de subregión con checkbox */}
              {item.sub_region && (
                <div>
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ width: "1.2rem", height: "1.2rem" }}
                      checked={isSiteSelected(item)} // Verifica si el sitio está seleccionado
                      onChange={() => handleSiteSelection(item)} // Maneja la selección/deselección del sitio
                    />
                    <div
                      style={{ cursor: "pointer", color: "#b3b3b3" }}
                      onClick={() => handleExpand(`subRegion-${index}`)}
                    >
                      {expandedLevels.includes(`subRegion-${index}`) ? (
                        <AiFillCaretRight size={16} />
                      ) : (
                        <AiFillCaretDown size={16} />
                      )}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        paddingLeft: "1rem",
                        textTransform: "capitalize",
                        color: "#b3b3b3",
                      }}
                      onClick={() => handleExpand(`subRegion-${index}`)}
                    >
                      {item.sub_region}
                    </div>
                  </div>
                  {expandedLevels.includes(`subRegion-${index}`) && (
                    <div>
                      {/* Elemento de país con checkbox */}
                      <div>
                        <div
                          style={{
                            marginLeft: "40px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <input
                            type="checkbox"
                            style={{ width: "1.2rem", height: "1.2rem" }}
                            checked={isSiteSelected(item)} // Verifica si el sitio está seleccionado
                            onChange={() => handleSiteSelection(item)} // Maneja la selección/deselección del sitio
                          />
                          <div
                            style={{ cursor: "pointer", color: "#b3b3b3" }}
                            onClick={() => handleExpand(`country-${index}`)}
                          >
                            {expandedLevels.includes(`country-${index}`) ? (
                              <AiFillCaretRight size={16} />
                            ) : (
                              <AiFillCaretDown size={16} />
                            )}
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                              paddingLeft: "1rem",
                              textTransform: "capitalize",
                              color: "#b3b3b3",
                            }}
                            onClick={() => handleExpand(`country-${index}`)}
                          >
                            {item.country}
                          </div>
                        </div>
                        {expandedLevels.includes(`country-${index}`) && (
                          <div>
                            {/* Elemento de sitio */}
                            <div style={{ marginLeft: "60px" }}>
                              <input
                                type="checkbox"
                                style={{ width: "1.2rem", height: "1.2rem" }}
                                checked={isSiteSelected(item)} // Verifica si el sitio está seleccionado
                                onChange={() => handleSiteSelection(item)} // Maneja la selección/deselección del sitio
                              />
                              <label style={{ cursor: "pointer" }}>
                                {item.name}
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* Elemento de país (cuando no hay subregión) con checkbox */}
              {!item.sub_region && (
                <div>
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{ width: "1.2rem", height: "1.2rem" }}
                      checked={isSiteSelected(item)} // Verifica si el sitio está seleccionado
                      onChange={() => handleSiteSelection(item)} // Maneja la selección/deselección del sitio
                    />
                    <div
                      style={{ cursor: "pointer", color: "#b3b3b3" }}
                      onClick={() => handleExpand(`country-${index}`)}
                    >
                      {expandedLevels.includes(`country-${index}`) ? (
                        <AiFillCaretRight size={16} />
                      ) : (
                        <AiFillCaretDown size={16} />
                      )}
                    </div>
                    <div
                      style={{
                        cursor: "pointer",
                        paddingLeft: "1rem",
                        textTransform: "capitalize",
                        color: "#b3b3b3",
                      }}
                      onClick={() => handleExpand(`country-${index}`)}
                    >
                      {item.country}
                    </div>
                  </div>
                  {expandedLevels.includes(`country-${index}`) && (
                    <>
                      {/* Elemento de sitio */}
                      {item.name && (
                        <div style={{ marginLeft: "60px" }}>
                          <input
                            type="checkbox"
                            style={{ width: "1.2rem", height: "1.2rem" }}
                            checked={isSiteSelected(item)} // Verifica si el sitio está seleccionado
                            onChange={() => handleSiteSelection(item)} // Maneja la selección/deselección del sitio
                          />
                          <label style={{ cursor: "pointer" }}>
                            {item.name}
                          </label>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </Box>
  );
};

export default SelectionTree;
