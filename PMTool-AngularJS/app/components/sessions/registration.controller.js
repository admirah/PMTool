(function () {
    angular
        .module("NWT")
        .controller("RegistrationController", ['$scope', 'ToasterService', '$location', 'DataFactory', function ($scope, ToasterService, $location, DataFactory) {

            $scope.user = {
                email: 'huskic@gmail.com',
                username: 'admin',
                name: 'emina',
                bio: 'blablabla',
                image: ''
            };
            $scope.register = function () {
                DataFactory.insert("users/users/register", $scope.user, function() {
                    ToasterService.pop('success', "Success", "Please login");
                    $location.path("/login");
                });
            }
        }])
}());