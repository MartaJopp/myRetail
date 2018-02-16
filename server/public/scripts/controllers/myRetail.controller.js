myApp.controller('MyRetailController', function ($http, $scope, MyRetailService) {
    var vm = this;
    vm.myRetailService = MyRetailService;
vm.productData = {
    name: ''
}
    vm.getProduct = function (id) {
        console.log('clicked')
        MyRetailService.getProduct(id).then(function (response) {
            console.log('from controller', response)
            console.log(response.data)
            vm.productData.name = response.data
        })
    }//end get Product function

})//end controller