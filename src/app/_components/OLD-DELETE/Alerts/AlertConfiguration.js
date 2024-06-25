import React from 'react'
import { Box, Button } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai'
import { MdOutlineModeEdit } from 'react-icons/md'
import { PiTrash } from 'react-icons/pi'
import { IoMdArrowDropdown } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
const AlertConfiguration = () => {
    return (
        <Box sx={{ maxWidth: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }} >
            <Box sx={{ width: '49%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                <Box sx={{ maxWidth: '100%', height: '30%', padding: '1rem', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px' }}>
                    <Box sx={{ width: '100%', height: '15%', fontFamily: 'Arial', fontWeight: '700', fontSize: '19px' }}>General information</Box>
                    <Box sx={{ maxWidth: '100%', height: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '100%', height: '45%', display: 'flex', justifyContent: 'space-between', color: '#B3B3B3', fontSize: '19px' }}>
                            <Box>Name</Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <Box >Status</Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', color: '#0069C8' }}>
                                    Active<Box sx={{ width: '15px', height: '15px', backgroundColor: '#0069C8', borderRadius: '5px', marginLeft: '0.5rem' }}></Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', height: '45%', color: '#B3B3B3', fontSize: '19px' }}>Description</Box>
                    </Box>
                </Box>
                <Box sx={{ maxWidth: '100%', height: '60%', padding: '1rem', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', position: 'relative' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '19px' }}>Alert triggering</Box>
                        <Box>
                            <Box sx={{ color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                                <AiOutlinePlus size={26} />
                                <MdOutlineModeEdit size={26} />
                                <PiTrash size={26} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: '30%', height: '45%', color: '#B3B3B3', fontSize: '19px' }}>Status</Box>
                        <Box sx={{ width: '30%', height: '45%', color: '#B3B3B3', fontSize: '19px' }}>Condition</Box>
                        <Box sx={{ width: '30%', height: '45%', color: '#B3B3B3', fontSize: '19px' }}>Criticality</Box>
                    </Box>
                    <Box sx={{ width: '100%', height: '15%', marginTop: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '100%', height: '30%', fontSize: '19px', color: '#B3B3B3' }}>Criteria 1</Box>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center' }}>
                            <Box sx={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '15px', height: '15px', borderRadius: '5px', backgroundColor: '#0069C8', margin: 'auto 0.5rem' }}>
                                </Box>
                            </Box>
                            <Box sx={{ width: '10%', height: '100%' }}>6</Box>
                            <Box sx={{ width: '10%', height: '100%' }}>days</Box>
                            <Box sx={{ width: '35%', height: '100%', textOverflow: 'ellipsis' }}>As of the first day after missing d...</Box>
                            <Box sx={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Box sx={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFA800', margin: 'auto 0.5rem' }}>
                                </Box>
                                <Box>Medium</Box>
                                < IoMdArrowDropdown size={26} />
                            </Box>
                            <Box sx={{ width: '10%', height: '100%' }}>
                                <CiMenuKebab size={26} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', height: '15%', marginTop: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '100%', height: '30%', fontSize: '19px', color: '#B3B3B3' }}>Criteria 1</Box>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center' }}>
                            <Box sx={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '15px', height: '15px', borderRadius: '5px', backgroundColor: '#0069C8', margin: 'auto 0.5rem' }}>
                                </Box>
                            </Box>
                            <Box sx={{ width: '10%', height: '100%' }}>6</Box>
                            <Box sx={{ width: '10%', height: '100%' }}>days</Box>
                            <Box sx={{ width: '35%', height: '100%', textOverflow: 'ellipsis' }}>As of the first day after missing d...</Box>
                            <Box sx={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Box sx={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFA800', margin: 'auto 0.5rem' }}>
                                </Box>
                                <Box>Medium</Box>
                                < IoMdArrowDropdown size={26} />
                            </Box>
                            <Box sx={{ width: '10%', height: '100%' }}>
                                <CiMenuKebab size={26} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', height: '15%', marginTop: '1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Box sx={{ width: '100%', height: '30%', fontSize: '19px', color: '#B3B3B3' }}>Criteria 1</Box>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', textAlign: 'center' }}>
                            <Box sx={{ width: '10%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ width: '15px', height: '15px', borderRadius: '5px', backgroundColor: '#0069C8', margin: 'auto 0.5rem' }}>
                                </Box>
                            </Box>
                            <Box sx={{ width: '10%', height: '100%' }}>6</Box>
                            <Box sx={{ width: '10%', height: '100%' }}>days</Box>
                            <Box sx={{ width: '35%', height: '100%', textOverflow: 'ellipsis' }}>As of the first day after missing d...</Box>
                            <Box sx={{ width: '25%', height: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <Box sx={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#FFA800', margin: 'auto 0.5rem' }}>
                                </Box>
                                <Box>Medium</Box>
                                < IoMdArrowDropdown size={26} />
                            </Box>
                            <Box sx={{ width: '10%', height: '100%' }}>
                                <CiMenuKebab size={26} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{
                        backgroundColor: '#0069C8', color: '#FFFFFF', width: '95px', height: '41px',
                        borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '19px', position: 'absolute', right: '2rem', bottom: '2rem'
                    }}>
                        Save</Box>
                </Box>
            </Box>
            <Box sx={{
                width: '49%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
            }}>
                <Box sx={{ maxWidth: '100%', height: '30%', padding: '1rem', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%', height: '15%', fontFamily: 'Arial', fontWeight: '700', fontSize: '19px' }}>Alert Settings</Box>
                    <Box sx={{ width: '100%', height: '15%', display: 'flex', marginTop: '1rem' }}>
                        <Box sx={{ width: '33%', color: '#B3B3B3', fontSize: '19px' }}>Source</Box>
                        <Box sx={{ width: '33%', color: '#B3B3B3', fontSize: '19px' }}>System</Box>
                        <Box sx={{ width: '33%', color: '#B3B3B3', fontSize: '19px' }}>Parameter</Box>
                    </Box>
                    <Box sx={{ width: '100%', height: '15%', display: 'flex' }}>
                        <Box sx={{ width: '33%', fontSize: '19px', backgroundColor: '#F7FAFD', padding: '0 1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>Sensor</Box>
                            <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                        </Box>
                        <Box sx={{ width: '33%', fontSize: '19px', backgroundColor: '#F7FAFD', padding: '0 1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>System name</Box>
                            <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                        </Box>
                        <Box sx={{ width: '33%', fontSize: '19px', backgroundColor: '#F7FAFD', padding: '0 1rem', display: 'flex', justifyContent: 'space-between' }}>
                            <Box>Parameter Name</Box>
                            <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', height: '15%', display: 'flex', marginTop: '2rem' }}>
                        <Box sx={{ width: '33%', color: '#B3B3B3', fontSize: '19px', display: 'flex', alignItems: 'center' }}>Frequency</Box>
                        <Box sx={{ width: '16%', color: '#B3B3B3', fontSize: '19px', display: 'flex', alignItems: 'center' }}>Hourly</Box>
                        <Box sx={{ width: '16%', color: '#B3B3B3', fontSize: '19px', display: 'flex', alignItems: 'center' }}>Daily</Box>
                        <Box sx={{ width: '16%', color: '#B3B3B3', fontSize: '19px', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>
                            <Box>Weekly</Box>
                            <Box sx={{ backgroundColor: '#0069C8', width: '15px', height: '15px', borderRadius: '5px' }}></Box>
                        </Box>
                        <Box sx={{ width: '16%', color: '#B3B3B3', fontSize: '19px', display: 'flex', alignItems: 'center' }}>Monthly</Box>
                    </Box>
                </Box>
                <Box sx={{ maxWidth: '100%', height: '60%', padding: '1rem', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', position: 'relative' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '19px' }}>Alarm stages</Box>
                        <Box>
                            <Box sx={{ color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                                <AiOutlinePlus size={26} />
                                <MdOutlineModeEdit size={26} />
                                <PiTrash size={26} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ width: '20%', height: '45%', color: '#B3B3B3', display: 'flex', alignItems: 'center' }}>Status</Box>
                        <Box sx={{
                            width: '20%', height: '45%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
                            backgroundColor: '#F7FAFD',
                        }}>
                            <Box>4 stages</Box>
                            <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                        </Box>
                        <Box sx={{
                            width: '40%', height: '45%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
                            backgroundColor: '#F7FAFD',
                        }}>
                            <Box>Every working days</Box>
                            <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                        </Box>
                        <Box sx={{
                            width: '20%', height: '45%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center',
                            backgroundColor: '#F7FAFD',
                        }}>
                            <Box>All the year</Box>
                            <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', height: '20%', display: 'flex', flexDirection: 'column', margin: '1rem 0' }}>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex' }}>
                            <Box sx={{
                                width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', color: '#ffffff'
                                , backgroundColor: '#FFA800'
                            }}>
                                <Box sx={{ fontWeight: '700' }}>Stage 3</Box>
                                <Box sx={{ fontSize: '36px', fontWeight: '700' }}>29</Box>
                            </Box>
                            <Box sx={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ backgroundColor: '#0069C8', width: '15px', height: '15px', borderRadius: '5px' }}></Box>
                            </Box>
                            <Box sx={{ width: '25%', padding: '0 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box sx={{ backgroundColor: '#FFA800', width: '15px', height: '15px', borderRadius: '50%' }}></Box>
                                <Box>Medium</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                            <Box sx={{ width: '50%', display: 'flex', padding: '0 0.5rem', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box>Every time it is exceeded</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex' }}>
                            <Box sx={{
                                width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', color: '#ffffff'
                                , backgroundColor: '#FFD600'
                            }}>
                                <Box sx={{ fontWeight: '700' }}></Box>
                                <Box sx={{ fontSize: '36px', fontWeight: '700' }}>29</Box>
                            </Box>
                            <Box sx={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ backgroundColor: '#0069C8', width: '15px', height: '15px', borderRadius: '5px' }}></Box>
                            </Box>
                            <Box sx={{ width: '25%', padding: '0 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box sx={{ backgroundColor: '#FFD600', width: '15px', height: '15px', borderRadius: '50%' }}></Box>
                                <Box>Low</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                            <Box sx={{ width: '50%', display: 'flex', padding: '0 0.5rem', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box>As of the 3rd exceed of the day</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                        </Box>

                    </Box>
                    <Box sx={{ width: '100%', height: '10%', textAlign: 'center', color: '#B3B3B3' }}>
                        This stage will not generate alarms.
                    </Box>
                    <Box sx={{ width: '100%', height: '20%', display: 'flex', flexDirection: 'column', margin: '1rem 0' }}>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex' }}>
                            <Box sx={{
                                width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', color: '#ffffff'
                                , backgroundColor: '#FFA800'
                            }}>
                                <Box sx={{ fontWeight: '700' }}>Stage 3</Box>
                                <Box sx={{ fontSize: '36px', fontWeight: '700' }}>29</Box>
                            </Box>
                            <Box sx={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ backgroundColor: '#0069C8', width: '15px', height: '15px', borderRadius: '5px' }}></Box>
                            </Box>
                            <Box sx={{ width: '25%', padding: '0 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box sx={{ backgroundColor: '#FFA800', width: '15px', height: '15px', borderRadius: '50%' }}></Box>
                                <Box>Medium</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                            <Box sx={{ width: '50%', display: 'flex', padding: '0 0.5rem', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box>Every time it is exceeded</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', height: '50%', display: 'flex' }}>
                            <Box sx={{
                                width: '20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', color: '#ffffff'
                                , backgroundColor: '#FFD600'
                            }}>
                                <Box sx={{ fontWeight: '700' }}></Box>
                                <Box sx={{ fontSize: '36px', fontWeight: '700' }}>29</Box>
                            </Box>
                            <Box sx={{ width: '5%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Box sx={{ backgroundColor: '#0069C8', width: '15px', height: '15px', borderRadius: '5px' }}></Box>
                            </Box>
                            <Box sx={{ width: '25%', padding: '0 0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box sx={{ backgroundColor: '#FFD600', width: '15px', height: '15px', borderRadius: '50%' }}></Box>
                                <Box>Low</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                            <Box sx={{ width: '50%', display: 'flex', padding: '0 0.5rem', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F7FAFD' }}>
                                <Box>As of the 3rd exceed of the day</Box>
                                <IoMdArrowDropdown size={26} style={{ color: '#B3B3B3' }} />
                            </Box>
                        </Box>

                    </Box>
                    <Box sx={{
                        backgroundColor: '#0069C8', color: '#FFFFFF', width: '95px', height: '41px',
                        borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '19px', position: 'absolute', right: '2rem', bottom: '2rem'
                    }}>
                        Save</Box>
                </Box>
            </Box>
        </Box >
    )
}

export default AlertConfiguration