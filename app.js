import http from 'node:http';
import url from 'node:url';
import { addProduct, deleteProduct, getProductById, listProducts } from './controllers/productController.js';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  if (path === '/products' && method === 'GET') {
    req.query = parsedUrl.query
    listProducts(req, res)
  } else if (path.match(/^\/products\/\d+$/) && method === 'GET') {
    req.params = { id: path.split('/')[2]};
    getProductById(req, res)
  } else if (path.match(/^\/products\/\d+$/) && method === 'DELETE') {
    req.params = { id: path.split('/')[2]};
    deleteProduct(req, res)
  } else if (path === '/products' && method === 'POST') {
    addProduct(req, res)
  } else {
    res.writeHead(404, { 'Content-type' : 'application/json'})
    res.end(JSON.stringify({ message: 'Route not found'}))
  }
})

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))