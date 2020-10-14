const express = require("express");

const { responseBuilder } = require('../tools/apiResponseBuilder');
const { errorHandler } = require('../tools/errorHandler');

const router = express.Router();

let Product = require('../models/product.model');

router.get('/', async (req, res) => {
    // Product.init();
    Product
        .find()
        .then(products => {
            return responseBuilder(res, 200, {
                message: "All products",
                validation: {},
                error: {},
                data: products,
            });
        })
        .catch(err => {
            return responseBuilder(res, 200, {
                message: "Fail to query.",
                validation: {},
                error: err,
                data: {}
            });
        });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    await Product
        .findOne({ id: id })
        .then( product => {
            return responseBuilder(res, 200, {
                message: "",
                validator: {},
                error: {},
                data: product,
            });
        })
        .catch( err => {
            return responseBuilder(res, 200, {
                message: "",
                validator: {},
                error: err,
                data: {},
            })
        });
});

router.post('/', async (req, res) => {
    const {
        name,
        description,
        price,
        image_url
    } = req.body;

    const newProduct = new Product({
        name,
        description,
        price,
        image_url,
    });

    await newProduct
        .save()
        .then( (product) => {
            return responseBuilder(res, 200, {
                message: `Successfully added ${product.name} @ id ${product.id}.`,
                validation: {},
                error: {},
                data: product,
            });
        })
        .catch( err => {
            return responseBuilder(res, 200, {
                message: `Failed to add product ${name}.`,
                validation: {},
                error: err,
                data: {},
            });
        });
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;

    const {
        name,
        description,
        price,
        image_url,    
    } = req.body;

    await Product
        .findOne({ id:id })
        .then( async product => {

            name_ = name ? name : product.name;
            description_ = description ? description : product.description;
            price_ = price ? price : product.price;
            image_url_ = image_url ? image_url : product.image_url;

            Product
                .updateOne({ id:id }, {
                    name: name_,
                    description: description_,
                    price: price_,
                    image_url: image_url_,
                })
                .then( prod => {
                    return responseBuilder(res, 200, {
                        message: `Successfully updated product id ${id}.`,
                        validator: {},
                        error: {},
                        data: prod,
                    });
                })
                .catch( err => {
                    return responseBuilder(res, 200, {
                        message: `Fail to update product id ${id}.`,
                        validator: {},
                        error: err,
                        data: {},
                    });
                });
        })
        .catch( err => {
            return responseBuilder(res, 200, {
                message: "No such product.",
                validator: {},
                error: err,
                data: {},
            });
        });
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    await Product
        .deleteOne({ id:id })
        .then( (prod) => {
            if (prod.deletedCount == 1)
                return responseBuilder(res, 200, {
                    message: `Product id ${id} deleted.`,
                    validator: {},
                    error: {},
                    data: {},
                });
            else
                return responseBuilder(res, 200, {
                    message: `No such product.`,
                    validator: {},
                    error: {},
                    data: {},
                });
        })
        .catch( err => {
            return responseBuilder(res, 200, {
                message: "No such product.",
                validator: {},
                error: err,
                data: {},
            });
        });
});

module.exports = router;