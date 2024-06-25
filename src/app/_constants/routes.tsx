import { AiOutlineFundProjectionScreen } from "react-icons/ai";
import { FiEdit, FiBookmark, FiLayers, FiList, FiEye } from "react-icons/fi";

import { ReactNode } from "react";

export enum RoutesUrl {
  root = "/",
  login = "/login",
  map = "/connect",
  reports = "/connect/reports",
  configuration = "/connect/configuration",
  siteList = "/connect/site-list",
  alerts = "/connect/alerts",
}

export enum RoutesSiteUrl {
  overview = "/",
  multiSiteOV = "/multi-site-ov",
  actionPlan = "/action-plan",
  modulesSensors = "/modules-sensors",
  synoptic = "/synoptic",
  manualEntry = "/manual-entry",
  dataVisualisation = "/data-visualisation",
  myShares = "/my-shares",
}

export enum RoutesConfigUrl {
  userSettings = "/",
  accessProfiles = "/access-profiles",
}

type RouteTitleType = {
  [K in RoutesUrl]: string;
};

export const RouteTitle: RouteTitleType = {
  [RoutesUrl.root]: "Root",
  [RoutesUrl.login]: "Login",
  [RoutesUrl.map]: "Map",
  [RoutesUrl.reports]: "Reports",
  [RoutesUrl.configuration]: "Settings",
  [RoutesUrl.siteList]: "My Sites",
  [RoutesUrl.alerts]: "Alerts",
};

interface RouteSiteDataType {
  title: string;
  href: string;
  type: RoutesSiteUrl;
  icon?: ReactNode;
}

type RoutesSiteDataType = {
  [K in RoutesSiteUrl]: RouteSiteDataType;
};

interface RouteConfigDataType {
  title: string;
  href: string;
  type: RoutesConfigUrl;
  icon?: ReactNode;
}

type RoutesConfigDataType = {
  [K in RoutesConfigUrl]: RouteConfigDataType;
};

export const routesConfigData: RoutesConfigDataType = {
  [RoutesConfigUrl.userSettings]: {
    type: RoutesConfigUrl.userSettings,
    title: "User Settings",
    href: `${RoutesUrl.configuration}`,
  },
  [RoutesConfigUrl.accessProfiles]: {
    type: RoutesConfigUrl.accessProfiles,
    title: "Access Profiles",
    href: `${RoutesUrl.configuration}${RoutesConfigUrl.accessProfiles}`,
  },
};

export const getRoutesSiteData = (siteId: number): RoutesSiteDataType => {
  const baseUrl = `${RoutesUrl.siteList}/${siteId}`;
  return {
    [RoutesSiteUrl.overview]: {
      type: RoutesSiteUrl.overview,
      title: "Site Overview",
      href: `${baseUrl}`,
      icon: <FiEye />,
    },
    
    [RoutesSiteUrl.actionPlan]: {
      type: RoutesSiteUrl.actionPlan,
      title: "Optimization Tools",
      href: `${baseUrl}${RoutesSiteUrl.actionPlan}`,
      icon: <FiList />,
    },
    [RoutesSiteUrl.dataVisualisation]: {
      type: RoutesSiteUrl.dataVisualisation,
      title: "BIM Viewer",
      
      href: `${baseUrl}${RoutesSiteUrl.dataVisualisation}`,
      icon: <AiOutlineFundProjectionScreen />,
    },
    [RoutesSiteUrl.modulesSensors]: {
      type: RoutesSiteUrl.modulesSensors,
      title: "Modules & Sensors",
      href: `${baseUrl}${RoutesSiteUrl.modulesSensors}`,
      icon: <FiLayers />,
    },
 
    [RoutesSiteUrl.manualEntry]: {
      type: RoutesSiteUrl.manualEntry,
      title: "Manual Entry Data",
      href: `${baseUrl}${RoutesSiteUrl.manualEntry}`,
      icon: <FiEdit />,
    },
   
    [RoutesSiteUrl.myShares]: {
      type: RoutesSiteUrl.myShares,
      title: "My Shares",
      href: `${baseUrl}${RoutesSiteUrl.myShares}`,
      icon: <FiBookmark />,
    },
    [RoutesSiteUrl.multiSiteOV]: {
      type: RoutesSiteUrl.multiSiteOV,
      title: "Multi-site Overview",
      href: `${baseUrl}${RoutesSiteUrl.multiSiteOV}`,
    },
    [RoutesSiteUrl.synoptic]: {
      type: RoutesSiteUrl.synoptic,
      title: "Synoptic",
      href: `${baseUrl}${RoutesSiteUrl.synoptic}`,
    },
  };
};

export const getUrlDataFromPath = (
  siteId: number,
  pathname: string
): RouteSiteDataType => {
  const data = Object.values(getRoutesSiteData(siteId)).find(
    (el) => el.href == pathname
  );
  return data || getRoutesSiteData(siteId)[RoutesSiteUrl.overview];
};

export const getConfigUrlDataFromPath = (
  pathname: string
): RouteConfigDataType => {
  const data = Object.values(routesConfigData).find(
    (el) => el.href == pathname
  );
  return data || routesConfigData[RoutesConfigUrl.userSettings];
};
