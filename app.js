const http = require('http');
const httpProxy = require('http-proxy');

// Create the proxy server
const proxy = httpProxy.createProxyServer({
    target: 'http://35.225.235.142:80', // Forwarding to your DO Nginx port 80
    ws: true // This is CRITICAL for WebSocket support
});

const server = http.createServer((req, res) => {
    // Standard web traffic (optional)
    proxy.web(req, res);
});

// The magic: forwarding the WebSocket upgrade handshake
server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

// App Engine expects the app to listen on port 8080
const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log(`Proxy server running on port ${port}`);
});
