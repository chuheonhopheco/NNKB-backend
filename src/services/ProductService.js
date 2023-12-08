const Product = require("../models/ProductModel")

const createProduct = (newProduct) => {
    return new Promise(async(resolve, reject) => {
        const {name, image, type, price, countInStock, rating, description} = newProduct
        try{
            const checkProduct = await Product.findOne({
                name: name
            })
            if(checkProduct !== null){
                resolve({
                    status: 'OK',
                    message: 'The name of product is already exist'
                })
            }
            const newProduct = await Product.create({
                name, image, type, price, countInStock, rating, description,
            })
            if(newProduct){
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                }) 
            }
            
        }catch (e){
            reject(e)
        }
    })
}
const updateProduct = (id, data) => {
    return new Promise(async(resolve, reject) => {
        try{
            const checkProduct = await Product.findOne({
                _id: id
            })
            console.log('checkProduct', checkProduct)
            if(checkProduct === null){
                resolve({
                    status: 'OK',
                    message: 'The product is not defined'
                })
            }
            const updateProduct = await Product.findByIdAndUpdate(id, data, {new: true})   
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: updateProduct
                })                        
        }catch (e){
            reject(e)
        }
    })
}
const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getOneProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProduct = (limit = 8, page = 0) => {
    return new Promise(async(resolve, reject) => {
        try{ 
            const totalProduct = await Product.count()         
            const allProduct = await Product.find().limit(limit).skip(page * limit)   
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: allProduct,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })                        
        }catch (e){
            reject(e)
        }
    })
}
module.exports = {
    createProduct,
    updateProduct,
    getOneProduct,
    deleteProduct,
    getAllProduct
}