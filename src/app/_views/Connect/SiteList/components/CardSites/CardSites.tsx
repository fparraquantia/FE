import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from 'react';
import CustomModal from '@/app/_components/CustomModal/CustomModal';
import { TSite } from '@/app/_actions/getSites';
import { Delete, ModeEditOutlineOutlined, MoreVert } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import { Pagination } from 'antd';
import Image from 'next/image';
import gamboa from "@/assets/images/pgamboa.jpg";
import espence from "@/assets/images/pespence.jpg";
import benisaf from "@/assets/images/pbenisaf.jpg";
import pescombreras from "@/assets/images/pescombreras.jpg";
import pduqm from "@/assets/images/pduqm.jpg";
import ptuas from "@/assets/images/ptuas.jpeg";

import Link from 'next/link';
import styles from './CardSites.module.scss';

// Datos moqueados para simular la respuesta de la API
const mockedSites: TSite[] = [
  {
    id: 1, name: 'Planta Potabilizadora de Gamboa', country: { name: 'Spain' }, contactName: 'Álvaro Díaz', customerName: 'Tedagua',
    postalCode: null,
    coordinates: null,
    address: null,
    image_url: gamboa.src, 
  },
  {
    id: 2, name: 'Planta Desaladora Mina Spence', country: { name: 'Spain' }, contactName: 'Álvaro Díaz', customerName: 'Tedagua',
    postalCode: null,
    coordinates: null,
    address: null,
    image_url: espence.src, 
  },{
    id: 3, name: 'Planta Desaladora de Beni Saf ', country: { name: 'Portugal' },contactName: 'Álvaro Díaz', customerName: 'Tedagua',
    postalCode: null,
    coordinates: null,
    address: null,
    image_url: benisaf.src,  
  },{
    id: 4, name: 'Planta Desaladora de Escombreras', country: { name: 'Peru' },contactName: 'Álvaro Díaz', customerName: 'Tedagua',
    postalCode: null,
    coordinates: null,
    address: null,
    image_url: pescombreras.src,  
  },{
    id: 5, name: 'Planta Desaladora de Duqm', country: { name: 'Chile' }, contactName: 'Álvaro Díaz', customerName: 'Tedagua',
    postalCode: null,
    coordinates: null,
    address: null,
    image_url: pduqm.src, 
  },{
    id: 6, name: 'Planta Desaladora de Tuas III', country: { name: 'Spain' },contactName: 'Álvaro Díaz', customerName: 'Tedagua',
    postalCode: null,
    coordinates: null,
    address: null,
    image_url: ptuas.src, 
  },
];

interface CardSitesProps {
  setCreateModal: Dispatch<SetStateAction<boolean>>;
  setIdEdit: Dispatch<SetStateAction<number>>;
}

export function CardSites({ setCreateModal, setIdEdit }: CardSitesProps) {
  // Utilizamos useState para mantener el estado de los sitios
  const [sites, setSites] = useState<TSite[]>(mockedSites);
  const [currentPage, setCurrentPage] = useState(1);
  const [siteToDelete, setSiteToDelete] = useState<TSite>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = useCallback(() => {
    if (siteToDelete) {
      // Implementa lógica de eliminación aquí (puede ser una función simulada)
      // Por ejemplo, puedes filtrar los datos moqueados para simular la eliminación
      const updatedSites = sites.filter(site => site.id !== siteToDelete.id);
      setSites(updatedSites);
      setShowDeleteModal(false);
    }
  }, [siteToDelete, sites]);

  useEffect(() => {
    if (siteToDelete) {
      setShowDeleteModal(true);
    }
  }, [siteToDelete]);

  const sitesInPage = useMemo(() => {
    const start = (currentPage - 1) * 6;
    const end = start + 6;
    return sites.slice(start, end);
  }, [sites, currentPage]);

  const total = useMemo(() => sites.length, [sites]);

  return (
    <div className={styles.container}>
      <CustomModal
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        title={"Delete site"}
        type="delete"
        onClickButton={handleDelete}
        isLoadingButton={false} // Puedes implementar un estado de carga si lo necesitas
      >
        <p className={styles.containerDelete}>
          Are you sure you want to delete the site named
          <span> {siteToDelete?.name || ""}</span>?
        </p>
      </CustomModal>

      <div className={styles.containerGrid}>
        {sitesInPage.map((site, index) => (
          <div key={index} className={styles.containerGridCard}>
            <div className={styles.containerGridCardHeader}>
              <Button
                variant="text"
                component={Link} // Usamos component en lugar de LinkComponent
                href={`/site/${site.id}`} // Ejemplo de enlace simulado
              >
                <span>{site.name}</span>
              </Button>
              <div className={styles.containerGridCardHeaderButtons}>
                <IconButton
                  aria-label="edit"
                  onClick={() => {
                    setIdEdit(site.id);
                    setCreateModal(true);
                  }}
                >
                  <ModeEditOutlineOutlined />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => setSiteToDelete(site)}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  aria-label="more"
                  onClick={() => {}}
                >
                  <MoreVert />
                </IconButton>
              </div>
            </div>
            <div className={styles.containerGridCardContent}>
              <div className={styles.containerGridCardContentData}>
                <div className={styles.containerGridCardContentDataText}>
                  <p>Name:</p>
                  <span>{site.name}</span>
                </div>
                <div className={styles.containerGridCardContentDataText}>
                  <p>Country:</p>
                  <span>{site.country?.name}</span>
                </div>
                <div className={styles.containerGridCardContentDataText}>
                  <p>Contact Person:</p>
                  <span>{site.contactName}</span>
                </div>
                <div className={styles.containerGridCardContentDataText}>
                  <p>Customer:</p>
                  <span>{site.customerName}</span>
                </div>
              </div>
              {/* Mostrar la imagen del sitio */}
              <div className={styles.containerGridCardContentImage}>
                <Image
                  alt="image-site"
                  src={site.image_url} // Usamos la ruta de imagen del sitio actual
                  width={150}
                  style={{ borderRadius: '5px' }}
                  height={100}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        current={currentPage}
        onChange={(page) => setCurrentPage(page)}
        total={total}
        defaultPageSize={6}
      />
    </div>
  );
}
