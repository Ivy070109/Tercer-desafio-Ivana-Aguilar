import express from 'express'
import ProductManager from './ProductManager.js'

const app = express()
const PORT = 8080
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const managerProduct = new ProductManager()

app.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit)
    //parseo a número porque de otra manera es captado como un string
    if (!limit) {
        return res.send(await managerProduct.readProducts())
    }
    const allProducts = await managerProduct.readProducts()
    const productsLimit = allProducts.slice(0, limit)

    res.send(productsLimit)
})

app.get('/products/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid)
    if (!pid) {
        return res.send(`El producto no existe`)
    }
    const allProducts = await managerProduct.readProducts()
    const productById = allProducts.find(product => product.id === pid)

    res.send(productById)
})

app.listen(PORT, () => {
    console.log(`Servidor Express ejecutándose en el puerto ${PORT}`)
})