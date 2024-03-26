import React from 'react';

import { useEffect, useState } from 'react';
import ConnectedModal from './ConnectedModal';
import styles from './modulesandsensors.module.css'
import { FiPlus } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import sensorImg from './sensor.png'
import boilerImg from './boiler.png'
import exchangerImg from './heatexchanger.png'
import EditModal from './EditModal';
import AssetsModal from './AssetsModal';
import { getModules, getSensors } from './apiModules';
import { getAssetsBySite, getAssetsProperties } from "../../services/assets";
import { useParams } from "react-router-dom";

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
const mockSensors = [
  { name: 'F365' },
  { name: '4170' },
  { name: '4555' },
  { name: 'Meter' },
  { name: 'Meter A10 A12' },
  { name: 'Cd A10' },
  { name: 'CD A12' }
]

function ModulesSensors() {
  const { id } = useParams();
  const siteId = id;
  const [view, setView] = useState('')
  const [viewDetails, setViewDetails] = useState('');
  const [currentModule, setCurrentModule] = useState({});
  const [currentSensor, setCurrentSensor] = useState('');
  const [currentAsset, setCurrentAsset] = useState('')
  const [assetsProperties, setAssetsProperties] = useState([])
  const [modules, setModules] = useState([]);
  const [sensors, setSensors] = useState([])
  const [associatedAssets, setAssociatedAssets] = useState([])

  //Conectado
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const connectedModules = await getModules(siteId);
        setModules(connectedModules);
        const associatedAssets = await getAssetsBySite(siteId);
        setAssociatedAssets(associatedAssets);
      } catch (error) {
        console.error("Error al obtener los modulos: ", error);
      }
    };
    fetchModules();
  }, [currentModule, siteId]);

  const fetchSensors = async (moduleId) => {
    try {
      const sensors = await getSensors(moduleId);
      setSensors(sensors);
    } catch (error) {

    }
  }
  const fetchAssetProperties = async (assetId) => {
    try {
      const properties = await getAssetsProperties(assetId);
      properties.properties = properties.properties.map((property) => {return {id: property.id, property: property.property.replaceAll('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' '), value: property.value}})
      setAssetsProperties(properties);


    } catch (error) {

    }
  }
  const showSensors = (module) => {
    setViewDetails('modules')
    setCurrentModule(module)
    fetchSensors(module.id)
    setCurrentAsset('')
    setCurrentSensor('')
  }
  const handleCurrentSensor = (sensor) => {
    setViewDetails('sensors')
    setCurrentSensor(sensor)
  }
  const handleCurrentAssets = (asset) => {
    console.log("Selected asset", asset);
    setViewDetails('assets')
    setCurrentAsset(asset)
    fetchAssetProperties(asset.id)
  }


  return (
    <>
      <div className={styles.modulesContainer}>
        <div className={styles.connectedModules}>
          <div className={styles.title}>
            <span className={styles.blueDot}></span><p>CONNECTED MODULES</p>
            <FiPlus className={styles.titleIcon} onClick={() => setView('connect')} />
          </div>
          {modules?.map((module, index) => (
            <div key={index} className={styles.listModule} onClick={() => showSensors(module)}
              style={{ backgroundColor: currentModule && currentModule.id === module.id ? '#0069C8' : '' }}
            >
              <img src={sensorImg} width='40px' height='43px' />
              <div>
                <p>{module.device}</p>
                <p style={{ color: currentModule.id === module.id ? '#ffffff' : '' }}>{module.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.associatedSensors}>
          <div className={styles.title}>
            <span className={styles.blueDot}></span><p>ASSOCIATED SENSORS</p>
          </div>
          {sensors?.map((sensor, index) => (

            <div key={index} className={styles.listModule}
              style={{ backgroundColor: currentSensor.endPointId === sensor.endPointId ? '#0069C8' : '' }} onClick={() => handleCurrentSensor(sensor)}>
                {console.log("Current sensor", currentSensor, "Sensor", sensor)}
              <img src={sensorImg} width='40px' height='43px' alt={sensor.name} />
              <div>
                <p>{currentModule.device}.{index + 1}</p>
                <p style={{ color: currentSensor === sensor.name ? '#ffffff' : '' }}>{sensor.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.assetsAndDetails}>
          <div className={styles.associatedAssets}>
            <div className={styles.title}>
              <span className={styles.blueDot}></span><p >ASSOCIATED ASSETS</p>
              <FiPlus className={styles.titleIcon} onClick={() => setView('assets')} />
            </div>
            <div className={styles.associatedAssetsItems}>
              {(associatedAssets).map((asset, index) => (
                <div key={index} className={styles.associatedAsset}
                  style={{ backgroundColor: currentAsset.id === asset.id ? '#0069C8' : '' }} onClick={() => handleCurrentAssets(asset)}>
                  <div>
                    <p>{asset.typeName}</p>
                    <p style={{ color: currentAsset === asset.name ? '#ffffff' : '' }}>{asset.name}</p>
                  </div>
                  <img src={asset.name === 'Steam Boiler' ? boilerImg : exchangerImg} height='60%' style={{ marginRight: '10px' }} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.selectionDetails}>
            <div className={styles.title}>
              <span className={styles.blueDot}></span><p >SELECTION DETAILS</p>
              <MdEdit size={26} className={styles.titleIcon} onClick={() => setView('edit')} />
            </div>

            {
              viewDetails == 'modules' && <div className={styles.selectionDetailsInfo}>
                <div><p>ID</p><p>{currentModule.device}</p></div>
                <div><p>Name</p><p>{currentModule.name}</p></div>
                <div><p>Brand</p><p>{currentModule.brand}</p></div>
                <div><p>Model</p><p>{currentModule.model}</p></div>
                <div><p>Installation Date</p><p>{currentModule.installationDate}</p></div>
                <div><p>Communication</p><p>{currentModule.communication}</p></div>
              </div>
            }
            {viewDetails === 'assets' &&
              <div className={styles.selectionDetailsInfo}><div><p>Name</p><p>{currentAsset.name}</p></div>
                <div><p>{assetsProperties.properties && assetsProperties.properties[0] && assetsProperties.properties[0]?.property}</p><p>{assetsProperties.properties && assetsProperties.properties[0] && assetsProperties.properties[0]?.value}</p></div>
                <div><p>{assetsProperties.properties && assetsProperties.properties[1] && assetsProperties.properties[1]?.property}</p><p>{assetsProperties.properties && assetsProperties.properties[1] && assetsProperties.properties[1]?.value}</p></div>
                <div><p>{assetsProperties.properties && assetsProperties.properties[2] && assetsProperties.properties[2]?.property}</p><p>{assetsProperties.properties && assetsProperties.properties[2] && assetsProperties.properties[2]?.value}</p></div>
                <div><p>{assetsProperties.properties && assetsProperties.properties[3] && assetsProperties.properties[3]?.property}</p><p>{assetsProperties.properties && assetsProperties.properties[3] && assetsProperties.properties[3]?.value}</p></div>
              </div>}
            {viewDetails === 'sensors' &&
              <div className={styles.selectionDetailsInfo}>
                <div><p>ID</p><p>{currentSensor.endPoint}</p></div>
                <div><p>Name</p><p>{currentSensor.name ? currentSensor.name : 'SensorName'}</p></div>
                <div><p>Brand</p><p>{currentSensor.brand ? currentSensor.brand : 'BrandName'}</p></div>
                <div><p>Parameter</p><p>{currentSensor.parentMeter}</p></div>
                <div><p>Unit</p><p>{currentSensor.parameterUnitId}</p></div>
                <div><p>Aggregation</p><p>{currentSensor.aggregation}</p></div>
                <div><p>Corrective coefficient</p><p></p></div>
                <div><p>Asset</p><p></p></div>
                <div><p>Stream</p><p></p></div>
              </div>}

          </div>
        </div>
      </div >
      {view === 'connect' && <ConnectedModal setView={setView} modules={modules} setModules={setModules} siteId={siteId} />
      }
      {view === 'edit' && <EditModal setView={setView} currentModule={currentModule} currentAsset={currentAsset} setCurrentModule={setCurrentModule} setCurrentAsset={setCurrentAsset} viewDetails={viewDetails} setViewDetails={setViewDetails} assetsProperties={[assetsProperties]} setSensors={setSensors} />}
      {view === 'assets' && <AssetsModal setView={setView} setAssociatedAssets={setAssociatedAssets} associatedAssets={associatedAssets} siteId={siteId} />
      }
    </>
  );
}

export default ModulesSensors;

