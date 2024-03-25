import React, { useState } from "react";
import styles from "./modulesandsensors.module.css";
import { MdOutlineClose } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { connectModule } from "./apiModules";

const ConnectedModal = ({ setView, modules, setModules, siteId }) => {
    const [isActive, setIsActive] = useState('false')
    const [inputId, setInputId] = useState("");
    const [status, setStatus] = useState("connect");

    const mockModules = [
        {
            id: 'KC012345678',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: '23/02/2024',
            communication: 'GPRS'
        }, {
            id: 'KC450096322',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: '23/02/2024',
            communication: 'GPRS'
        }, {
            id: 'KC636335728',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: '23/02/2024',
            communication: 'GPRS'
        }, {
            id: 'KC432152424',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: '23/02/2024',
            communication: 'GPRS'
        }, {
            id: 'KC527567458',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: '23/02/2024',
            communication: 'GPRS'
        }, {
            id: 'KC178019531',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: '23/02/2024',
            communication: 'GPRS'
        }]
    const addModule = () => {
        if (inputId.trim() === "") {
            setView('')
            return;
        }
        const moduleExists = modules.some(module => module.id === inputId);
        if (!moduleExists) {
            const newModule = { id: inputId, status: 'connected', name: 'Kurita Controller' };
            setModules([...modules, newModule]);
            setInputId("");
            setIsActive(true);
            setView('')
        } else {

            setStatus("error");
        }
    };
    const handleInputChange = (e) => {
        setInputId(e.target.value);
        setStatus("connect");
    };
    const handleConnect = () => {
        const moduleExists = mockModules.some(module => module.id === inputId);
        if (moduleExists) {
            // Si el módulo existe, cambia primero a 'success'.
            setStatus("success");
            // Luego, asumiendo que quieres simular un proceso de conexión, cambia a 'connected'.
            setTimeout(() => {
                // Aquí, además de cambiar el estado a 'connected', deberías actualizar el estado de este módulo en tu lista de módulos.
                // Esto es solo un ejemplo de cómo podrías hacerlo.
                const updatedModules = mockModules.map(module =>
                    module.id === inputId ? { ...module, status: 'connected' } : module
                );
                // setModules(updatedModules);
                setStatus("connected");
                connectModule(inputId, siteId)

            }, 2000); // Este retraso simula el tiempo de "conexión".
        } else {
            // Manejar el caso de no encontrar el módulo.
            setStatus("error");
        }
    };
    const addNewModulePlaceholder = () => {
        if (inputId === '') {
            return
        }
        const newModulePlaceholder = {
            id: '',
            status: 'disconnect',
            name: 'Kurita Controller',
            brand: 'Kurita BX',
            model: 'M102',
            date: new Date().toLocaleDateString(),
            communication: 'GPRS'
        };
        setModules([...modules, newModulePlaceholder])
    };

    return (
        <div className={styles.connectedModalBackground}>
            <div className={styles.connectedModalContainer}>
                <div className={styles.title}>
                    <p>CONNECTED MODULES</p>
                    <MdOutlineClose
                        size={26}
                        className={styles.titleIcon}
                        onClick={() => setView('')}
                    />
                </div>
                <div className={styles.connectedTitle}>
                    <p>ADD MODULE ID </p>

                </div>
                <div className={styles.connectedModulesList}>
                    {modules?.map((module, index) => (
                        <div key={index} className={styles.module}>
                            <p>Module ID</p>
                            <div>
                                <p>{module.device}</p>
                                <button
                                    style={{ backgroundColor: "#B7E9A7" }}
                                >
                                    CONNECTED
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className={styles.module}>
                        <p>Module ID</p>
                        <div>
                            <input
                                type='text'
                                value={inputId}
                                onChange={handleInputChange}
                            />
                            {status === "connect" && (
                                <button
                                    onClick={handleConnect}
                                    style={{
                                        backgroundColor: inputId !== "" ? "#0069c8" : "#b3b3b3",
                                    }}
                                >
                                    CONNECT
                                </button>
                            )}
                            {status === "error" && (
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                    }}
                                >
                                    <button
                                        style={{ backgroundColor: "#FF0000" }}

                                    >
                                        ERROR
                                    </button>
                                    <p
                                        style={{
                                            position: "absolute",
                                            top: "50px",
                                            fontSize: "13px",
                                            color: "#ff0000",
                                        }}
                                    >
                                        Module not found
                                    </p>
                                </div>
                            )}
                            {status === "success" && (
                                <button
                                    style={{ backgroundColor: "#78D700" }}
                                >
                                    SUCCESS
                                </button>
                            )}
                            {status === "connected" && (
                                <button
                                    style={{ backgroundColor: "#B7E9A7" }}
                                >
                                    CONNECTED
                                </button>
                            )}
                        </div>
                    </div>
                    <div>
                        <FiPlus size={80} color={"#cccccc"} className={styles.backgroundPlus} onClick={addNewModulePlaceholder} />
                    </div>

                </div>

                <div className={styles.modalFooter}>
                    <button onClick={() => setView(false)}>Cancel</button>
                    <button onClick={addModule} style={{ backgroundColor: isActive ? "#0069c8" : "#b3b3b3" }}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConnectedModal;
