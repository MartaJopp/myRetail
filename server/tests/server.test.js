var chai = require('chai');
var chaiHttp = require('chai-http');
var router = require('../routes/product.router.js');
var app = require('../server.js'); // 
var expect = chai.expect;
chai.use(chaiHttp);

//get route integrated testing
describe('Get Product Route', function () {
    it('should return JSON when passed "13860428"', function (done) {
        chai.request(app)
            .get('/products/13860428')
            .end(function (err, response) {
                expect(response).to.be.json;
                expect(response).to.have.status(200);
                done()
            })
    }
    )
})

//put route integrated testing
describe('Update Product Route', function () {
    it('should respond with a 204 when existing product is updated"', function (done) {
        chai.request(app)
            .put('/products/13860428')
            .send({
                current_price: {
                    currency_code: 'USD',
                    value: '110.99'
                }
            })
            .end(function (err, response) {
                expect(response).to.have.status(204)
                done()
            })
    })
})
