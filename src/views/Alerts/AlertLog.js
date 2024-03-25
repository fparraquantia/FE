import { Box, Checkbox, CircularProgress, TableRow } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { PiTrash } from 'react-icons/pi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FiMessageCircle } from "react-icons/fi";
import { GoLink } from "react-icons/go";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Hider from '../../components/shared/Hider/Hider.component';
const AlertLog = () => {
    const [manualInput, setManualInput] = useState(undefined);
    const [isManualInputLoading, setIsManualInputLoading] = useState(false);
    const [alertsData, setAlertsdata] = useState([
        {
            time: '2:00',
            selected: true,
            date: '10/03/2023​',
            hour: '23:59​',
            critically: 'High',
            parameter: 'Conductivity',
            comments: '2',
            status: 'New'
        },
        {
            time: '3:00',
            selected: true,
            date: '06/03/2023​',
            hour: '23:59​',
            critically: 'Medium',
            parameter: 'Level​',
            comments: '0',
            status: 'New'
        },
        {
            time: '4:00',
            selected: true,
            date: '20/11/2023',
            hour: '23:59​',
            critically: 'Low​',
            parameter: 'Temperature',
            comments: '1',
            status: 'New'
        }])
    const piedata = [{ label: 'High', value: 300 },
    { label: 'Medium', value: 300 },
    { label: 'Low', value: 300 }]
    const isHidden = true;
    const bardata = [
        { data: [1, 5, 2], stack: 'a', color: '#FF0000' },
        { data: [2, 0, 4], stack: 'a', color: '#FFA800' },
        { data: [3, 2, 3], stack: 'b', color: '#FF0000' },
        { data: [8, 3, 6], stack: 'b', color: '#FFA800' },
        { data: [11, 6, 9], color: '#FFD600' },
    ];

    return (
        <Box sx={{ maxWidth: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }} >
            <Box sx={{ height: '100%', width: '65%', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px' }}>
                <Box sx={{ width: '100%', height: '5%', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                    <Box sx={{ width: '60%', display: 'flex', justifyContent: 'flex-start', alignContent: 'center', padding: '1rem' }}>
                        <Box sx={{ width: 'fit-content', fontWeight: '700', fontSize: '1.2rem', marginRight: '1rem' }}>ALERT LOG</Box>
                        <Box sx={{ width: '200px', fontWeight: '400', display: 'flex', justifyContent: 'flex-start', color: '#B3B3B3' }}>
                            <IoMdArrowDropdown size={26} />
                            <Box >Missing Entry Data</Box>

                        </Box>
                        <Box sx={{ width: '200px', fontWeight: '400', display: 'flex', justifyContent: 'flex-start', color: '#B3B3B3' }}>
                            <IoMdArrowDropdown size={26} />
                            <Box >New</Box>

                        </Box>
                    </Box>
                    <Box sx={{ width: '25%', color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                        <AiOutlinePlus size={26} style={{ margin: 'auto 0' }} />
                        <FiMessageCircle size={26} style={{ margin: 'auto 0' }} />
                        <GoLink size={26} style={{ margin: 'auto 0' }} />
                        <MdOutlineModeEdit size={26} style={{ margin: 'auto 0' }} />
                        <FaRegCheckCircle size={26} style={{ margin: 'auto 0' }} />
                        <PiTrash size={26} style={{ margin: 'auto 0' }} />
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: '90%'
                    }}>
                    <Box
                        sx={{
                            height: '5vh',
                            margin: '0.3rem',
                            display: 'flex',
                            backgroundColor: '#ffffff'
                        }}>
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center'
                            }}>
                            <Box component='p'>1:00</Box>
                        </Box>
                        <Checkbox />
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Box component='p'>Date</Box>
                        </Box>
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Box component='p'>Hour</Box>
                        </Box>
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Box component='p'>Critically</Box>
                        </Box>
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Box component='p'>Parameter</Box>
                        </Box>
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Box component='p'>Comments</Box>
                        </Box>
                        <Box
                            sx={{
                                width: '15%',
                                height: '100%',
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'flex-start'
                            }}>
                            <Box component='p'>Status</Box>
                        </Box>

                    </Box>
                    <Box sx={{ height: '100%', overflowY: 'scroll' }}>
                        <Hider isHidden={!isManualInputLoading}>
                            <CircularProgress />
                        </Hider>
                        {alertsData ? alertsData.map((input, index) =>
                            <Box
                                sx={{
                                    height: '5vh',
                                    margin: '0.3rem',
                                    display: 'flex',
                                    backgroundColor: '#ffffff'
                                }}>
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'center'
                                    }}>
                                    <Box component='p'>{input.time}</Box>
                                </Box>
                                <Checkbox selected={input.selected} />
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                    <Box component='p'>{input.date}</Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                    <Box component='p'>{input.hour}</Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                    {input.critically === 'High' ? <Box sx={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FF0000', margin: 'auto 0.5rem' }}></Box> :
                                        input.critically === 'Medium' ?
                                            <Box sx={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFA800', margin: 'auto 0.5rem' }}></Box> :
                                            <Box sx={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFD600', margin: 'auto 0.5rem' }}></Box>}

                                    <Box component='p'>{input.critically}</Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                    <Box component='p'>Parameter</Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                    <Box component='p'>Comments</Box>
                                </Box>
                                <Box
                                    sx={{
                                        width: '15%',
                                        height: '100%',
                                        display: 'flex',
                                        alignContent: 'center',
                                        justifyContent: 'flex-start'
                                    }}>
                                    <Box component='p'>Status</Box>
                                </Box>

                            </Box>) : <></>}
                    </Box>
                </Box>
            </Box>

            <Box sx={{ width: '30%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{ width: '100%', height: '48%', display: 'flex', flexDirection: 'column', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', position: 'relative' }}>
                    <Box sx={{ width: '300px', margin: '1rem', color: '#000000', fontFamily: 'Arial', fontWeight: '700', fontSize: '19px' }}>New Alarms</Box>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', translate: '-50% -50%', fontFamily: 'Arial', fontWeight: '700',
                        fontSize: '64px', color: '#B3B3B3', display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>
                        <Box> {alertsData.length}</Box>
                        <Box sx={{
                            fontWeight: '400',
                            fontSize: '16px',
                        }}>Alarms</Box>

                    </Box>
                    <PieChart
                        colors={['#FF0000', '#FFA800', '#FFD600']}
                        slotProps={{ legend: { hidden: isHidden } }}
                        series={[
                            {
                                data: piedata,
                                innerRadius: 110,
                                outerRadius: 130,
                                paddingAngle: 2,
                                cornerRadius: 0,
                                startAngle: 0,
                                endAngle: 360,
                                cx: 220,
                                cy: 140,
                            }]}
                    />
                </Box>
                <Box sx={{ width: '100%', height: '48%', display: 'flex', flexDirection: 'column', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', position: 'relative' }}>
                    <Box sx={{ width: '300px', margin: '1rem', color: '#000000', fontFamily: 'Arial', fontWeight: '700', fontSize: '19px' }}>Monthly Evolution</Box>
                    <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', translate: '-50% -50%', fontFamily: 'Arial', fontWeight: '700',
                        fontSize: '64px', color: '#B3B3B3', display: 'flex', flexDirection: 'column', alignItems: 'center'
                    }}>


                    </Box>
                    <BarChart
                        series={bardata}
                        width={500}
                        height={300}
                        margin={{ top: 5 }}
                        xAxis={[
                            {
                                scaleType: 'band',
                                data: ['mar-17', 'sept-17', 'mar-18'],

                            },
                        ]}
                    />
                </Box>
            </Box>
        </Box >
    )
}

export default AlertLog