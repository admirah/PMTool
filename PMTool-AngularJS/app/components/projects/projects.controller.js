(function () {
    angular
        .module("NWT")
        .controller("ProjectsController", ['$scope', 'DataFactory', '$uibModal', 'ProjectFactory', 'ToasterService', function ($scope, DataFactory, $uibModal, ProjectFactory, ToasterService) {

            function ListProjects() {
                DataFactory.list("projects/project/project?userid=" + credentials.id, function (response) {
                    $scope.projects = response;
                });
            }

            ListProjects();

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
                    
                   /* DataFactory.insert("projects/project", project, function (response) {
                        ToasterService.pop('success', "Success", "Project added");
                        ListProjects();
                        pp=response;
                         console.log("Project");
                 
                   console.log(response);
                    });
                     project.id=pp.id;*/
                   DataFactory.insert("projects/project/member", project, function(response) {
                       console.log("Members");
                    console.log(response);
                });
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            };
        }]);
}());