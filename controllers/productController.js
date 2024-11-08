import { products } from "../data/products.js";
import { sendJSONResponse } from "../utils/response.js";

export function listProducts(req, res) {
  const { category , minPrice, maxPrice } = req.query;

  let filteredProducts = products;

  //filtrar por categoria
  if ( category) {
    filteredProducts = filteredProducts.filter(product => product.category.toLocaleLowerCase() === category.toLocaleLowerCase());
  }

  //filtrar por preco
  if (minPrice ) {
    filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
  }

  if (maxPrice ) {
    filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
  }

  sendJSONResponse(res, 200, filteredProducts)

}

export function getProductById(req, res) {
  const productId = parseInt(req.params.id)
  const product = products.find(product => product.id === productId)

  if (!product) {
    sendJSONResponse(res, 404,  { message: 'Product not found'})
  }

  sendJSONResponse(res, 200, product)
}

export function addProduct(req, res ) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toSting();
  })
  req.on('end', () => {
    const { name, category, price} = JSON.parse(body)

    if(!name || !category || !price) {
      return sendJSONResponse(res, 400, { message: 'Product name, category and price are required'})
    }

    const newProduct = {
      id: products.length + 1,
      name, 
      category, 
      price
    }
    products.push(newProduct)

    sendJSONResponse(res, 201, { message: 'Product added successfully', product: newProduct})
  })
}

function deleteProduct(req, res ) {
  const productId = parseInt(req.params.id)
  const productIndex = products.findIndex(product => product.id === productId)

  if (productIndex === -1) {
    sendJSONResponse(res, 404, { message: 'Product not found'})
  }

  products.splice(productIndex, 1)
  sendJSONResponse(res, 200, { message: 'Product deleted successfully'})
}