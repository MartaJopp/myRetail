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


// const getProduct = async url => {
//     try {
//         console.log(keyword)
//         const response = await axios.get(url);
//         const data = response.data;
//         console.log(
//             data.product.item.product_description.title
//         );
//     } catch (error) {
//         console.log(error);
//     }
// };

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
            Product.findOne({"product_id": keyword}, function (err, productFound) {
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




// getProduct(url);

// router.get('/:id', function (req, res){

//     var id = req.params.id;
//     console.log('getting the following id:', id)
//     Product.find({"product_id": id }).exec(function (err, product){

//     })//end product.find
    
// })//end get by id route

//Router available to other files
module.exports = router;