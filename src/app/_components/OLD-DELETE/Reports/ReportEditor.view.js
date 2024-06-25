import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { PiTrash } from "react-icons/pi";
import { TfiSave } from "react-icons/tfi";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { LuRectangleVertical } from "react-icons/lu";
import { LuRectangleHorizontal } from "react-icons/lu";
import { IoShareSocialOutline } from "react-icons/io5";
import { GrDocumentMissing } from "react-icons/gr";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { FaRegCheckCircle } from "react-icons/fa";
const chartSetting = {
  yAxis: [
    {
      label: "Dilurit",
    },
  ],

  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    dirulit: 59,
    date: "Jan",
  },
  {
    dirulit: 50,
    date: "Fev",
  },
  {
    dirulit: 47,
    date: "Mar",
  },
  {
    dirulit: 54,
    date: "Apr",
  },
  {
    dirulit: 52,
    date: "May",
  },
  {
    dirulit: 60,
    date: "June",
  },
  {
    dirulit: 59,
    date: "July",
  },
  {
    dirulit: 65,
    date: "Aug",
  },
  {
    dirulit: 51,
    date: "Sept",
  },
  {
    dirulit: 60,
    date: "Oct",
  },
  {
    dirulit: 67,
    date: "Nov",
  },
  {
    dirulit: 61,
    date: "Dec",
  },
];
const valueFormatter = (value) => `${value}mm`;
const ReportEditor = () => {
  const [vertical, setVertical] = useState(true);
  const [page, setPage] = useState("one");
  const [editPage, setEditPage] = useState(false);
  const [editWidget, setEditWidget] = useState(false);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          filter: editPage || editWidget ? "blur(2px)" : "",
        }}
      >
        <div
          style={{
            width: "90%",
            height: "5%",
            fontWeight: "700",
            paddingLeft: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <p>REPORT EDITOR</p>
          <div style={{ display: "flex", color: "#B3B3B3" }}>
            <LuRectangleVertical
              size={26}
              onClick={() => setVertical(true)}
              style={{ color: vertical ? "#0069C8" : "#B3B3B3" }}
            />
            <LuRectangleHorizontal
              size={26}
              onClick={() => setVertical(false)}
              style={{ color: !vertical ? "#0069C8" : "#B3B3B3" }}
            />
            <AiOutlinePlus size={26} />
            <IoShareSocialOutline size={26} />
            <GrDocumentMissing size={26} />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "100%",
            fontWeight: "700",
            paddingLeft: "2rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "40%",
              height: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: "45%",
                boxShadow: "2px 5px 10px 5px #00000033",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  maxWidth: "100%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 1rem",
                }}
              >
                <p style={{ fontWeight: "700" }}>Pages</p>
                <div style={{ display: "flex", color: "#B3B3B3" }}>
                  <AiOutlinePlus size={26} />
                  <TfiSave size={22} />
                  <PiTrash size={26} />
                </div>
              </div>
              <div
                onClick={() => setPage("one")}
                style={{
                  maxWidth: "100%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 1rem",
                  color: "#B3B3B3",
                  margin: "0.5rem 0",
                  backgroundColor: page === "one" ? "#0069C8" : "transparent",
                }}
              >
                <p>Page 1</p>
                <div>
                  <MdOutlineModeEdit
                    size={26}
                    onClick={() => setEditPage(true)}
                  />
                </div>
              </div>
              <div
                onClick={() => setPage("two")}
                style={{
                  maxWidth: "100%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 1rem",
                  color: "#B3B3B3",
                  margin: "0.5rem 0",
                  backgroundColor: page === "two" ? "#0069C8" : "transparent",
                }}
              >
                <p>Page 2</p>
                <div>
                  <MdOutlineModeEdit size={26} />
                </div>
              </div>
              <div
                style={{
                  maxWidth: "100%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 1rem",
                  color: "#B3B3B3",
                  margin: "0.5rem 0",
                }}
              >
                <p>Page 3</p>
                <div>
                  <MdOutlineModeEdit size={26} />
                </div>
              </div>
            </div>
            <div
              style={{
                width: "45%",
                boxShadow: "2px 5px 10px 5px #00000033",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  maxWidth: "100%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 1rem",
                }}
              >
                <p style={{ fontWeight: "700" }}>Tools</p>
              </div>
              <div
                style={{
                  width: "40%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  color: "#808080",
                }}
              >
                <p style={{ marginRight: "0.5rem", fontWeight: "700" }}>
                  Widgets
                </p>
                <IoMdArrowDropright size={26} />
              </div>
              <div
                style={{
                  width: "40%",
                  height: "5%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  color: "#808080",
                }}
              >
                <p style={{ marginRight: "0.5rem", fontWeight: "700" }}>
                  Graphs
                </p>
                <IoMdArrowDropright size={26} style={{ rotate: "90deg" }} />
              </div>
              <div
                style={{
                  width: "50%",
                  height: "5 % ",
                  display: "flex",
                  justifyContent: "space - between",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  color: "#B3B3B3",
                }}
              >
                <p style={{ margin: "0 0.5rem", fontWeight: "400" }}>
                  Distribution
                </p>
                <IoMdArrowDropright size={26} style={{ rotate: "90deg" }} />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img src="/images/piechart.svg" alt="piechart" height="90%" />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/areaschart.svg"
                    alt="areaschart"
                    height="90%"
                  />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/barchart1.svg"
                    alt="barchart1"
                    height="90%"
                  />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/barchart2.svg"
                    alt="barchart2"
                    height="90%"
                  />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/cellschart.svg"
                    alt="cellschart"
                    height="90%"
                  />
                </div>
              </div>
              <div
                style={{
                  width: "50%",
                  height: "5% ",
                  display: "flex",
                  justifyContent: "space - between",
                  alignItems: "center",
                  paddingLeft: "1rem",
                  color: "#B3B3B3",
                }}
              >
                <p style={{ margin: "0 0.5rem", fontWeight: "400" }}>
                  Evolution
                </p>
                <IoMdArrowDropright size={26} style={{ rotate: "90deg" }} />
              </div>
              <div
                style={{
                  width: "100%",
                  height: "fit-content",
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/doublebarchart.svg"
                    alt="piechart"
                    height="90%"
                  />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/areaschart2.svg"
                    alt="piechart"
                    height="90%"
                  />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/lineschart.svg"
                    alt="piechart"
                    height="90%"
                  />
                </div>
                <div
                  style={{
                    width: "90px",
                    height: "90px",
                    boxShadow: "2px 5px 10px 5px #00000033",
                    borderRadius: "8px",
                    margin: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="/images/combchart.svg"
                    alt="piechart"
                    height="90%"
                  />
                </div>
              </div>
            </div>
          </div>
          {page === "one" && (
            <div
              style={{
                width: "55%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  boxShadow: "2px 5px 10px 5px #00000033",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "10%",
                    backgroundColor: "#0069C8",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    src="/images/kuritalogowhite.svg"
                    alt="kuritalogo"
                    height="70%"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#ffffff",
                      fontSize: "14px",
                    }}
                  >
                    <div>RAPPORT PERIODIQUE 1</div>
                    <div>19/05/2023 - 18/06/2023</div>
                  </div>
                </div>
                <div style={{ width: "100%", height: "5%", color: "#0069C8" }}>
                  PAGE DE GARDE
                </div>
                {vertical ? (
                  <>
                    <div
                      style={{
                        width: "100%",
                        height: "45%",
                        display: "flex",
                        border: "1px solid #CCCCCC",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-between",
                          color: "#808080",
                          marginBottom: "2rem",
                        }}
                      >
                        <div></div>
                        <div>
                          <MdOutlineModeEdit size={26} />
                          <PiTrash size={26} />
                        </div>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: "40%",
                          display: "flex",
                        }}
                      >
                        <img
                          src="/images/volvic.png"
                          alt="Volvic"
                          width="80%"
                          height="100%"
                          style={{ margin: "0 auto" }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "35%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "45%",
                          height: "90%",
                          border: "1px solid #CCCCCC",
                        }}
                      >
                        <div
                          style={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#B3B3B3",
                          }}
                        >
                          <img
                            src="/images/Kurita Connect 360 - Logo-02.png"
                            alt="Volvic"
                            width="200px"
                          />
                          <div>
                            <PiTrash size={26} />
                            <MdOutlineModeEdit
                              size={26}
                              onClick={() => setEditWidget(true)}
                            />
                          </div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <div style={{ fontWeight: "700", fontSize: "10px" }}>
                            Laurent Kubiak
                          </div>
                          <div>Ingénieur Technico-Commercial</div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <div>Port + 33 (0)6 82 55 23 64</div>
                          <div>Tel.: + 33 (0)5 56 84 34 09</div>
                          <div
                            style={{
                              textDecoration: "underline",
                              fontWeight: "700",
                              fontSize: "10px",
                              color: "#0069C8",
                            }}
                          >
                            laurent.kubiak@kurita-water.com
                          </div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <div style={{ fontWeight: "700", fontSize: "10px" }}>
                            Kurita France SAS
                          </div>
                          <div>Route du Bec</div>
                          <div>33810 Ambes</div>
                          <div>France</div>
                          <div
                            style={{
                              textDecoration: "underline",
                              fontWeight: "700",
                              fontSize: "10px",
                              color: "#0069C8",
                            }}
                          >
                            www.kurita.eu
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          width: "45%",
                          height: "90%",
                          border: "1px solid #CCCCCC",
                        }}
                      >
                        <div
                          style={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontWeight: "400" }}>DATE / Nº</p>
                          <div style={{ color: "#B3B3B3" }}>
                            <PiTrash size={26} />
                            <MdOutlineModeEdit size={26} />
                          </div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <p style={{ fontWeight: "400" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        width: "100%",
                        height: "45%",
                        display: "flex",
                        border: "1px solid #CCCCCC",
                        justifyContent: "space-between",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          width: "50%",
                          height: "90%",
                          justifyContent: "space-between",
                          color: "#808080",
                          marginBottom: "2rem",
                        }}
                      >
                        <div
                          style={{
                            width: "80%",
                            height: "40%",
                            display: "flex",
                          }}
                        >
                          <img
                            src="/images/volvic.png"
                            alt="Volvic"
                            width="80%"
                            height="100%"
                            style={{ margin: "0 auto" }}
                          />
                        </div>
                        <div>
                          <MdOutlineModeEdit size={26} />
                          <PiTrash size={26} />
                        </div>
                      </div>

                      <div
                        style={{
                          width: "45%",
                          height: "90%",
                          border: "1px solid #CCCCCC",
                        }}
                      >
                        <div
                          style={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            color: "#B3B3B3",
                          }}
                        >
                          <img
                            src="/images/Kurita Connect 360 - Logo-02.png"
                            alt="Volvic"
                            width="200px"
                          />
                          <div>
                            <PiTrash size={26} />
                            <MdOutlineModeEdit
                              size={26}
                              onClick={() => setEditWidget(true)}
                            />
                          </div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <div style={{ fontWeight: "700", fontSize: "10px" }}>
                            Laurent Kubiak
                          </div>
                          <div>Ingénieur Technico-Commercial</div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <div>Port + 33 (0)6 82 55 23 64</div>
                          <div>Tel.: + 33 (0)5 56 84 34 09</div>
                          <div
                            style={{
                              textDecoration: "underline",
                              fontWeight: "700",
                              fontSize: "10px",
                              color: "#0069C8",
                            }}
                          >
                            laurent.kubiak@kurita-water.com
                          </div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <div style={{ fontWeight: "700", fontSize: "10px" }}>
                            Kurita France SAS
                          </div>
                          <div>Route du Bec</div>
                          <div>33810 Ambes</div>
                          <div>France</div>
                          <div
                            style={{
                              textDecoration: "underline",
                              fontWeight: "700",
                              fontSize: "10px",
                              color: "#0069C8",
                            }}
                          >
                            www.kurita.eu
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "35%",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "60%",
                          height: "90%",
                          border: "1px solid #CCCCCC",
                        }}
                      >
                        <div
                          style={{
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <p style={{ fontWeight: "400" }}>DATE / Nº</p>
                          <div style={{ color: "#B3B3B3" }}>
                            <PiTrash size={26} />
                            <MdOutlineModeEdit size={26} />
                          </div>
                        </div>
                        <div style={{ margin: "0 1rem" }}>
                          <p style={{ fontWeight: "400" }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div
                  style={{
                    width: "100%",
                    height: "5%",
                    display: "flex",
                    backgroundColor: "#0069C8",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#ffffff",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  <IoMdArrowDropleft size={26} />
                  <div>1 / 15</div>
                  <IoMdArrowDropright size={26} />
                </div>
              </div>
            </div>
          )}
          {page === "two" && (
            <div
              style={{
                width: "55%",
                height: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  boxShadow: "2px 5px 10px 5px #00000033",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "10%",
                    backgroundColor: "#0069C8",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <img
                    src="/images/kuritalogowhite.svg"
                    alt="kuritalogo"
                    height="70%"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      color: "#ffffff",
                      fontSize: "14px",
                    }}
                  >
                    <div>RAPPORT PERIODIQUE 1</div>
                    <div>19/05/2023 - 18/06/2023</div>
                  </div>
                </div>
                <div style={{ width: "100%", height: "4%", color: "#0069C8" }}>
                  PAGE DE GARDE
                </div>
                <div style={{ width: "100%", height: "27%", display: "flex" }}>
                  <div style={{ width: "50%", height: "100%" }}>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: "50%", height: "100%" }}>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                      ]}
                    />
                  </div>
                </div>
                <div style={{ width: "100%", height: "27%", display: "flex" }}>
                  <div
                    style={{ width: "90%", height: "100%", margin: "0 auto" }}
                  >
                    <BarChart
                      dataset={dataset}
                      xAxis={[{ scaleType: "band", dataKey: "date" }]}
                      series={[
                        {
                          dataKey: "dirulit",
                          label: "Dilurit",
                          valueFormatter,
                        },
                      ]}
                      {...chartSetting}
                    />
                  </div>
                </div>
                <div style={{ width: "100%", height: "27%", display: "flex" }}>
                  <div style={{ width: "50%", height: "100%" }}>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                      ]}
                    />
                  </div>
                  <div style={{ width: "50%", height: "100%" }}>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                          area: true,
                        },
                      ]}
                    />
                  </div>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "5%",
                    display: "flex",
                    backgroundColor: "#0069C8",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#ffffff",
                    borderRadius: "0 0 8px 8px",
                  }}
                >
                  <IoMdArrowDropleft size={26} />
                  <div>2 / 15</div>
                  <IoMdArrowDropright size={26} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {editPage && (
        <div
          style={{
            position: "fixed",
            zIndex: "20",
            top: "50%",
            left: "50%",
            width: "300px",
            height: "150px",
            translate: "-50%",
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "2px 5px 10px 5px #00000033",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              maxWidth: "100%",
              height: "30%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              alignItems: "center",
            }}
          >
            <p> Edit Page</p>
            <p onClick={() => setEditPage(false)}>X</p>
          </div>
          <div
            style={{
              maxWidth: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              alignItems: "center",
            }}
          >
            <p>Name</p>
            <div
              style={{
                width: "70%",
                height: "1rem",
                border: "1px solid #b3b3b3",
              }}
            ></div>
          </div>
          <div
            style={{
              maxWidth: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              alignItems: "center",
              color: "#b3b3b3",
            }}
          >
            <PiTrash size={26} />
            <FaRegCheckCircle size={26} />
          </div>
        </div>
      )}
      {editWidget && (
        <div
          style={{
            position: "fixed",
            zIndex: "20",
            top: "10%",
            left: "50%",
            width: "580px",
            height: "760px",
            translate: "-50%",
            background: "#ffffff",
            borderRadius: "8px",
            boxShadow: "2px 5px 10px 5px #00000033",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              maxWidth: "100%",
              height: "30%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              alignItems: "center",
            }}
          >
            <p> Edit Page</p>
            <p onClick={() => setEditWidget(false)}>X</p>
          </div>
          <div
            style={{
              maxWidth: "100%",
              height: "50%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              alignItems: "center",
            }}
          >
            <p>Name</p>
            <div
              style={{
                width: "70%",
                height: "1rem",
                border: "1px solid #b3b3b3",
              }}
            ></div>
          </div>
          <div
            style={{
              maxWidth: "100%",
              height: "20%",
              display: "flex",
              justifyContent: "space-between",
              padding: "0 1rem",
              alignItems: "center",
              color: "#b3b3b3",
            }}
          >
            <PiTrash size={26} />
            <FaRegCheckCircle size={26} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReportEditor;
