myApp.controller('MyRetailController', function ($http, $scope, MyRetailService) {
    var vm = this;
    vm.myRetailService = MyRetailService;

vm.getProduct = function(id) {
    console.log('clicked')
    MyRetailService.getProduct(id)
}
})//end controller