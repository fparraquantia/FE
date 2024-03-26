import React from 'react';
import  { useMemo, useState } from 'react'
import { MdOutlineModeEdit } from 'react-icons/md'
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { TfiSave, TfiMenuAlt } from 'react-icons/tfi'
import { PiTrash } from 'react-icons/pi'
import { BsArrowsAngleExpand } from 'react-icons/bs'
import { Box } from '@mui/material'
import asset1 from './asset1.png'
import asset2 from './asset2.png'
import asset3 from './asset3.png'
import asset4 from './asset4.png'
import asset5 from './asset5.png'
import asset6 from './asset6.png'
import graph from './graph.png'
import synoptic11 from './synoptic11.png'
import synoptic12 from './synoptic12.png'
import synoptic21 from './synoptic21.png'
import synoptic22 from './synoptic22.png'
import boiler from './boiler.png'
import cetamine from './cetamine.png'
import alerticon from './alerticon.svg'
import close from './close.png'
import Flow from './Flow'



const Synoptic = () => {
    const [showDetails, setShowDetails] = useState(false)
    const [showAssetsLibrary, setShowAssetsLibrary] = useState(false);
    const [showProcessData, setShowProcessData] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState('');


    return (
        <Box sx={{ width: '100%', height: '100%', marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{
                width: '70%', maxHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff', boxShadow: '2px 2px 10px 5px #00000033',
                borderRadius: '8px', padding: '1rem',
            }}>
                <Box sx={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #cccccc44' }}>
                    <Box component="p" sx={{ fontWeight: '700', fontWeight: '700' }} >CETAMINE</Box>
                    <Box sx={{ width: '80%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', color: '#ccc', }}>
                        <Box sx={{
                            width: '20%', display: 'flex', justifyContent: 'space-between', alignContent: 'center', backgroundColor: '#cccccc44',
                            borderRadius: '8px', padding: '0.3rem'
                        }}>
                            <Box sx={{ textAlign: 'center' }}>BOILER</Box>
                            <Box>
                                <BiSolidDownArrow size={16} />
                            </Box>
                        </Box>
                        <AiOutlinePlus size={26} />
                        <TfiSave size={26} />
                        <TfiMenuAlt size={26} />
                        <PiTrash size={26} onClick={() => setSelectedAsset(false)} />
                    </Box>
                </Box>
                <Box sx={{ width: '100%', height: '87%', '&:hover': { cursor: 'pointer' } }} onClick={() => { setSelectedAsset(true); setShowDetails(!showDetails) }}>
                    <img src={cetamine} height={'100%'} width={'100%'} />

                    {/* {selectedAsset == ! 'boiler' ? <img src={synopticimg} height={'100%'} width={'100%'} /> :
                        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                <Box sx={{ width: '45%', height: '100%', fontSize: '1.3rem', fontWeight: '700' }}>
                                    <p>MODULEID.1 - FEED WATER CONSUMPTION</p>
                                </Box>
                                <Box sx={{ width: '20%', height: '100%' }}></Box>
                                <Box sx={{ width: '20%', height: '100%' }}></Box>
                                <Box sx={{
                                    width: '5%', height: '100%', display: 'flex', justifyContent: 'center',
                                    alignContent: 'center'
                                }}>
                                    <BsArrowsAngleExpand size={26} style={{ margin: 'auto', color: '#b3b3b3' }} />
                                </Box>
                            </Box>
                            <Box sx={{ width: '100%', height: '80%', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ width: '100%', height: '49%' }}>
                                        <img src={synoptic11} height={'100%'} />
                                    </Box>
                                    <Box sx={{ width: '100%', height: '49%' }}>
                                        <img src={synoptic12} height={'100%'} />
                                    </Box>
                                </Box>
                                <Box sx={{ width: '55%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <Box sx={{ width: '100%', height: '49%' }}>
                                        <img src={synoptic21} height={'100%'} />
                                    </Box>
                                    <Box sx={{ width: '100%', height: '49%' }}>
                                        <img src={synoptic22} height={'100%'} />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>} */}
                    {/* <Flow /> */}
                </Box>
                {selectedAsset &&
                    <Box sx={{
                        position: 'fixed', top: '50%', left: '50%', translate: '-50% -50%', width: '80%', height: '60vh',
                        display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#ffffff', boxShadow: '2px 2px 10px 5px #00000033',
                        borderRadius: '8px', padding: '1rem'
                    }}>
                        <Box sx={{ width: '100%', height: '15%', display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                            <Box sx={{ width: '45%', height: '100%', fontSize: '20px', fontWeight: '700', color: '#808080' }}>
                                <p>id. S01254686 – Flowmeter BD</p>
                            </Box>
                            <Box sx={{ width: '20%', height: '100%' }}></Box>
                            <Box sx={{ width: '20%', height: '100%' }}></Box>
                            <Box sx={{
                                width: '5%', height: '100%', display: 'flex', justifyContent: 'center',
                                alignContent: 'center'
                            }} onClick={() => { setSelectedAsset(!selectedAsset); console.log(selectedAsset) }} >
                                <img src={close} width={'20px'} height={'20px'} />
                            </Box>
                        </Box>
                        <Box sx={{ width: '100%', height: '80%', display: 'flex', justifyContent: 'space-between' }}>
                            <Box sx={{ width: '40%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '100%', height: '49%' }}>
                                    <img src={synoptic11} height={'100%'} />
                                </Box>
                                <Box sx={{ width: '100%', height: '49%' }}>
                                    <img src={synoptic12} height={'100%'} />
                                </Box>
                            </Box>
                            <Box sx={{ width: '55%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '100%', height: '49%' }}>
                                    <img src={synoptic21} height={'100%'} />
                                </Box>
                                <Box sx={{ width: '100%', height: '49%' }}>
                                    <img src={synoptic22} height={'100%'} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>}
            </Box>
            <Box sx={{ width: '27%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <Box sx={{
                    maxWidth: '100%',
                    height: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    backgroundColor: '#ffffff',
                    boxShadow: '2px 2px 10px 5px #00000033',
                    borderRadius: '8px',
                    padding: '0.5rem 1rem',
                    marginBottom: '1rem'
                }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Box component="p" sx={{ fontWeight: '700' }}>ASSETS & STREAMS</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                            {showAssetsLibrary ? (
                                <BiSolidUpArrow size={16} onClick={() => setShowAssetsLibrary(!showAssetsLibrary)} />
                            ) : (
                                <BiSolidDownArrow size={16} onClick={() => setShowAssetsLibrary(!showAssetsLibrary)} />
                            )}
                        </Box>
                    </Box>

                    {showAssetsLibrary && <Box>
                        <Box>Drag the item to the workspace</Box>
                        <Box>Assets</Box>
                        <Box sx={{
                            maxWidth: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center',
                            flexWrap: 'wrap', gap: '2rem', padding: '2rem'
                        }}>
                            <Box sx={{
                                width: '6rem', height: '6rem', boxShadow: '2px 2px 5px 5px #00000033',
                                borderRadius: '8px'
                            }}>
                                <img src={boiler} width={'100%'} alt='assets' />
                            </Box>
                            <Box sx={{
                                width: '6rem', height: '6rem', boxShadow: '2px 2px 5px 5px #00000033',
                                borderRadius: '8px'
                            }}>
                                <img src={asset2} width={'100%'} alt='assets' />
                            </Box>
                            <Box sx={{
                                width: '6rem', height: '6rem', boxShadow: '2px 2px 5px 5px #00000033',
                                borderRadius: '8px'
                            }}>
                                <img src={asset3} width={'100%'} alt='assets' />
                            </Box>
                            <Box sx={{
                                width: '6rem', height: '6rem', boxShadow: '2px 2px 5px 5px #00000033',
                                borderRadius: '8px'
                            }}>
                                <img src={asset4} width={'100%'} alt='assets' />
                            </Box>
                            <Box sx={{
                                width: '6rem', height: '6rem', boxShadow: '2px 2px 5px 5px #00000033',
                                borderRadius: '8px'
                            }}>
                                <img src={asset5} width={'100%'} alt='assets' />
                            </Box>
                            <Box sx={{
                                width: '6rem', height: '6rem', boxShadow: '2px 2px 5px 5px #00000033',
                                borderRadius: '8px'
                            }}>
                                <img src={asset6} width={'100%'} alt='assets' />
                            </Box>

                        </Box>
                    </Box>}
                </Box>
                <Box sx={{
                    maxWidth: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    alignContent: 'center', backgroundColor: '#ffffff', boxShadow: '2px 2px 10px 5px #00000033', borderRadius: '8px',
                    padding: ' 0.5rem 1rem', marginBottom: '1rem'
                }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Box component="p" sx={{ fontWeight: '700' }} >SELECTION DETAILS</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                            {showDetails ? <BiSolidUpArrow size={16} onClick={() => setShowDetails(!showDetails)} /> : <BiSolidDownArrow size={16} onClick={() => setShowDetails(!showDetails)} />}
                        </Box>
                    </Box>

                    {showDetails
                        &&
                        <>
                            <Box sx={{ maxWidth: '100%', height: 'fit-content', display: 'flex', justifyContent: 'space-between' }}>
                                <Box sx={{ width: '95%', height: '100%', display: 'flex', flexDirection: 'column', }}>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>id</Box>
                                        <Box sx={{ width: '60%', }}>S01254686 </Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Name</Box>
                                        <Box sx={{ width: '60%', }}>Controller</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Kurita Brand</Box>
                                        <Box sx={{ width: '60%', }}>S. sensing ENG</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Sensor name</Box>
                                        <Box sx={{ width: '60%', }}>Flowmeter BD</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Parameter name</Box>
                                        <Box sx={{ width: '60%', }}>Blowdown flowrate</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Unit​</Box>
                                        <Box sx={{ width: '60%', }}>m³/h</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Type​</Box>
                                        <Box sx={{ width: '60%', }}>real</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Corrective coefficient</Box>
                                        <Box sx={{ width: '60%', }}>none</Box>
                                    </Box>
                                    <Box sx={{ minHeight: '3vh', width: '100%', display: 'flex', color: '#ccc' }}>
                                        <Box sx={{ width: '40%', textAlign: 'end', paddingRight: '0.5rem', }}>Installation date</Box>
                                        <Box sx={{ width: '60%', }}>01/10/2023</Box>
                                    </Box>

                                </Box>
                                <Box sx={{ width: '3%', height: '100%', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                    <Box component="div" sx={{
                                        width: '40%', height: '18%', margin: 'auto', backgroundColor: '#0069C8', borderRadius: '5px'
                                    }}></Box>
                                </Box>
                            </Box>
                        </>
                    }

                </Box>
                <Box sx={{
                    maxWidth: '100%',
                    height: 'fit-content',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    backgroundColor: '#ffffff',
                    boxShadow: '2px 2px 10px 5px #00000033',
                    borderRadius: '8px',
                    padding: ' 0.5rem 1rem',
                    marginBottom: '1rem'
                }}>
                    <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignContent: 'center' }}>
                        <Box component="p" sx={{ fontWeight: '700' }}>PROCESS DATA</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#ccc' }}>
                            {showProcessData ? (
                                <BiSolidUpArrow size={16} onClick={() => setShowProcessData(!showProcessData)} />
                            ) : (
                                <BiSolidDownArrow size={16} onClick={() => setShowProcessData(!showProcessData)} />
                            )}
                        </Box>
                    </Box>
                    {showProcessData
                        &&
                        <>
                            <Box sx={{ maxWidth: '100%', height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0 2rem', color: '#B3B3B3' }}>

                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                                    <Box>
                                        Last data received
                                    </Box>
                                    <Box>25/10/2023 18:10</Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <Box>
                                        Alert Status
                                    </Box>
                                    <Box sx={{}}>  <img src={alerticon} height={'100%'} /></Box>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>

                                    <Box>
                                        Number of alerts
                                    </Box>
                                    <Box>2</Box>
                                </Box>

                            </Box>

                            <Box sx={{ objectFit: 'contain', height: 'fit-content' }}>
                                <img src={graph} alt='graph' width={'100%'} />
                            </Box>


                        </>
                    }
                </Box>

            </Box>

        </Box >
    )
}

export default Synoptic