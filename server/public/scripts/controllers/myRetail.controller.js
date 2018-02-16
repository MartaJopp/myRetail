myApp.controller('MyRetailController', function ($http, $scope, MyRetailService) {
    var vm = this;
    vm.myRetailService = MyRetailService;
    vm.productData
    vm.priceShown = false;
    vm.editing = false;
    
    //get Product of id searched
    vm.getProduct = function (id) {
        MyRetailService.getProduct(id)
            .then(function (response) {
                vm.productData = response.data
                //if the product exists - edit price button will show
                if (vm.productData != '') {
                    vm.priceShown = true;
                }
                console.log('response', response)
            })
    }//end get Product function

    //edit Price
    vm.editPrice = function () {
    vm.editing = true;
    }//end edit Price

    vm.updatePrice = function(id, newPrice) {
        console.log(newPrice, id)
        MyRetailService.updatePrice(id, newPrice)

    }
})//end controller