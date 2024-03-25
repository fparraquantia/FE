// ROUTER
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Connect,
  Map,
  Root,
  DbRetrievalPath,
  SitesPath,
  ConfigurationPath,
  Reports,
  AlertsPath,
  ModulesSensors,
  DataVisualizationPath,
  MyShares,
  Details,
  ManualEntryDataPath,
  SiteOverviewPath,
  ActionPlan,
  AlertsLogPath,
  SiteListPath,
} from "../config/routes.config";

// LAYOUTS
import LandingLayout from "../layouts/Landing/Landing.layout";
import AdminLayout from "../layouts/Admin/Admin.layout";

// VIEWS
import Landing from "../views/Landing/Landing.view";
import MapView from "../views/Connect/MapView/MapView.view";
import Sites from "../views/Sites/Sites.view";
import Report from "../views/Reports/Reports.view";
import SiteList from "../views/Connect/SiteList/SiteList.view";
import Alerts from "../views/Alerts/Alerts.view";
import Configuration from "../views/Configuration/Configuration.view";
import Error404 from "../views/ErrorPages/Error404.view";
import SiteOverview from "../views/SiteOverview/SiteOverview.view";
import ManualEntryData from "../views/ManualEntryData/ManualEntryData.view";
import DataVisualization from "../views/DataVisualization/DataVisualization.view";
// import AlertsLog from "../views/Alerts/AlertsLog.view";

// COMPONENTS
import Header from "../components/private/Header/Header.component";
import SidePanel from "../components/shared/SidePanel/SidePanel.component";
import { SatelliteSharp } from "@mui/icons-material";

// WHOAMI

// Documentation on how the router works is available here:
// https://reactrouter.com/en/main/routers/create-browser-router
export default function DataRouter(props) {
  const translator = props.translator;
  const setErrorPopup = props.setErrorPopup;
  const changeLanguage = props.changeLanguage;

  return (
    <RouterProvider
      router={createBrowserRouter([
        // All routes start with a path, the react component to render (element) which should be a layout, and any sub-pages under that path for that layout.
        {
          // This route is for the main landing, and will render the child view MainLanding using the LandingLayout
          path: Root,
          element: <LandingLayout />,
          children: [
            {
              // This renders the MainLanding view, and makes it the index page for the path on the parent. In other words, this page will be rendered within the LandingLayout component.
              element: (
                <Landing
                  translator={translator}
                  changeLanguage={changeLanguage}
                />
              ),
              index: true,
            },
            {
              path: "/login",
              element: <Landing login={true} />,
            },
          ],
        },

        {
          path: Connect,
          element: <AdminLayout header={<Header />} />,
          children: [
            {
              path: Map,
              element: <MapView />,
            },
            {
              path: Reports,
              element: <Report />,
            },
            {
              path: AlertsPath,
              element: <Alerts />,
            },
            {
              path: `${SitesPath}/:id`,
              element: <Sites />,
            },
            {
              path: SiteListPath,
              element: <SiteList />,
            },
            {
              path: ConfigurationPath,
              element: <Configuration />,
            },
            // {
            //   path: AlertsLogPath,
            //   element: <AlertsLog />,
            // },
            {
              path: ModulesSensors,
              element: <modulesSensors />,
            },
            {
              path: MyShares,
              element: <myShares />,
            },
            {
              path: SiteOverviewPath,
              element: <siteOverview />,
            },
            {
              path: Details,
              element: <Details />,
            },
          ],
        },

        // A * will catch all remaining routes. This should be included as a minimum to either redirect back to the main page, or show a 404 page on any invalid route.
        {
          path: "*",
          element: <Error404 translator={translator} />,
        },
      ])}
    />
  );
}
