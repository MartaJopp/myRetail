myApp.controller('MyRetailController', function ($http, $scope, MyRetailService) {
    var vm = this;
    vm.myRetailService = MyRetailService;

    vm.productData;

    vm.getProduct = function (id) {
        console.log('clicked')
        MyRetailService.getProduct(id).then(function (response) {
            console.log('from controller', response)
            console.log(response.data)
            vm.productData = response.data
        })
    }//end get Product function

})//end controller