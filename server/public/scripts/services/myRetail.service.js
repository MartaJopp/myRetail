myApp.service('MyRetailService', function ($http, $location) {
    console.log('MyRetailService Loaded');
    var self = this;

    //updated price
    self.newPrice = {
        currency_code: '',
        value: ''
    }


    //get Product information
    self.getProduct = function (id) {
        return $http.get('/products/' + id).then(function (response) {
            return response
        }).catch(function (error) {
            console.log('Failure!');
            return error
        })
    } //end getProduct

    //updates the price
    self.updatePrice = function (id, newPrice) {
        self.newPrice = newPrice
        return $http.put('/products/' + id, self.newPrice).then(function (response) {
            return response
        }).catch(function (error) {
            console.log('Failure!');
            return error
        })
    } //end edit Price


})//end MyRetailService