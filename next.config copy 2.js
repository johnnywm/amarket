// next.config.js
const withPlugins = require('next-compose-plugins');


const withWorkbox = require("next-with-workbox");




module.exports = withPlugins(
 [
  
    [withWorkbox,  { /* plugin config here ... */
      workbox: {
   
    swDest: "sw.js",
    swSrc: "worker.js",
   
    maximumFileSizeToCacheInBytes:50000000
     
      
      }
    
    }]

  ],
  {
    env: {
      EMARKET_DATA_BASE : process.env.EMARKET_DATA_BASE ,
      CLIENT_PRINCIPAL_MAIL :process.env.CLIENT_PRINCIPAL_MAIL, 
      CLIENT_PRINCIPAL_BANKNAME :process.env.CLIENT_PRINCIPAL_BANKNAME
    },
  
  
  },
);