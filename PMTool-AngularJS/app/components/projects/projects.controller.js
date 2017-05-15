(function () {
    angular
        .module("NWT")
        .controller("ProjectsController", ['$scope', 'DataFactory', '$uibModal', 'ProjectFactory', 'ToasterService', function ($scope, DataFactory, $uibModal, ProjectFactory, ToasterService) {
            $scope.new = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/projects/templates/new.html',
                    controller: 'ModalInstanceController',
                    controllerAs: '$modal',
                    size: "lg",
                    resolve: {
                        data: function () {
                            return ProjectFactory.empty();
                        }
                    }
                });

                modalInstance.result.then(function (project) {
                    DataFactory.insert("projects/project", project, function(response) {
                        ToasterService.pop('success', "Success", "Project added");
                    });
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            }
        }])
}());