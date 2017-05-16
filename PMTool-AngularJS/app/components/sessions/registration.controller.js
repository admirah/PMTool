(function () {
    angular
        .module("NWT")
        .controller("RegistrationController", ['$scope', '$http', 'SessionService', 'ToasterService', '$rootScope', '$location', function ($scope, $http, SessionService, ToasterService, $rootScope, $location) {

            $scope.user = {
                email: 'huskic@gmail.com',
                username: 'admin',
                password: 'admin',
                name: 'emina',
                bio: 'blablabla',
                image: 'http://slika.jpg'
            };
            $scope.register = function () {
                var dataObj = {
                    email: $scope.user.email,
                    username: $scope.user.username,
                    password: $scope.user.password,
                    name: $scope.user.name,
                    bio: $scope.user.bio,
                    image: $scope.user.image
                };
                $http({
                    url:  NWTConfig.source + "register",
                    method: "POST",
                    data: { 'model': dataObj }
                })
                    .then(function (response) {
                         redirectTo = (redirectTo == "/login") ? NWTConfig.DefaultRoute : redirectTo;
                    $location.path(redirectTo);
                    },
                    function (response) { 
                        alert( "failure message: " + JSON.stringify({data: data}));
                    });
            }
        }])
}());