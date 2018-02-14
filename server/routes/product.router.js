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
const url =
    "http://redsky.target.com/v2/pdp/tcin/16696652?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics";
const getProduct = async url => {
    try {
        const response = await axios.get(url);
        const data = response.data;
        console.log(
data.product.item.product_description.title
        );
    } catch (error) {
        console.log(error);
    }
};
getProduct(url);

router.get('/:id', function (req, res){

    var id = req.params.id;
    console.log('getting the following id:', id)
    Product.find({"product_id": id }).exec(function (err, product){

    })//end product.find
    
})//end get by id route

//Router available to other files
module.exports = router;