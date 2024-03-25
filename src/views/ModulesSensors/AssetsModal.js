import React, { useEffect, useState } from 'react'
import styles from "./modulesandsensors.module.css";
import { MdOutlineClose } from 'react-icons/md';
import { FiPlus } from 'react-icons/fi';
import { createAsset, getAssets } from "../../services/assets";

const AssetsModal = ({ setView, associatedAssets, setAssociatedAssets, siteId }) => {
    const [assets, setAssets] = useState([{ id: '', name: '' }])
    const [selectedAsset, setSelectedAsset] = useState({})
    const [isActive, setIsActive] = useState(true)
    const [existingAssets, setExistingAssets] = useState([])

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const assetsFromApi = await getAssets();
                setExistingAssets(assetsFromApi);
                if (assetsFromApi.length > 0) {
                    // Preselecciona el primer asset como seleccionado y lo añade al estado de assets
                    const defaultAsset = { id: assetsFromApi[0].id, name: assetsFromApi[0].name };
                    setSelectedAsset(defaultAsset);
                    // Asegúrate de que assets incluya este asset predeterminado
                    setAssets([defaultAsset]);
                }
            } catch (error) {
                console.error("Error al obtener los assets: ", error);
            }
        };
        fetchAssets();
    }, []);

    const handleChange = (index, event) => {
        const selectedId = Number(event.target.value);
        const selectedAsset = existingAssets.find(asset => asset.id === selectedId);

        if (selectedAsset) {
            setAssets(prevAssets => prevAssets.map((asset, idx) =>
                idx === index ? { ...selectedAsset } : asset
            ));
        }
    };




    const addAsset = () => {
        // Añade un nuevo objeto con id y name vacíos o predeterminados a la lista de assets
        setAssets(prevAssets => [
            ...prevAssets,
            { id: '', name: '' } // Aquí puedes poner valores predeterminados si lo prefieres
        ]);
    };
    const addAssociatedAssets = async () => {
        const selectedAssetsToAdd = assets.filter(asset => asset.id);

        const createAssetPromises = selectedAssetsToAdd.map(asset =>
            createAsset(asset.id, siteId)
        );
        try {

            const responses = await Promise.all(createAssetPromises);

            console.log(responses);

            setAssociatedAssets(prevAssets => [
                ...prevAssets,
                ...selectedAssetsToAdd
            ]);
        } catch (error) {
            console.error("Error al crear o asociar assets", error);
        }
        setView('');
    };





    return (
        <div className={styles.connectedModalBackground}>
            <div className={styles.connectedModalContainer}>
                <div className={styles.title}>
                    <p>ASSOCIATED ASSETS</p>
                    <MdOutlineClose
                        size={26}
                        className={styles.titleIcon}
                        onClick={() => setView('')}
                    />
                </div>
                <div className={styles.connectedTitle}>
                    <p>ADD AN ASSET</p>

                </div>
                <div className={styles.addAssets}>
                    <div className={styles.module}>
                        {assets.map((asset, index) =>
                            <div key={index}>
                                <p>Asset {index + 1}</p>
                                <select onChange={(e) => handleChange(index, e)} value={asset.id || ''}>
                                    {existingAssets.map((optionAsset, index) => (
                                        <option key={index} value={optionAsset.id}>
                                            {optionAsset.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        <FiPlus size={80} color={"#cccccc"} className={styles.backgroundPlus} onClick={addAsset} />

                    </div>
                </div>


                <div className={styles.modalFooter}>
                    <button onClick={() => setView(false)}>Cancel</button>
                    <button style={{ backgroundColor: isActive ? "#0069c8" : "#b3b3b3" }} onClick={addAssociatedAssets}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AssetsModal