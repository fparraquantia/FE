import { BasicObjectData } from "./Base";

export type SitesResponse = SiteType[];

export interface SiteType {
  id: number;
  name: string;
  address: string;
  postalCode: string;
  contactName: string;
  customerName: string;
  coordinates: Coordinates;
  Country?: {
    name: string;
  };
}

// extends Omit<CreateSite, "active"
export interface UpdateCreateSite extends SiteDetail {
  subregionId?: number;
  countryId?: number;
  cityId?: number;
}

export interface SiteDetail {
  id: number;
  name?: string;
  tipology?: string;
  surface?: number;
  address?: string;
  regionName?: string;
  coordinates?: Coordinates;
  subregionName?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  phoneNumber?: string;
  contactName?: string;
  contactPhone?: string;
  emailAddress?: string;
  customerName?: string;
  customerPhone?: string;
  weatherStation?: string;
  crmCustomerCode?: string;
  applications?: Application[];
}

export interface UpdateSite {
  name?: string;
  crm_customer_code?: string;
  phone_number?: string;
  site_address?: string;
  postal_code?: string;
  city_id?: number;
  latitude?: string;
  longitude?: string;
  tipology?: string;
  contact_name?: string;
  contact_phone?: string;
  email_address?: string;
  customer_name?: string;
  customer_phone?: string;
  weather_station?: string;
  applications?: ApplicationUpdate[];
}

export interface CreateSite {
  name?: string;
  region?: string;
  subregion?: string;
  countryId?: number;
  cityId?: number;
  latitude?: string;
  longitude?: string;
  address?: string;
  postalCode?: string;
  contactName?: string;
  customerName?: string;
  applications?: ApplicationCreate[];
}

interface Coordinates {
  latitude?: string;
  longitude?: string;
}

export interface Application {
  id: number;
  type: number;
  name?: string;
  productTypeFlag?: 1 | 0;
  products?: number[];
}

export interface ApplicationUpdate {
  id: number;
  name: string;
  typeId: number;
  productTypeFlag?: 1 | 0;
  products?: ProductUpdate[];
  toDelete: boolean;
}

interface ApplicationCreate {
  name: string;
  typeId: number;
  productTypeFlag?: 1 | 0;
  products?: number[];
}

interface ProductUpdate {
  old_id: number;
  new_id: number;
}

export type RegionsResponse = Region[];

export interface Region {
  name?: string;
  ids?: number[];
  subregions?: string[];
}

export type CitiesResponse = City[];

export interface City extends BasicObjectData {
  postalCode?: string;
}
