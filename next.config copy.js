// next.config.js
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');

const withWorkbox = require("next-with-workbox");

const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");



module.exports = withPlugins(
 [
    [withSass, { /* plugin config here ... */ }],
    [withCSS,  { /* plugin config here ... */ }],
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

    },
  
  },
);