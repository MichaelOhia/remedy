'use strict';

/* Controllers */

var tcspControllers = angular.module('tcspControllers', []);



tcspControllers.controller('MenuCtrl', ['$scope', '$location', '$http',
    function MenuCtrl($scope, $location, $http) {
        // if (!checkCreds()) {
        //     $location.path('/login');
        //}
        $scope.message = "Hello World";
    }]);

tcspControllers.controller('MainCtrl', ['$scope', '$location', '$http',
    function MainCtrl($scope, $location, $http) {
        

        $scope.submit = function(){
            $location.path('/createdTicket/' + $scope.userName + "/" + $scope.customerSummary
                            + "/" + $scope.deviceModel + "/" + $scope.OSVendor + "/" + $scope.OSVersion +
                            "/" + $scope.hwIssue + "/" + $scope.hwAction + "/" + $scope.swIssue + "/" + 
                            $scope.swAction + "/" + $scope.caseNote + "/" + $scope.resolution
            );
        };



    }]);
    
tcspControllers.controller('DataCtrl', ['$scope', '$routeParams',
    function DataCtrl($scope, $routeParams) {

        // if (!checkCreds()) {
        //     $location.path('/login');
        // }

        $scope.userName = $routeParams.userName;
        $scope.customerSummary = $routeParams.customerSummary;
        $scope.deviceModel = $routeParams.deviceModel;
        $scope.OSVendor = $routeParams.OSVendor;
        $scope.OSVersion = $routeParams.OSVersion;
        $scope.hwIssue = $routeParams.hwIssue;
        $scope.hwAction = $routeParams.hwAction;
        $scope.swIssue = $routeParams.swIssue;
        $scope.swAction = $routeParams.swAction;
        $scope.caseNote = $routeParams.caseNote; 
        $scope.resolution = $routeParams.resolution;    
    }]);


    tcspControllers.controller('LoginCtrl', ['$rootScope', '$scope', '$location', '$localStorage', 'Main',
    function LoginCtrl($rootScope,$scope, $location, $localStorage, Main) {
        $scope.signin = function () {
            // console.log("sign-in test");
            
            var formData = {
                username: $scope.username,
                password: $scope.password
            }
            
            // Main.signin(formData, function(res) {
            //         console.log('does this work?')
            //         if (res.type == false) {
            //             alert(res.data)
            //             console.log('just testing if this works');    
            //         } else {
            //             // window.location = "/";  
            //             $location.path('/form');
            //             console.log('Oh this works');      
            //         }
                    
            //     },  function() {
            //             $rootScope.error = 'Failed to signin';
            //             $location.path('/form'); 
            //         }
            // )
            // Main.getCategory()

            Main.signin(formData, function(res) {
                console.log(res);
                // console.log(data)
                // console.log('does this work?')
                // if (res!== undefined) {
                //     console.log('just testing if this works');
                //     $location.path('/form');   
                // } else {
                //     // window.location = "/";  
                //     $location.path('/login');
                //     console.log('Oh this works');      
                // }
                
                },  function() {
                        $rootScope.error = 'Failed to signin';
                        $location.path('/login'); 
                    }
            )

            Main.getCategory()

            $location.path('/form');

        };
    }]);

    tcspControllers.controller('LogoutCtrl', ['$location', 'deleteCreds',
    function LogoutCtrl($location, deleteCreds) {
        deleteCreds();
        $location.path('/login');
    }]);