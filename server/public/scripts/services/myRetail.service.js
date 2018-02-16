myApp.service('MyRetailService', function ($http, $location) {
    console.log('MyRetailService Loaded');
    var self = this;
    // self.productData = { data: [] };


    //get Product information
    self.getProduct = function (id) {
        console.log('product Id', id)
        return $http.get('/products/' + id).then(function (response) {
            // self.productData.data = response.data;
            return response
            console.log(response)
        }).catch(function (error) {
            console.log('Failure!');
        })
    } //end getProduct


})//end MyRetailService