import React, { useState, useRef } from "react";
import styles from "./optimizationtools.module.css";
import { FaCircle } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { RiPencilLine } from "react-icons/ri";
import { SlSizeFullscreen } from "react-icons/sl";
import { FaTrash } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
function OptimizationTools() {
  const iframeRef = useRef(null);

  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const [showTable, setShowTable] = useState(true);

  const enterFullscreen = () => {
    if (iframeRef.current) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      } else if (iframeRef.current.mozRequestFullScreen) {
        iframeRef.current.mozRequestFullScreen();
      } else if (iframeRef.current.webkitRequestFullscreen) {
        iframeRef.current.webkitRequestFullscreen();
      } else if (iframeRef.current.msRequestFullscreen) {
        iframeRef.current.msRequestFullscreen();
      }
    }
  };

  const handleIconClick = () => {
    setShowTable(false); // Ocultar la tabla al hacer clic en un ícono
  };
  const handleMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const tools = [
    {
      assets: 1,
      assetName: "Bomba Captación",
      assetId: "B423",
      assetType: "Bomba",
      optimizationDescription: "Captación de Agua de Mar",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 2,
      assetName: "Bomba Captación",
      assetId: "B534",
      assetType: "Bomba",
      optimizationDescription: "Captación de Agua de Mar",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 3,
      assetName: "Bomba Captación",
      assetId: "B123",
      assetType: "Bomba",
      optimizationDescription: "Captación de Agua de Mar",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 4,
      assetName: "Bomba Alta Presión",
      assetId: "L943",
      assetType: "Bomba",
      optimizationDescription: "Bomba Osmosis Inversa",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 5,
      assetName: "Bomba Alta Presión",
      assetId: "L234",
      assetType: "Bomba",
      optimizationDescription: "Bomba Osmosis Inversa",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 6,
      assetName: "Bomba Alta Presión",
      assetId: "L321",
      assetType: "Bomba",
      optimizationDescription: "Bomba Osmosis Inversa",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 7,
      assetName: "Dosificación de Químicos",
      assetId: "D432",
      assetType: "Dosificador",
      optimizationDescription: "Dosificación de Coagulantes",
      status: "Done",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 8,
      assetName: "Dosificación de Químicos",
      assetId: "D654",
      assetType: "Dosificador",
      optimizationDescription: "Dosificación de Biocidas",
      status: "In Progress",
      assigned: "Trabajador X01",
      comment: "Optimización Generada",
    },
    {
      assets: 8,
      assetName: "Sistema de Postramiento",
      assetId: "P432",
      assetType: "Sistema",
      optimizationDescription: "Ajuste químico del Agua",
      status: "In Progress",
      assigned: "Trabajador X01",
      comment: "Optimización en Curso",
    },
    {
      assets: 8,
      assetName: "Sistema de Postramiento",
      assetId: "P543",
      assetType: "Sistema",
      optimizationDescription: "Ajuste químico del Agua",
      status: "In Progress",
      assigned: "Trabajador X01",
      comment: "Optimización en Curso",
    },
    {
      assets: 8,
      assetName: "Sistema de Desinfección",
      assetId: "X645",
      assetType: "Sistema",
      optimizationDescription: "Ozonicación del Agua",
      status: "In Progress",
      assigned: "Trabajador X01",
      comment: "Optimización en Curso",
    },
  ];

  return (
    <>
      {showTable ? (
        <table>
          <thead>
            <tr>
              <th>Assets</th>
              <th>Asset ID</th>
              <th>Asset Type</th>
              <th>Optimization Description</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((tool, index) => (
              <tr
                key={tool.assets}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={hoveredRowIndex === index ? styles.hoveredRow : ""}
              >
                <td>{tool.assetName}</td>
                <td>{tool.assetId}</td>
                <td>{tool.assetType}</td>
                <td>{tool.optimizationDescription}</td>
                <td>
                  {tool.status === "Done" && (
                    <FaCircle color="#78D700" style={{ marginRight: "5px" }} />
                  )}
                  {tool.status === "In Progress" && (
                    <FaCircle color="#FFD600" style={{ marginRight: "5px" }} />
                  )}
                  {tool.status}
                </td>
                <td>{tool.assigned}</td>
                <td>{tool.comment}</td>
                {hoveredRowIndex === index && (
                  <td className={styles.iconContainer}>
                    <span onClick={handleIconClick}>
                      <IoMdAddCircleOutline
                        color="#B3B3B3"
                        size={22}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span onClick={handleIconClick}>
                      <RiPencilLine
                        color="#B3B3B3"
                        size={22}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <span onClick={handleIconClick}>
                      <FaTrash
                        color="#B3B3B3"
                        size={18}
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.container}>
            <p className={styles.title}>Launcher Tecnalia Optimizator</p>
            <div className={styles.iconContainer2}>
            <span onClick={handleIconClick}>
                   <span onClick={handleIconClick}>
                      <SlSizeFullscreen
                        color="#B3B3B3"
                        size={18}
                        className={styles.icon}
                        style={{ cursor: "pointer" }}
                        onClick={enterFullscreen}
                      />
                    </span>
               
                    </span>
              {/* Agrega más imágenes de iconos si es necesario */}
            </div>
          </div>
          <iframe
            ref={iframeRef}
            className={styles.iframe}
            src="https://easyopt.tecnalia.com/#/login?user=lot&password=passLot%2301"
            title="embedded-report"
            frameBorder="0"
            allowFullScreen={true}
          ></iframe>
        </div>
      )}
    </>
  );
}

export default OptimizationTools;
