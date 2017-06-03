(function () {
    angular
        .module("NWT")
        .controller("ProjectsController", ['$rootScope', '$scope', 'DataFactory', '$uibModal', 'ProjectFactory', 'ToasterService', function ($rootScope, $scope, DataFactory, $uibModal, ProjectFactory, ToasterService) {
            $rootScope.members = [];
            function ListProjects() {
                DataFactory.list("projects/project/project?userid=" + credentials.id, function (response) {
                    $scope.projects = response;
                    $rootScope.members = response.members;
                });
            }
            function ListBoards() {
                DataFactory.list("projects/project/projectMember?userid=" + credentials.id, function (response) {
                    $scope.boards = response;
                });
            }
            ListProjects();
            ListBoards();
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
                    DataFactory.insert("projects/project/member", project, function (response) {
                        ToasterService.pop('success', "Success", "Project added");
                        ListProjects();
                    });

                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            };
        }]);
}());