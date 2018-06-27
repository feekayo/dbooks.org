angular.module('mainModule',[
    'dbooks.main.controllers',
    'dbooks.main.services',
    'dbooks.main.filters'
]).config(['$stateProvider','$locationProvider','$urlRouterProvider',function($stateProvider,$locationProvider,$urlRouterProvider){
    $stateProvider
    .state('home',{
        url : '/',
        templateUrl : 'modules/main/views/home.html',
        controller : 'HomeController'        
    })
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);