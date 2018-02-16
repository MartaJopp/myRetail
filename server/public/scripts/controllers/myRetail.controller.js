myApp.controller('MyRetailController', function ($http, $scope, MyRetailService) {
    var vm = this;
    vm.myRetailService = MyRetailService;
    vm.productData
    vm.priceShown = false;
    vm.editing = false;
    
    //get Product of id searched
    vm.getProduct = function (id) {
        MyRetailService.getProduct(id).then(function (response) {
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

    //send new price
    vm.updatePrice = function(id, newPrice) {
        console.log(newPrice, id)
        MyRetailService.updatePrice(id, newPrice).then (function (response){
            vm.getProduct(id)
            vm.editing = false;
            swal({
                "title": "Updated Price!",
                "text": "The current price has been updated!",
                "icon": "success"
            });
        }).catch(function () {
            swal('Something went wrong.');
        });
    }//end update price

})//end controller