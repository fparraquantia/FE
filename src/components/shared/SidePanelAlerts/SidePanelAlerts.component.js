import React, { useState } from "react";
import {  Box,  List, ListItemButton, ListItemText } from "@mui/material";
import "./SidePanelAlerts.component.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function SidePanelAlerts(props) {
  const isOpen = props.isOpen;
  const onChange = props.onChange;

  let defaultState = null;
  switch (window.location.pathname) {
    case 'AlertLog':
      defaultState = 0;
      break;
    case 'AlertConfiguration':
    default:
      defaultState = 1;
      break;
  }


  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState([true, false]);
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [data, setData] = useState([
    { title: 'My alerts', icon: <NotificationsNoneIcon size={20} /> },
    { title: 'Alert Log', },
    { title: 'Alert Configuration', },
   
  ]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const show = props.toggle;


  const sendValuesToParent = () => {

    props.onValuesChange(selectedTitle, activeItem);
  };



  return (

    <Box sx={{ width: '100%', height: '60%' }}>
      <Box sx={{ height: '100%' }}>
        {props.toggle && <>
          <List className="list-container">
            {data.map((item) => (
              <ListItemButton
                key={item.title}
                className={`list-item ${activeItem === item.title ? 'list-item-active' : ''}${!item.icon ? 'list-item-no-icon' : ''}`}
                onClick={() => {
                  setSelectedTitle(item.title);
                  setActiveItem(item.title);
                  sendValuesToParent();
                }}
              >
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                  <ListItemText primary={item.title} />
                  {item.icon}
                </Box>

              </ListItemButton>
            ))}

          </List>


        </>}
      </Box>
    </Box>

  );

}

