myApp.service('MyRetailService', function ($http, $location) {
    console.log('MyRetailService Loaded');
    var self = this;
    self.productData = { data: [] };

self.getProduct = function(id) {
    console.log('product Id', id)
    $http.get('/products/' + id).then(function (response){
    self.productData.data = response.data;
    console.log(response)
    }).catch(function (error) {
        console.log('Failure!');
    }) 
}


})//end MyRetailService