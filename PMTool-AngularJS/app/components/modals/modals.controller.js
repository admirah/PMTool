(function () {
    angular
        .module("NWT")
        .controller('ModalInstanceController', ['$uibModalInstance', '$scope', 'DataFactory', 'data', function ($uibModalInstance, $scope, DataFactory, data) {

            var $modal = this;

            $modal.data = data;
    
            $modal.ok = function () {
                $uibModalInstance.close($modal.data);
            };


            $modal.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

        }]);

}());