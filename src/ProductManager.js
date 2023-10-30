import fs from 'fs'

class ProductManager {
    static id = 0

    constructor(path) {
        this.products = []
        this.path = './products.json'
    }

    //método para añadir los productos
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        try {
            //validación de los datos
            if(!title || !description || !price || !thumbnail || !code || !stock) {
                console.log("Todos los valores son obligatorios. Debes completar todos los datos.")
                return 
            }

            //varificación del code
            const existCodeInProducts = this.products.some((product) => product.code === code)
            if(existCodeInProducts) {
                console.log(`El código ${code} no puede repetirse.`)
                return
                }

            //creación del nuevo producto
            const newProduct = {
                id: ProductManager.id + 1,
                title, 
                description, 
                price,
                thumbnail,
                code,
                stock,
            }

            this.products.push(newProduct)
            ProductManager.id++
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
        } catch (error) {
            return console.error(error)
        }   
    }

    //método para acceder a los datos
    readProducts = async () => {
        try {
            let response = await fs.promises.readFile(this.path, { encoding: 'utf-8' })
            return JSON.parse(response)        
        } catch (error) {
            return console.error(error)
        }
    }

    //método de retorno del array
    getProducts = async () => {
        try {
            const productList = await this.readProducts()
            return console.log({ productList })
        } catch (error) {
            return console.error(error)
        }
    }

    //método para obtener productos según su id 
    getProductById = async (id) => {
        try {
            const productExist = await this.readProducts()

            if (!productExist.find(product => product.id === id)) {
                console.log("Not Found")
            } else {
                const existInArray = productExist.find(product => product.id === id)
                console.log(existInArray)
            }
        } catch (error) {
            console.error(error)
        }
    }

    //actualizar productos según su id
    updateProducts = async ({id, ...product}) => {
        try {
            const productDetected = await this.readProducts()
            const loadProduct = productDetected.filter(product => product.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(loadProduct, null, 2))
            console.log(`El producto con el ID ${id} ha sido actualizado.`)

            const oldProduct = await this.readProducts()
            const modifiedProduct = [
                {id, ...product}, ...oldProduct
            ]

            await fs.promises.writeFile(this.path, JSON.stringify(modifiedProduct, null, 2))
        } catch (error) {
            return console.error(error)
        }
    }

    //eliminar productos según su id
    deleteProductById = async (id) => {
        try {
            const detectedProduct = await this.readProducts()
            const productFiltered = detectedProduct.filter(products => products.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(productFiltered, null, 2))

            console.log(`El producto con el ID ${id} ha sido eliminado.`)
        } catch (error) {
            return console.error(error)
        }
    }
}

//instanciar la clase
//const products = new ProductManager('./products.json')

        //primera llamada con array vacio
//console.log(products.getProduct())

        //producto agregado fallido
//products.addProduct("producto1", 300, "abc785", 56)

        //validar el code
//products.addProduct("product Fail", "éste producto es falso", 865, "sin imagen", "abc123", 78)

    //agregar productos
    /*
products.addProduct("producto prueba", "éste es el primer producto de prueba", 200, "sin imagen", "abc123", 25)
products.addProduct("producto1", "Éste es el segundo producto de prueba", 500, "sin imagen", "abc124", 45)
products.addProduct("product2", "éste es el tercer producto de prueba", 800, "sin imagen", "abc129", 62)
products.addProduct("product3", "éste es el cuarto producto de prueba", "sin imagen", 1502, "abc125", 65)
products.addProduct("product4", "éste es el quinto producto de prueba", 745, "sin imagen", "abc126", 98)
products.addProduct("product5", "éste es el sexto producto de prueba", 5745, "sin imagen", "abc12f", 63)
products.addProduct("product6", "éste es el séptimo producto de prueba", 8123, "sin imagen", "abc12c", 898)
products.addProduct("product7", "éste es el octavo producto de prueba", 9895, "sin imagen", "abc871", 68)
products.addProduct("product8", "éste es el noveno producto de prueba", 336, "sin imagen", "abce52", 22)
products.addProduct("product9", "éste es el décimo producto de prueba", 7482, "sin imagen", "abd826", 99)
*/

    //llamada del array con productos agregados
//console.log(products.getProducts())

    //buscar producto por id
//products.getProductById(1)
//products.getProductById(4)
//products.getProductById(8)
    //id fail
//products.getProductById(8)
//products.getProductById(6)

    //actualizar productos
/*
products.updateProducts({
    id: 4, 
    title: 'producto rosa',
    description: 'Producto de prueba para las modificaciones',
    price: 2800,
    thumbnail: 'sin imagen',
    code: 'abdf1855',
    stock: 25
})*/

    //eliminar productos 
//products.deleteProductById(6)

export default ProductManager