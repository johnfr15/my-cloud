const express = require('express');
const httpProxy = require('http-proxy');
// const fs = require('fs');
// const https = require('https');

const app = express();
const proxy = httpProxy.createProxyServer();

// Load SSL certificate and private key
// const sslOptions = {
//     key: fs.readFileSync('path/to/private-key.pem'),
//     cert: fs.readFileSync('path/to/certificate.pem'),
// };
// Create an HTTPS server using the SSL options
// const httpsServer = https.createServer(sslOptions, app);





/***********************************|
|          MICRO SERVICES           |
|__________________________________*/
// Define routes to forward requests to specific microservices

// APP
app.route('/app/sample-ai/*')
   .get((req, res) => proxy.web(req, res, { target: 'http://sample-ai:5173' }))
   .post((req, res) => proxy.web(req, res, { target: 'http://sample-ai:5173' }));



// API



// AUTH
app.route('/auth')
   .get((req, res) => proxy.web(req, res, { target: 'http://authentication:8100' }))
   .post((req, res) => proxy.web(req, res, { target: 'http://authentication:8100' }));




// NOT FOUND
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});







/***********************************|
|           SERVER BOOT             |
|__________________________________*/
const PORT = 80;
app.listen(PORT, () => {
    console.log(`API Gateway (HTTPS) listening on port ${PORT}`);
});
