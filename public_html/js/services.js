'use strict';

/* Services */

var tcspServices = angular.module('tcspServices', ['ngResource']);

tcspServices.factory('Main', ['$http', '$localStorage',
    function($http, $localStorage) {
        var baseUrl = "https://adobe-qa9-restapi.onbmc.com/api/jwt";

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();
       
        return {
            signin: function(data, success, error) {
                //console.log(data);
                $.ajax({
                    type:"POST", 
                    url: baseUrl + '/login',
                    data: data, 
                    success: function(resp){ 
                        //console.log(resp)
                        localStorage.setItem("jwt", resp)
                        $localStorage.token=localStorage.setItem("jwt", resp)
                        var token = "AR-JWT " + localStorage.getItem("jwt")
                        data=resp   
                        
                        
                    }
                })
                
                
                
            }, 

            getCategory: function () {
                var token = "AR-JWT " + localStorage.getItem("jwt")
                //console.log(token);
                // $localStorage.token=token;
                // console.log($localStorage.token)
                // var jWT = $localStorage.token
                //console.log(token)
                $localStorage.JWT=token
                var jWT=$localStorage.JWT
                console.log(jWT)

                $.ajax({
                    // type: 'GET',
                    url:'https://adobe-qa9-restapi.onbmc.com/api/arsys/v1/entry/ADB:HPD:Incident Categorization Configuration',
                    headers: {
                                'Authorization': jWT,
                                'Content-Type': 'application/json'
                            },
                    success: function(data){ 
                        console.log(data)
                        console.log('this section finally worked')
                    },
                    error: function(error){
                        console.log('Authentication Failed')
                    }
                })

            }

        };

    }]);

