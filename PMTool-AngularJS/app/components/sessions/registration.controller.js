(function() {
    angular
        .module("NWT")
        .controller("RegistrationController", ['$scope', 'DataFactory', function($scope, DataFactory) {
            $scope.message = "Helloooo";
        }])
}());