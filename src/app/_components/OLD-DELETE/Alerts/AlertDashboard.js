import React from 'react'
import { Box } from '@mui/material'
import { AiOutlinePlus } from 'react-icons/ai';
import { PiTrash } from 'react-icons/pi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { CiCircleAlert } from "react-icons/ci";
import { FaArrowUp } from "react-icons/fa";
import { CiBellOff } from "react-icons/ci";
const AlertDashboard = () => {
    return (
        <Box sx={{ maxWidth: '100%', height: '100%', display: 'flex', justifyContent: 'space-between' }} >
            <Box sx={{ width: '65%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box sx={{
                    maxWidth: '100%', height: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px',
                }}>
                    <Box sx={{ maxWidth: '100%', height: '15%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '19px', lineHeight: '21.85px' }}>MISSING DATA</Box>
                        <Box sx={{ width: '25%', color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                            <AiOutlinePlus size={26} style={{ margin: 'auto 0' }} />
                            <MdOutlineModeEdit size={26} style={{ margin: 'auto 0' }} />
                            <PiTrash size={26} style={{ margin: 'auto 0' }} />
                        </Box>
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', justifyContent: 'space-between', margin: '1rem 1.5rem 2rem' }}>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '45%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>Missing Manual Records</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', borderRadius: '0 0 8px 8px', color: '#ffffff' }}>
                                <Box sx={{ width: '60%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FF0000', borderRadius: '0 0 0 8px' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFA800' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>



                            </Box>
                        </Box>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '45%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', borderRadius: '0 0 8px 8px', color: '#ffffff' }}>
                                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end', color: '#B3B3B3', borderRadius: '0 0 0 8px' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>




                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ maxWidth: '100%', height: '60%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', padding: '0 1rem', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', }}>
                    <Box sx={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '19px', lineHeight: '21.85px' }}>DASHBOARD</Box>
                        <Box sx={{ width: '25%', color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                            <AiOutlinePlus size={26} style={{ margin: 'auto 0' }} />
                            <MdOutlineModeEdit size={26} style={{ margin: 'auto 0' }} />
                            <PiTrash size={26} style={{ margin: 'auto 0' }} />
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '30%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', borderRadius: '0 0 8px 8px', color: '#ffffff' }}>
                                <Box sx={{ width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FF0000', borderRadius: '0 0 0 8px' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFA800' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFD600', borderRadius: '0 0 8px 0' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>


                            </Box>
                        </Box>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '30%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', borderRadius: '0 0 8px 8px', color: '#ffffff' }}>
                                <Box sx={{ width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FF0000', borderRadius: '0 0 0 8px' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFA800' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFD600', borderRadius: '0 0 8px 0' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>


                            </Box>
                        </Box>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '30%', height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', borderRadius: '0 0 8px 8px', color: '#ffffff' }}>
                                <Box sx={{ width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FF0000', borderRadius: '0 0 0 8px' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFA800' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFD600', borderRadius: '0 0 8px 0' }}>
                                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                                    <Box sx={{ paddingBottom: '0.5rem' }}>
                                        <CiCircleAlert size={30} />
                                    </Box>
                                </Box>


                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '45%', height: '100%', display: 'flex', flexDirection: 'column', padding: '0.5rem' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', alignItems: 'flex-end' }}>
                                <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>0</Box>
                                <Box sx={{ paddingBottom: '0.5rem' }}>
                                    <CiCircleAlert size={30} />
                                </Box>

                            </Box>
                        </Box>
                        <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '45%', height: '100%', display: 'flex', flexDirection: 'column', padding: '0.5rem' }}>
                            <Box sx={{
                                maxWidth: '100%', height: '20%', display: 'flex',
                                justifyContent: 'space-between', alignItems: 'center', color: '#808080'
                            }}>
                                <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                                <Box><CiBellOff size={30} /></Box>
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                                <FaArrowUp />
                            </Box>
                            <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', alignItems: 'flex-end' }}>
                                <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>0</Box>
                                <Box sx={{ paddingBottom: '0.5rem' }}>
                                    <CiCircleAlert size={30} />
                                </Box>

                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box sx={{
                width: '30%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
                boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px'
            }}>
                <Box sx={{ width: '90%', height: '5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '19px', lineHeight: '21.85px' }}>KPI</Box>
                    <Box sx={{ width: '25%', color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                        <AiOutlinePlus size={26} style={{ margin: 'auto 0' }} />
                        <MdOutlineModeEdit size={26} style={{ margin: 'auto 0' }} />
                        <PiTrash size={26} style={{ margin: 'auto 0' }} />
                    </Box>
                </Box>
                <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '90%', height: '20%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        maxWidth: '100%', height: '20%', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                    }}>
                        <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                        <Box><CiBellOff size={30} /></Box>
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                        <FaArrowUp />
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', alignItems: 'flex-end', borderRadius: '0 0 8px 8px', padding: '0 0.5rem 0.5rem', color: '#B3B3B3' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>0</Box>
                        <Box sx={{ paddingBottom: '0.5rem' }}>
                            <CiCircleAlert size={30} />
                        </Box>

                    </Box>
                </Box>
                <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '90%', height: '20%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        maxWidth: '100%', height: '20%', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                    }}>
                        <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                        <Box><CiBellOff size={30} /></Box>
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                        <FaArrowUp />
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFA800', color: '#ffffff', borderRadius: '0 0 8px 8px', padding: '0 0.5rem 0.5rem' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                        <Box sx={{ paddingBottom: '0.5rem' }}>
                            <CiCircleAlert size={30} />
                        </Box>

                    </Box>
                </Box>
                <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '90%', height: '20%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        maxWidth: '100%', height: '20%', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                    }}>
                        <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                        <Box><CiBellOff size={30} /></Box>
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                        <FaArrowUp />
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', borderRadius: '0 0 8px 8px', color: '#ffffff' }}>
                        <Box sx={{ width: '40%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FF0000', borderRadius: '0 0 0 8px' }}>
                            <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                            <Box sx={{ paddingBottom: '0.5rem' }}>
                                <CiCircleAlert size={30} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFA800' }}>
                            <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                            <Box sx={{ paddingBottom: '0.5rem' }}>
                                <CiCircleAlert size={30} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '30%', height: '100%', display: 'flex', alignItems: 'flex-end', backgroundColor: '#FFD600', borderRadius: '0 0 8px 0' }}>
                            <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>1</Box>
                            <Box sx={{ paddingBottom: '0.5rem' }}>
                                <CiCircleAlert size={30} />
                            </Box>
                        </Box>


                    </Box>
                </Box>
                <Box sx={{ boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', width: '90%', height: '20%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{
                        maxWidth: '100%', height: '20%', display: 'flex',
                        justifyContent: 'space-between', alignItems: 'center', color: '#808080', padding: '0.5rem'
                    }}>
                        <Box sx={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: '400' }}>CO2 Emission</Box>
                        <Box><CiBellOff size={30} /></Box>
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '30%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', color: '#FF0000' }}>
                        <FaArrowUp />
                    </Box>
                    <Box sx={{ maxWidth: '100%', height: '50%', display: 'flex', alignItems: 'flex-end', color: '#ffffff', backgroundColor: '#FFA800', borderRadius: '0 0 8px 8px', padding: '0 0.5rem 0.5rem' }}>
                        <Box sx={{ fontFamily: 'Arial', fontWeight: '700', fontSize: '64px', height: 'fit-content' }}>2</Box>
                        <Box sx={{ paddingBottom: '0.5rem' }}>
                            <CiCircleAlert size={30} />
                        </Box>

                    </Box>
                </Box>


            </Box>
        </Box >
    )
}

export default AlertDashboard