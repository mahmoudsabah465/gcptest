const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// This points to your DigitalOcean Nginx server
const TARGET = 'https://gcp1.djhmix.xyz';

app.use('/', createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    ws: true, // Crucial: This enables WebSocket proxying for V2Ray
    logLevel: 'debug',
    onError: (err, req, res) => {
        console.error('Proxy Error:', err);
        if (!res.headersSent) {
            res.status(500).send('Proxy Error');
        }
    }
}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Proxy listening on port ${PORT}`);
});