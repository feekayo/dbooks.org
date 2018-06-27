'use strict';


// Declare app level module which depends on filters, and services
angular.module('dbooks', [
    'dbooks.filters',
    'dbooks.services',
    'dbooks.directives',
    'dbooks.controllers',
    'ui.router',
    'LocalStorageModule',
    'ui.bootstrap',
    'mainModule'
]).config(function($httpProvider,$locationProvider){
    $httpProvider.defaults.useXDomain =false;
    $httpProvider.defaults.withCredentials = false;
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
    $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common.Accept ="applcation/json";
    $httpProvider.defaults.headers.common["Content-Type"] ="applcation/json";
});
