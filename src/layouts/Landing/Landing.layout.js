import React from 'react';

import { Outlet } from "react-router-dom"
import './Landing.layout.css'

export default function LandingLayout(props) {
  return (
    <div className="landing-layout">
      <Outlet />
    </div>
  )
}