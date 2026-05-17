const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({
    target: 'http://159.65.126.85:80',
    ws: true,
    changeOrigin: true
});

proxy.on('error', (err, req, res) => {
    if (res && res.writeHead) {
        res.writeHead(502);
        res.end('Proxy Error');
    }
});

const server = http.createServer((req, res) => {
    proxy.web(req, res);
});

server.on('upgrade', (req, socket, head) => {
    proxy.ws(req, socket, head);
});

server.listen(process.env.PORT || 8080);
