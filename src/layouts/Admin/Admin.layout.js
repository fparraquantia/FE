import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';

import { useCookies } from "react-cookie";

import { Root } from "../../config/routes.config";

import Hider from "../../components/shared/Hider/Hider.component";


import "./Admin.layout.css";

export default function AdminLayout(props) {
  const [cookies] = useCookies(['session']);
  const header = props.header;
  const sidePanel = props.sidePanel;
  const noSidePanel = props.noSidePanel;


  if (!cookies['session']) {
    return <Navigate to={Root}/>;
  }

  return (
    <div className="admin-layout">
      <div className="admin-layout-header">{header}</div>
      <Hider isHidden={noSidePanel}>
        <div className="admin-layout-side-panel">
          <div className="admin-layout-side-panel-stretch">{sidePanel}</div>
        </div>
      </Hider>
      <div className="admin-layout-background">
        <Outlet />
      </div>
    </div>
  );
}
