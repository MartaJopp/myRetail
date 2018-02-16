var chai = require('chai');
var chaiHttp = require('chai-http');
var router = require('../routes/product.router.js');
var app = require('../server.js'); // 
var expect = chai.expect;
chai.use(chaiHttp);

// describe('My server tests'), function() {
// var app;
// done();
before(function(done){

    done();
});
describe('Get Product Route', function (){
    it('should return JSON when passed "1386042"', function (done) {
        chai.request(app)
            .get('/products/13860428')
        .end(function(err, response){
            expect(response).to.be.json;
            expect(response).to.have.status(200);
            done();
        })
    }
    )
})
// }