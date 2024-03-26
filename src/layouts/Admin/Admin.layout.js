import { Navigate, Outlet } from "react-router-dom";

import { useSelector } from 'react-redux';


import { Root } from "../../config/routes.config";

import Hider from "../../components/shared/Hider/Hider.component";


import "./Admin.layout.css";

export default function AdminLayout(props) {
    const header = props.header;
    const sidePanel = props.sidePanel;
    const noSidePanel = props.noSidePanel;
  
  
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
