myApp.service('MyRetailService', function ($http, $location) {
    console.log('MyRetailService Loaded');
    var self = this;


    self.editPrice = false;

    self.newPrice = {
        currency_code: '',
        value: ''
    }

    //get Product information
    self.getProduct = function (id) {
        console.log('product Id', id)
        return $http.get('/products/' + id).then(function (response) {
            console.log(response)
            return response
        }).catch(function (error) {
            console.log('Failure!');
            return error
        })
    } //end getProduct

    //edit Price
    self.updatePrice = function (id, newPrice) {
        self.newPrice = newPrice
        return $http.put('/products/' + id, self.newPrice).then(function (response) {
            return response
            console.log(response)
        }).catch(function (error) {
            console.log('Failure!');
            return error
        })
    } //end edit Price

    self.product = {
        product_id: '',
        current_price: {
            currency_code: '',
            value: ''
        }
    }

    self.addProduct = function (product) {
        self.product.product_id = product.product_id;
        self.product.current_price.currency_code = product.currency_code;
        self.product.current_price.value = product.value;
        return $http.post('/products', self.product).then(function (response){
            return response
        }).catch(function (err) {
            console.log('Post Route error', err);
        })
}

})//end MyRetailService