
import React, { useEffect, useRef, useState } from 'react'
import { CiMenuKebab } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { PiTrash } from 'react-icons/pi';
import { MdOutlineModeEdit } from 'react-icons/md';
import { FiCalendar } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { axisClasses } from '@mui/x-charts';
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import Checklist from '@editorjs/checklist'
import Embed from '@editorjs/embed'
import Link from '@editorjs/link'
import Quote from '@editorjs/quote'
import Raw from '@editorjs/raw'
import SimpleImage from '@editorjs/simple-image'
import styles from './reports.module.css'
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
    const [view, setView] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const editorRef = useRef(null);
    const [editorHeight, setEditorHeight] = useState('auto');
    const ejInstance = useRef();
    const initEditor = () => {
        const editor = new EditorJS({

            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            tools: {
                header: Header,
                list: List,
                checklist: Checklist,
                embed: Embed,
                link: Link,
                quote: Quote,
                raw: Raw,
                image: SimpleImage,
            },
            data: {
                blocks: [
                    {
                        type: "header",
                        data: {
                            text: "Kurita Site",
                            level: 1
                        }
                    },
                    {
                        type: "paragraph",
                        data: {
                            text: " Av. Alcalde Barnils, 64, edificio Testa, bloque D, 08174 Sant Cugat del Vallès, Barcelona"
                        }
                    },
                    {
                        type: "list",
                        data: {
                            style: "unordered",
                            items: [
                                "Kurita item 1",
                                "Kurita item 2",
                                "Kurita item 3"
                            ]
                        }
                    },
                    {
                        type: "image",
                        data: {
                            url: "https://www.kurita.eu/wp-content/uploads/2022/12/KIHPR-video_thumbnail_en-min-1024x573.png", // URL de la imagen inicial
                            caption: "Caption de la imagen",
                            withBorder: false,
                            withBackground: false,
                            stretched: false
                        }
                    },
                    {
                        type: "checklist",
                        data: {
                            items: [
                                {
                                    text: "Elemento de checklist 1",
                                    checked: true
                                },
                                {
                                    text: "Elemento de checklist 2",
                                    checked: false
                                }
                            ]
                        }
                    },
                    {
                        type: "quote",
                        data: {
                            text: "Este es un ejemplo de una cita.",
                            caption: "Autor"
                        }
                    },
                    {
                        type: "embed",
                        data: {
                            service: "youtube",
                            source: "https://www.youtube.com/watch?v=E2viMhP7i90",
                            embed: "https://www.youtube.com/embed/E2viMhP7i90",
                            width: 580,
                            height: 320,
                            caption: "KURITA EUROPE"
                        }
                    },
                    {
                        type: "raw",
                        data: {
                            html: "<p>Este es un bloque de HTML crudo</p>"
                        }
                    }

                ]
            },
            onChange: async () => {
                let content = await editor.saver.save();

                console.log(content);
            }
        })
    }
    useEffect(() => {
        const updateEditorHeight = () => {
            if (editorRef.current) {
                const width = editorRef.current.offsetWidth;
                const height = width * 297 / 210; // Proporción A4
                setEditorHeight(`${height}px`);
            }
        };

        window.addEventListener('resize', updateEditorHeight);
        updateEditorHeight(); // Llamada inicial para ajustar la altura

        return () => {
            window.removeEventListener('resize', updateEditorHeight);
        };
    }, []);
    useEffect(() => {
        if (!view && !ejInstance.current) {
            initEditor();
        }

        return () => {
            if (ejInstance.current) {
                ejInstance.current.destroy();
                ejInstance.current = null;
            }
        };
    }, [view]);
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    return (
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly' }} onClick={() => setView(false)}>
            {view && <>
                <div style={{
                    width: '500px', height: '223px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                    boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', padding: '1rem'
                }}>
                    <div style={{ maxWidth: '100%', height: '25%', display: 'flex', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 1rem' }}>
                        <div style={{ fontSize: '30px', fontFamily: 'Arial' }}>RAPPORT PERIODIQUE</div>
                        <div style={{ width: '25%', color: '#B3B3B3', display: 'flex', justifyContent: 'flex-end', alignContent: 'center' }}>
                            <MdOutlineModeEdit size={26} style={{ margin: 'auto 0' }} />
                            <PiTrash size={26} style={{ margin: 'auto 0' }} />
                            <CiMenuKebab size={26} style={{ margin: 'auto 0' }} />
                        </div>
                    </div>
                    <div style={{ maxWidth: '100%', height: '10%', padding: '0 1rem', fontSize: '18px', color: '#B3B3B3' }}>My page name</div>
                    <div style={{ width: '100%', height: '50%', display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '60%', height: '100%' }}>
                            <div style={{ width: '100%', height: '25%', display: 'flex', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <div style={{ width: '40%', textAlign: 'left', color: '#808080', fontSize: '14px' }}>Address</div>
                                <div style={{ width: '60%', textAlign: 'left', fontSize: '14px', color: '#B3B3B3' }}>Industrial Zone</div>
                            </div>
                            <div style={{ width: '100%', height: '25%', display: 'flex', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <div style={{ width: '40%', textAlign: 'left', color: '#808080', fontSize: '14px' }}>Contact Person</div>
                                <div style={{ width: '60%', textAlign: 'left', fontSize: '14px', color: '#B3B3B3' }}>Key Account Manager
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '25%', display: 'flex', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <div style={{ width: '40%', textAlign: 'left', color: '#808080', fontSize: '14px' }}>Telephone</div>
                                <div style={{ width: '60%', textAlign: 'left', fontSize: '14px', color: '#B3B3B3' }}>ipek.ozturk@kurita-water.com
                                </div>
                            </div>
                            <div style={{ width: '100%', height: '25%', display: 'flex', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                <div style={{ width: '40%', textAlign: 'left', color: '#808080', fontSize: '14px' }}>E-mail</div>
                                <div style={{ width: '60%', textAlign: 'left', fontSize: '14px', color: '#B3B3B3' }}>xxxxxx</div>
                            </div>
                        </div>
                        <div style={{ width: '30%', height: '100%', borderRadius: '8px' }}>
                            <img src={'/images/site2.png'} width='100%' height='100%' />
                        </div>
                    </div>
                </div >
                <div style={{
                    width: '500px', height: '223px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                    boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px', color: '#B3B3B3', padding: '1rem'
                }}>
                    <FaPlus size={26} />
                </div >
            </>}
            {!view &&
                <div style={{ width: '90%', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ width: '100%', height: '5vh', display: 'flex', alignItems: 'center' }}>
                        <div style={{ width: '50%', fontWeight: '700', fontSize: '19px' }}>My Analysis - VOLVIC CHANCET 1</div>
                        <div style={{ width: '25%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center' }}>17/05/2023    -    17/05/2023 <FiCalendar size={26} style={{ color: '#0069C8' }} /></div>
                        <div style={{ width: '25%', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: '#808080' }}>Search file<CiSearch size={26} style={{ color: '#0069C8' }} /></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ width: '70%', margin: 'auto', minHeight: '75vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', boxShadow: "2px 5px 10px 5px #00000033", borderRadius: '8px' }}>
                            <div style={{ width: '100%', height: '10%', backgroundColor: '#0069C8', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <img src="/images/kuritalogowhite.svg" alt="kuritalogo" height='70%' />
                                <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff', fontSize: '14px' }}>
                                    <div>RAPPORT PERIODIQUE 1</div>
                                    <div>19/05/2023 - 18/06/2023</div>
                                </div>
                                <CiMenuKebab size={26} style={{ color: '#ffffff' }} />
                            </div>
                            <div id="editorjs" ref={editorRef} className={styles.editorjs} style={{ height: editorHeight }}></div>
                            <div style={{ width: '100%', height: '5%', display: 'flex', backgroundColor: '#0069C8', justifyContent: 'center', alignItems: 'center', color: '#ffffff', borderRadius: '0 0 8px 8px' }}>
                                <IoMdArrowDropleft size={26} onClick={goToPreviousPage} />
                                <div>{currentPage} / {totalPages}</div>
                                <IoMdArrowDropright size={26} onClick={goToNextPage} />
                            </div>
                        </div>

                    </div>

                </div>}
        </div >
    )
}

export default ReportSite