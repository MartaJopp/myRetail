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
        })
    } //end edit Price


})//end MyRetailService