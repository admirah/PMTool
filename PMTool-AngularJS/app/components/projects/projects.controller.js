(function () {
    angular
        .module("NWT")
        .controller("ProjectsController", ['$rootScope','$scope', 'DataFactory', '$uibModal', 'ProjectFactory', 'ToasterService', function ($rootScope, $scope, DataFactory, $uibModal, ProjectFactory, ToasterService) {
            $rootScope.members=[];
            console.log(credentials);
            function ListProjects() {
                DataFactory.list("projects/project/project?userid=" + credentials.id, function (response) {
                    $scope.projects = response;
                    $rootScope.members=response.members;
                    console.log(response);
                });
            }
            function ListBoards() {
                DataFactory.list("projects/project/projectMember?userid=" + credentials.id, function (response) {
                    $scope.boards = response;
                    console.log(response);
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

                    /* DataFactory.insert("projects/project", project, function (response) {
                         ToasterService.pop('success', "Success", "Project added");
                         ListProjects();
                         pp=response;
                          console.log("Project");
                  
                    console.log(response);
                     });
                      project.id=pp.id;*/
                    DataFactory.insert("projects/project/member", project, function (response) {
                              ToasterService.pop('success', "Success", "Project added");
                             ListProjects();
                        console.log("Members");
                        console.log(response);
                    });
                       
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            };
        }]);
}());