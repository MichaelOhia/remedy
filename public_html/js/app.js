'use strict';

/* App Module */

var tcsp = angular.module('tcsp', [
    'ngRoute', 
    'ngStorage',    
    'tcspControllers', 
    'tcspServices'
       
]);


tcsp.config(['$routeProvider', '$locationProvider', '$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/menu.html',
                    controller: 'MenuCtrl'
                }).when('/form', {
                    templateUrl: 'partials/main.html',
                    controller: 'MainCtrl'
                }).when('/createdTicket/:userName/:customerSummary/:deviceModel/:OSVendor/:OSVersion/:hwIssue/:hwAction/:swIssue/:swAction/:caseNote/:resolution', {
                    templateUrl: 'partials/formData.html',
                    controller: 'DataCtrl'
                }).when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginCtrl'
                }).when('/logOut', {
                    templateUrl: 'partials/login.html',
                    controller: 'LogoutCtrl'
                });

        // temporary for the time being
        $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    if ($localStorage.token) {
                        config.headers.Authorization = $localStorage.token;
                    }
                    config.headers.Authorization = 'AR-JWT ' + localStorage.getItem("token");
                    return config;
                },
                'responseError': function(response){
                    if(response.status===401 || response.status=== 403){
                        $location.path('/login')
                    }
                    return $q.reject(response)
                }
            };
        }]);

        

        $locationProvider.html5Mode(false).hashPrefix('!');

        

    }]);





