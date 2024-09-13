const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, user } = newOrder
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                    _id: order.product,
                    countInStock: {$gte: order.amount}
                    },
                    {$inc: {
                        countInStock: -order.amount,
                        sold: +order.amount
                    }},
                    {new: true}
                )
    
                if (productData) {
                    const createOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            phone
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user
                    })
                    if (createOrder) {
                        return {
                            status: 'OK',
                            message: 'SUCCESS',
                        }
                    }
                } else {
                    return {
                        status: 'OK',
                        message: 'ERR',
                        id: order.product
                    }
                }
            })
            const results = await Promise.all(promises)
            const newData = results && results.filter((item) => item.id)
            if (newData.length) {
                resolve({
                    status: 'ERR',
                    message: `Sản phẩm với id ${newData.join(',')} khong du hang`
                })
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS'
            })
        } catch(e) {
            reject(e)
        }
    })
}

const getDetailsOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findOne({
                user: id
            })

            if (order === null) {
                resolve({
                    status: 'OK',
                    message: 'The order is not defined'
                })
            }
                        
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getDetailsOrder
}