// next.config.js

const withWorkbox = require('next-with-workbox')

const nextConfig = {
 // your next config
 reactStrictMode: true,
 swcMinify: true,
 compiler: {
   removeConsole: process.env.NODE_ENV !== 'development',
 },

     env: {
       EMARKET_DATA_BASE : process.env.EMARKET_DATA_BASE ,
       CLIENT_PRINCIPAL_MAIL :process.env.CLIENT_PRINCIPAL_MAIL, 
       CLIENT_PRINCIPAL_BANKNAME :process.env.CLIENT_PRINCIPAL_BANKNAME,
       URL_BACKEND_SERVER:process.env.URL_BACKEND_SERVER
     },
}

const plugins = [
 // other plugins
  withWorkbox,
]

module.exports = plugins.reduce((acc, curr) => {
  if (curr.name === 'withWorkbox') {
    return curr(acc, { 
      workbox: {
   
        swDest: "sw.js",
        swSrc: "worker.js",
       
        maximumFileSizeToCacheInBytes:50000000
         
          
          }
    
    })
  }
  return curr(acc)
}, nextConfig)