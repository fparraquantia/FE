import { getRoutesSiteData, RoutesSiteUrl } from "@/app/_constants/routes";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table";
import Link from "next/link";
import { useMemo } from "react";

interface TDataItem {
  id: number;
  siteName: string;
  address: string | null;
  alerts: string;
  tvdisplay: string;
  cp: string | null;
  city: string;
  country: string;
  tedaguaContact: string | null;
  tedaguaId: string | null;
}

const sitesList = [
  {
    id: 1,
    name: "Planta Potabilizadora de Gamboa",
    address: "2620 Ellington Rd, Quincy, IL",
    region: "AMERICA",
    subRegion: "North",
    country: "USA",
    city: "Quincy",
    postalCode: "62305",
    tipology: "Production Site",
    coordinates: {
      latitude: 39.978214,
      longitude: -91.371475,
    },
    contactName: "Cynthia Masson",
    customerName: "random name",
    weatherStation: "",
    tedaguaId: "321X"
  },
  {
    id: 2,
    name: "Planta Desaladora Mina Spence",
    address: "9 Chem. de Bretagne, 92130 Issy-les-Moulineaux",
    region: "EMEA",
    subRegion: "South",
    country: "France",
    city: "Issy-les-Moulineaux",
    postalCode: "92130",
    tedaguaId: "321X",
    tipology: "Headquarter",
    coordinates: {
      latitude: 48.823816,
      longitude: 2.257877,
    },
    contactName: "Fernando Parra",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 3,
    name: "Planta Desaladora de Beni Saf",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    tedaguaId: "321X",

    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    coordinates: {
      latitude: -2.230808,
      longitude: 106.134938,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 4,
    name: "Planta Desaladora de Escombreras",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    tedaguaId: "321X",

    coordinates: {
      latitude: 40.4168,
      longitude: -3.7038,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 5,
    name: "Planta Desaladora de Duqm",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    tedaguaId: "321X",

    country: "Indonesia",
    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2093,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
  {
    id: 6,
    name: "Planta Desaladora de Tuas III",
    address: "9M4X+PR7, Asabri, Nogosari, Kec. Pandaan, Pasuruan",
    region: "ASEAN",
    subRegion: "--",
    country: "Indonesia",
    tedaguaId: "321X",

    city: "Jawa Timur",
    postalCode: "67156",
    tipology: "Distribution Site",
    coordinates: {
      latitude: 34.0522,
      longitude: -118.2437,
    },
    contactName: "alvaro.diaz@tedagua.com",
    customerName: "random name",
    weatherStation: "",
  },
];

export function ListSites() {
  const columns: ColumnProps<TDataItem>[] = [
    {
      title: "Site Name",
      dataIndex: "siteName",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.siteName.length - b.siteName.length,
      ellipsis: true,
      render: (text, record) => (
        <Link href={getRoutesSiteData(record.id)[RoutesSiteUrl.overview].href}>
          {text}
        </Link>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "10%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Alerts",
      dataIndex: "alerts",
      key: "alerts",
      width: "8%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "TV Display",
      dataIndex: "tvdisplay",
      key: "tvdisplay",
      width: "8%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Code Postal",
      dataIndex: "cp",
      key: "cp",
      width: "8%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: "10%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      width: "10%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Tedagua Contact Person",
      dataIndex: "tedaguaContact",
      key: "tedaguaContact",
      width: "13%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
    {
      title: "Tedagua Controller id",
      dataIndex: "tedaguaId",
      key: "tedaguaId",
      width: "13%",
      sorter: (a, b) => (a.address?.length ?? 0) - (b.address?.length ?? 0),
      ellipsis: true,
    },
  ];

  const dataTable: TDataItem[] = useMemo(() => {
    return sitesList.map((site) => ({
      id: site.id,
      siteName: site.name,
      address: site.address,
      alerts: "Co2 Cons.", // Puedes llenar esto con datos reales si es necesario
      tvdisplay: "Test", // Puedes llenar esto con datos reales si es necesario
      cp: site.postalCode,
      city: site.city,
      country: site.country,
      tedaguaContact: site.contactName,
      tedaguaId: site.tedaguaId
    }));
  }, []);

  return <Table columns={columns} dataSource={dataTable} />;
}
