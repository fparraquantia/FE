import React, { useEffect, useState } from "react";
import styles from "./modulesandsensors.module.css";
import { MdOutlineClose } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { updateModuleProperties } from "./apiModules";
import { updateAssetsProperties } from "../../services/assets";

const EditModal = ({ setView, currentModule, currentAsset, setCurrentModule, setCurrentAsset, viewDetails, setViewDetails, assetsProperties, setSensors }) => {
    const [isActive, setIsActive] = useState(false)
    const [editedModule, setEditedModule] = useState(currentModule)
    const [editedAsset, setEditedAsset] = useState([])

    useEffect(() => {

        setEditedAsset(assetsProperties);
    }, [assetsProperties]);

    const handleChangeModule = (param, newValue) => {
        setEditedModule({ ...editedModule, [param]: newValue });
        setIsActive(true);
    };
    const handleChangeAsset = (assetName, propertyName, value) => {
        setEditedAsset(prevEdited => {
            return prevEdited.map(asset => {
                if (asset.name === assetName) {
                    const updatedProperties = asset.properties.map(prop => {
                        if (prop.property === propertyName) {

                            const newValue = Number(value);
                            return { ...prop, value: newValue };
                        }
                        return prop;
                    });
                    return { ...asset, properties: updatedProperties };
                }
                return asset;
            });
        });
        setIsActive(true);
    };





    const editModule = async () => {
        if (editedModule.id) {
            try {
                const updatedModule = await updateModuleProperties(editedModule, editedModule.id);
                setCurrentModule(updatedModule);
                setView('')
                setViewDetails('')
                setSensors([])
            } catch (error) {
                console.error("Error al actualizar el módulo: ", error);
            }
        }
    };
    const editAsset = async () => {
        editedAsset.forEach(async (asset) => {
            try {
                const propertiesList = asset.properties.filter(prop => prop.value !== null).map(prop => ({
                    id: prop.id,
                    value: Number(prop.value)
                }));

                const body = {
                    name: asset.name === null ? '' : asset.name,
                    brand: asset.brand === null ? '' : asset.brand,
                    propertiesList: propertiesList // Asegúrate de que la estructura del body coincida con lo esperado por tu backend.
                };

                // Usa asset.id para enviar el ID correcto del asset que se está actualizando.
                const updatedAsset = await updateAssetsProperties(currentAsset.id, body);

            } catch (error) {
                console.error("Error al actualizar el asset: ", error);
            }
        });

        setView('');
    };

    console.log(assetsProperties)


    return (
        <div className={styles.connectedModalBackground}>
            <div className={styles.connectedModalContainer}>
                <div className={styles.title}>
                    <p>Selection Details</p>
                    <MdOutlineClose
                        size={26}
                        className={styles.titleIcon}
                        onClick={() => setView("")}
                    />
                </div>
                <div className={styles.connectedTitle}>
                    <p>{viewDetails === 'modules' ? 'MODULE' : viewDetails === 'sensors' ? 'SENSORS' : 'ASSETS'} INFORMATION</p>
                </div>
                {viewDetails === 'modules' && <div className={styles.editSection}>
                    <div>
                        <p>ID</p>
                        <p style={{ backgroundColor: '#ccc', borderRadius: '4px', padding: '0.5rem 0' }}>{editedModule.id}</p>
                    </div>
                    <div>
                        <p>Name</p>
                        <input value={editedModule.name} onChange={(e) => handleChangeModule('name', e.target.value)} />
                    </div>
                    <div>
                        <p>Brand</p>
                        <select value={editedModule.brand} onChange={(e) => handleChangeModule('brand', e.target.value)}>
                            <option value="Kurita DX">Kurita DX</option>
                            <option value="Kurita ZX">Kurita ZX</option>
                            <option value="Microcom">Microcom</option>
                        </select>
                    </div>
                    <div>
                        <p>Model</p>
                        <select value={editedModule.model} onChange={(e) => handleChangeModule('model', e.target.value)}>
                            <option value="M102">M102</option>
                            <option value="M103">M103</option>
                            <option value="M104">M104</option>
                        </select>
                    </div>

                    <div>
                        <p>Installation Date</p>
                        <p>{editedModule.date}</p>
                    </div>
                    <div>
                        <p>Communication</p>
                        <p style={{ backgroundColor: '#ccc', borderRadius: '4px', padding: '0.5rem 0' }}>{currentModule.communication}</p>
                    </div>
                    <div>
                        <p>Status</p>
                        <p style={{ backgroundColor: '#B7E9A7', color: '#808080', borderRadius: '4px', padding: '0.5rem 0' }}>{currentModule.status}</p>
                    </div>
                </div>}
                {viewDetails === 'sensors' && <div className={styles.editSection}>
                    <div><p>ID</p><p>{editedModule.endPoint}</p></div>

                    <div>
                        <p>Name</p>
                        <p>{editedModule.name}</p>
                    </div>
                    <div><p>Brand</p><p>{editedModule.brand ? editedModule.brand : 'BrandName'}</p></div>
                    <div><p>Parameter</p><p>{editedModule.parentMeter}</p></div>
                    <div><p>Unit</p><p>{editedModule.parameterUnitId}</p></div>
                    <div><p>Aggregation</p><p>{editedModule.aggregation}</p></div>
                    <div><p>Corrective coefficient</p><p></p></div>
                    <div><p>Asset</p><p></p></div>
                    <div><p>Stream</p><p></p></div>

                </div>}
                {viewDetails === 'assets' && (
                    <div className={styles.editSection} >
                        {assetsProperties.map((asset, assetIndex) => (
                            <React.Fragment key={assetIndex} style={{ height: '100%' }}>
                                <div style={{ margin: '20px 0' }}><p>Asset Name:</p><p>{asset.name}</p></div>
                                {asset.properties?.map((prop, propIndex) => {
                                    // Busca el asset actualizado y la propiedad específica en editedAsset
                                    const editedAssetIndex = editedAsset.findIndex(ea => ea.name === asset.name);
                                    let currentValue = prop.value; // Valor por defecto
                                    if (editedAssetIndex !== -1) {
                                        const editedPropIndex = editedAsset[editedAssetIndex].properties.findIndex(ep => ep.property === prop.property);
                                        if (editedPropIndex !== -1) {
                                            currentValue = editedAsset[editedAssetIndex].properties[editedPropIndex].value;
                                        }
                                    }
                                    return (
                                        <div key={propIndex} style={{ width: '100%', height: '100%', margin: '10px 0' }}>
                                            <p>{
                                                prop.property
                                                    .replace(/_/g, ' ')
                                                    .split(' ')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')
                                            }</p>
                                            <input
                                                type="text"
                                                value={currentValue || ''}
                                                onChange={(e) => handleChangeAsset(asset.name, prop.property, e.target.value)}
                                                style={{ backgroundColor: '#f7fafd', borderRadius: '4px', padding: '0.5rem' }}
                                            />
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}

                    </div>
                )}
                {viewDetails !== 'sensors' &&
                    <div className={styles.modalFooter}>
                        <button onClick={() => setView(false)}>Cancel</button>
                        <button style={{ backgroundColor: isActive ? "#0069c8" : "#b3b3b3" }} onClick={viewDetails === 'modules' ? editModule : editAsset}>
                            Edit
                        </button>
                    </div>}
            </div>
        </div>
    );
};

export default EditModal;
