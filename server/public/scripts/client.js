var myApp = angular.module('myApp', ['ngRoute']);
//routes
myApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    console.log('myApp -- config')
    $routeProvider
        .when('/', {
            templateUrl: '/views/templates/home.html',
            controller: 'MyRetailController as mrc',
        });
}) // end config