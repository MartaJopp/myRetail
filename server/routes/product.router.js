var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var axios = require('axios');

var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    product_id: Number,
    current_price: {
        currency_code: String,
        value: Number
    }
})

//Product document with product schema properties in prodcuts collection
var Product = mongoose.model('Product', ProductSchema, 'products');

const axios = require("axios");
let keyword;

/**
 * @api {get} /products/:id Find the product
 * @apiGroup Products
 * @apiParam {id} id product_id
* @apiSuccessExample Success-Response:
* HTTP/1.1 201 OK
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
 *      "product_id": 12345678
 *      "name": "pizza",
 *      "current_price": {
 *          "currency_code": "USD"
 *          "value": 6.99
 *      }
 *    }]
*
 * @apiErrorExample {json} product not found
 *    HTTP/1.1 404 Not Found
 * @apiErrorExample {json} Find error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:id', function (req, res) {
    let keyword = req.params.id;
    keyword = keyword.toString();
    const url =
        "http://redsky.target.com/v2/pdp/tcin/"
        + keyword + "?excludes=taxonomy,price,promotion,bulk_ship,"
        + "rating_and_review_reviews,rating_and_review_statistics,"
        + "question_answer_statistics";
    const getProduct = async url => {
        try {
            console.log(keyword)
            const response = await axios.get(url);
            const data = response.data;
            const sendBack = data.product.item.product_description.title;
            // var query = {}; 
            // query['product_id'] = { "$eq": 1669652 }
            keyword = Number(keyword)
            Product.findOne({ "product_id": keyword }, function (err, productFound) {
                if (err) {
                    console.log("Error!", err);
                    res.sendStatus(500);
                } else {

                    var sendProduct = {
                        name: sendBack,
                        product_id: productFound.product_id,
                        current_price: {
                            currency_code: productFound.current_price.currency_code,
                            value: productFound.current_price.value
                        }

                    }

                    console.log('send back', sendProduct);
                    res.send(sendProduct)
                }
            });
            // res.send(sendBack)
        } catch (error) {
            console.log('ERRORRRRRRRRRRRR');
            res.sendStatus(404)
        }
    };
    getProduct(url)
})

/**
 * @api {put} /products/:id Update a product price
 * @apiGroup Products
 * @apiParam {id} id product_id
 * @apiParam {String} currency_code Products new currency code 
 * @apiParam {Number} value Products new value
 * @apiParamExample {json} Input
 *    {
 *      "currency_code": "USD",
 *      "value": 109.99
 *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 204 No Content
 * @apiErrorExample {json} Update error
 *    HTTP/1.1 500 Internal Server Error
 */

//update the price of the product
router.put('/:id', function (req, res) {
    let keyword = req.params.id;
    Product.update({ "product_id": keyword }, {
        $set: {
            "current_price": {
                "currency_code": req.body.currency_code,
                "value": req.body.value
            }
        }
    }
        , function (err, productFound) {
            if (err) {
                console.log("Error!", err);
                res.sendStatus(500);
            } else {
                console.log('happened')
                res.sendStatus(201)
            };
        })
})//end update route

//Router available to other files
module.exports = router;