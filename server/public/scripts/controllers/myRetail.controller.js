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
            vm.productData = response.data;
            //if the product exists - edit price button will show 
            //and search clears
            if (response.data != 'Not Found') {
                vm.priceShown = true;
                vm.idNumber = ''
            }
            else {
                vm.message = 'Please check the product ID number as product ID: ' 
                + vm.idNumber + ' does not exist.'
            }
        }).catch(function () {
            console.log(error)
        });
    }//end get Product function


    //edit Price - clicked
    vm.editPrice = function () {
        //sets editing to true to allow updates on DOM
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
            //call getProduct(with the updated ID)
            vm.getProduct(id)
        }).catch(function () {
            swal('Something went wrong.');
            console.log(error)
        });
    }//end update price


    //cancel editing
    vm.cancel = function () {
        vm.editing = false;
    }//end edit function


})//end controller