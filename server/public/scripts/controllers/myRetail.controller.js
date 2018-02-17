myApp.controller('MyRetailController', function ($http, $scope, MyRetailService) {
    var vm = this;
    vm.myRetailService = MyRetailService;
    vm.productData
    vm.priceShown = false;
    vm.editing = false;
    vm.message = ''

    //get Product of id searched
    vm.getProduct = function (id) {
        MyRetailService.getProduct(id).then(function (response) {
            vm.productData = response.data
            //if the product exists - edit price button will show
            if (response.data != 'Not Found') {
                vm.priceShown = true;
            }
            else {
                vm.message = 'Please check the product ID number as that ID does not exist.'
            }
        }).catch(function () {
            console.log(error)
        });
    }//end get Product function

    //edit Price
    vm.editPrice = function () {
        vm.editing = true;
    }//end edit Price

    //send new price
    vm.updatePrice = function (id, newPrice) {
        console.log(newPrice, id)
        MyRetailService.updatePrice(id, newPrice).then(function (response) {
            vm.editing = false;
            swal({
                "title": "Updated Price!",
                "text": "The current price has been updated!",
                "icon": "success"
            });
            vm.getProduct(id)
            vm.idNumber = ''
        }).catch(function () {
            swal('Something went wrong.');
            console.log(error)
        });
    }//end update price

    vm.cancel = function () {
        vm.editing = false;

    }

})//end controller