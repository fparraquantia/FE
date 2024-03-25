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
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 2,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 3,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 4,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 5,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 6,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 7,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "Done",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 8,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "In Progress",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 8,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "In Progress",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 8,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "In Progress",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
    },
    {
      assets: 8,
      assetName: "Server 1",
      assetId: "LFDSFS123",
      assetType: "Reporting",
      optimizationDescription: "Optimization description example",
      status: "In Progress",
      assigned: "Tedagua - Technical Service",
      comment: "Report Already Sent",
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
            src="https://easyopt.tecnalia.com"
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
