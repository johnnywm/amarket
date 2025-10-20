import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import PersonalInf from "./user/personal";
import Tarjetas from "./user/cards";
import Config from "./user/configuracion";
import Puchase from "./user/purchase";
import Request from "./user/request";
import Perfilhome from "./user/perfilhome";
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { Animate } from "react-animate-mount";



export default function ScrollableTabsButtonForce() {
 
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 

  return (
    <div className='contCompo'>
     <div className='contTabs'>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
       
        scrollButtons
        allowScrollButtonsMobile
        aria-label="scrollable force tabs example"
        centered
      >
        <Tab icon={<AccountBoxIcon />} label="Perfil" />
        <Tab icon={<StorefrontIcon />} label="Compras" />
        <Tab icon={<SettingsIcon />} label="Configuracion" />
   
      </Tabs>
      </div>
      <Animate show={value === 0}>
      <PersonalInf />
              </Animate>
           <Animate show={value === 1}>
           <Puchase />
              </Animate>

        <Animate show={value === 2}>
      
        <Config />
        </Animate>
   
       


    
 
     
    </div>
  );
}