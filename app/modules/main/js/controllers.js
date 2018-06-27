angular.module('dbooks.main.controllers',[])
.controller('HomeController',['$scope','$state','BooksCategories',function($scope,$state,BooksCategories){
    $scope.goto = function(state){
        $state.go(state,{});
    }
    
    $scope.genres = BooksCategories.categories;
}]);