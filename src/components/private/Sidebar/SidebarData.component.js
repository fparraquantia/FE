import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import { PAGE_ROUTES } from './../../../config/constants.config';
export const SidebarData = [
  {
    title: 'Site Overview',
    path: '/SiteOverviewPath',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Multi Site OV',
        path: '/SiteOverviewPath/MultiSiteOVs',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'TV Display',
        path: '/SiteOverviewPath/TVDisplay',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Action Plan',
    path: '/ActionPlan',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,


  },
  {
    title: 'Modules & Sensors',
    path: '/ModulesSensors',
    icon: <FaIcons.FaCartPlus />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Synoptic',
        path: 'ModulesSensors/Synoptic',
        icon: <IoIcons.IoIosPaper />
      },
    ]
  },
  {
    title: 'Manual Entry Data',
    path: '/ManualEntryDataPath',
    icon: <IoIcons.IoMdPeople />,
    
  },
  {
    title: 'Data Visualisation',
    path: 'DataVisualisationPath',
    icon: <FaIcons.FaEnvelopeOpenText />,


  },
  {
    title: 'My Shares',
    path: 'MyShares',
    icon: <IoIcons.IoMdHelpCircle />
  }
];