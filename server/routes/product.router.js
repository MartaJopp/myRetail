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

//requires axios for http request
const axios = require("axios");

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
            const response = await axios.get(url);
            const data = response.data;
            const sendBack = data.product.item.product_description.title;
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
                    console.log('success');
                    res.send(sendProduct)
                }
            });
        } catch (error) {
            console.log('Error - product not found');
            res.sendStatus(404)
        }
    };
    //calls the axios getProduct - if successful hits the database for the
    //current price.  If product not found at URL - sends back 404
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

//update the current price and currency of the product based on id
router.put('/:id', function (req, res) {
    let keyword = req.params.id;
    Product.update({ "product_id": keyword }, {
        $set: {
            "current_price": {
                "currency_code": req.body.currency_code,
                "value": req.body.value
            }
        }
    }, function (err, productFound) {
        if (err) {
            console.log("Error received updating product.", err);
            res.sendStatus(500);
        } else {
            res.sendStatus(204)
        };
    })
})//end update route

//Router available to other files
module.exports = router;