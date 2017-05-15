(function() {
    angular
        .module("NWT")
        .controller("ProjectsController", ['$scope', 'DataFactory', function($scope, DataFactory) {
            $scope.message = "Hello Projects";
        }])
}());