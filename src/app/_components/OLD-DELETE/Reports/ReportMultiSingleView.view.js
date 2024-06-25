import React, { useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { PiTrash } from 'react-icons/pi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FiCalendar } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
const chartSetting = {
    yAxis: [
        {
            label: 'Dilurit',
        },
    ],

    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-20px, 0)',
        },
    },
};
const dataset = [
    {
        dirulit: 59,
        date: 'Jan',
    },
    {
        dirulit: 50,
        date: 'Fev',
    },
    {
        dirulit: 47,
        date: 'Mar',
    },
    {
        dirulit: 54,
        date: 'Apr',
    },
    {
        dirulit: 52,
        date: 'May',
    },
    {
        dirulit: 60,
        date: 'June',
    },
    {
        dirulit: 59,
        date: 'July',
    },
    {
        dirulit: 65,
        date: 'Aug',
    },
    {
        dirulit: 51,
        date: 'Sept',
    },
    {
        dirulit: 60,
        date: 'Oct',
    },
    {
        dirulit: 67,
        date: 'Nov',
    },
    {
        dirulit: 61,
        date: 'Dec',
    },
];
const valueFormatter = (value) => `${value}mm`;
const ReportSite = ({ selectedSite }) => {


    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }} >
            <div style={{ width: '90%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ width: '100%', height: '5vh', display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '50%', fontWeight: '700', fontSize: '19px' }}>My Analysis - VOLVIC CHANCET 1</div>
                    <div style={{ width: '25%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>17/05/2023    -    17/05/2023 <FiCalendar size={26} style={{ color: '#0069C8' }} /></div>
                    <div style={{ width: '25%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: '#808080' }}>Search file<CiSearch size={26} style={{ color: '#0069C8' }} /></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ width: '30%', height: '75vh', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: '10%', backgroundColor: '#0069C8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <img src="/images/kuritalogowhite.svg" alt="kuritalogo" height='70%' />
                            <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff', fontSize: '14px' }}>
                                <div>RAPPORT PERIODIQUE 1</div>
                                <div>19/05/2023 - 18/06/2023</div>
                            </div>
                            <CiMenuKebab size={26} style={{ color: '#ffffff' }} />
                        </div>
                        <div style={{ width: '100%', height: '30%', display: 'flex' }}>
                            <div style={{ width: '50%', height: '100%' }}>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                        },
                                    ]}
                                />
                            </div>
                            <div style={{ width: '50%', height: '100%' }}>
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
                        <div style={{ width: '100%', height: '30%', display: 'flex' }}>
                            <div style={{ width: '90%', height: '100%', margin: '0 auto', border: '1px solid #CCCCCC' }}>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', color: '#808080', borderBottom: '1px solid #CCCCCC' }}>
                                    <div>Comments</div>
                                    <div>
                                        <MdOutlineModeEdit size={26} />
                                        <PiTrash size={26} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '30%', display: 'flex' }}>
                            <div style={{ width: '50%', height: '100%' }}>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],

                                        },
                                    ]}
                                />
                            </div>
                            <div style={{ width: '50%', height: '100%' }}>
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
                        <div style={{ width: '100%', height: '5%', display: 'flex', backgroundColor: '#0069C8', justifyContent: 'center', alignItems: 'center', color: '#ffffff', borderRadius: '0 0 8px 8px' }}>
                            <IoMdArrowDropleft size={26} />
                            <div>4 / 15</div>
                            <IoMdArrowDropright size={26} />
                        </div>
                    </div>
                    <div style={{ width: '30%', height: '75vh', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: '10%', backgroundColor: '#0069C8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <img src="/images/kuritalogowhite.svg" alt="kuritalogo" height='70%' />
                            <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff', fontSize: '14px' }}>
                                <div>RAPPORT PERIODIQUE 1</div>
                                <div>19/05/2023 - 18/06/2023</div>
                            </div>
                            <CiMenuKebab size={26} style={{ color: '#ffffff' }} />
                        </div>
                        <div style={{ width: '100%', height: '30%', display: 'flex' }}>
                            <div style={{ width: '50%', height: '100%' }}>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                                        },
                                    ]}
                                />
                            </div>
                            <div style={{ width: '50%', height: '100%' }}>
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
                        <div style={{ width: '100%', height: '30%', display: 'flex' }}>
                            <div style={{ width: '90%', height: '100%', margin: '0 auto' }}>
                                <BarChart
                                    dataset={dataset}
                                    xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
                                    series={[
                                        { dataKey: 'dirulit', label: 'Dilurit', valueFormatter },

                                    ]}
                                    {...chartSetting}
                                />
                            </div>

                        </div>
                        <div style={{ width: '100%', height: '30%', display: 'flex' }}>
                            <div style={{ width: '50%', height: '100%' }}>
                                <LineChart
                                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                                    series={[
                                        {
                                            data: [2, 5.5, 2, 8.5, 1.5, 5],

                                        },
                                    ]}
                                />
                            </div>
                            <div style={{ width: '50%', height: '100%' }}>
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
                        <div style={{ width: '100%', height: '5%', display: 'flex', backgroundColor: '#0069C8', justifyContent: 'center', alignItems: 'center', color: '#ffffff', borderRadius: '0 0 8px 8px' }}>
                            <IoMdArrowDropleft size={26} />
                            <div>4 / 15</div>
                            <IoMdArrowDropright size={26} />
                        </div>
                    </div>
                    <div style={{ width: '30%', height: '75vh', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px' }}>
                        <div style={{ width: '100%', height: '10%', backgroundColor: '#0069C8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <img src="/images/kuritalogowhite.svg" alt="kuritalogo" height='70%' />
                            <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff', fontSize: '14px' }}>
                                <div>RAPPORT PERIODIQUE 1</div>
                                <div>19/05/2023 - 18/06/2023</div>
                            </div>
                            <CiMenuKebab size={26} style={{ color: '#ffffff' }} />
                        </div>
                        <div style={{ width: '100%', height: '5%', }}>

                        </div>
                        <div style={{ width: '100%', height: '60%', display: 'flex' }}>
                            <div style={{ width: '95%', height: '90%', margin: '0 auto', border: '1px solid #CCCCCC' }}>
                                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', color: '#808080', borderBottom: '1px solid #CCCCCC' }}>
                                    <div>Comments</div>
                                    <div>
                                        <MdOutlineModeEdit size={26} />
                                        <PiTrash size={26} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ width: '100%', height: '20%', display: 'flex' }}>
                            <img src="/images/sensing.png" alt="Sensing" width='95%' height='100%' style={{ margin: '0 auto' }} />
                        </div>
                        <div style={{ width: '100%', height: '5%', }}>

                        </div>
                        <div style={{ width: '100%', height: '5%', display: 'flex', backgroundColor: '#0069C8', justifyContent: 'center', alignItems: 'center', color: '#ffffff', borderRadius: '0 0 8px 8px' }}>
                            <IoMdArrowDropleft size={26} />
                            <div>4 / 15</div>
                            <IoMdArrowDropright size={26} />
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default ReportSite