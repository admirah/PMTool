(function () {
    angular
        .module("NWT")
        .controller("ProjectsShowController", ["$scope", '$routeParams', 'DataFactory', '$uibModal', 'ProjectFactory', 'ToasterService', function ($scope, $routeParams, DataFactory, $uibModal, ProjectFactory, ToasterService) {
            var projectId = $routeParams.id;

            var taskStates = {
                "Backlog": 0,
                "Sprint": 1,
                "In progress": 2,
                "QA": 3,
                "Done": 4,
            };

            var weights = {
                "LOW": 0,
                "MEDIUM": 1,
                "HIGH": 2
            };

            function ListTasks() {

                $scope.model = [
                    { label: "Backlog", data: [] },
                    { label: "Sprint", data: [] },
                    { label: "In progress", data: [] },
                    { label: "QA", data: [] },
                    { label: "Done", data: [] }
                ];

                DataFactory.list("projects/project/" + projectId, function (response) {
                    $scope.project = response;
                    console.log(response);
                    response.tasks.forEach(function (element) {
                        switch (element.taskStatus) {
                            case "BACKLOG":
                                $scope.model[0].data.push(element);
                                break;
                            case "SPRINT":
                                $scope.model[1].data.push(element);
                                break;
                            case "INPROGRESS":
                                $scope.model[2].data.push(element);
                                break;
                            case "QA":
                                $scope.model[3].data.push(element);
                                break;
                            case "DONE":
                                $scope.model[4].data.push(element);
                                break;
                        }
                    }, this);
                });
            }

            ListTasks();

            $scope.info = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/projects/templates/show_project.html',
                    controller: 'ModalInstanceController',
                    controllerAs: '$modal',
                    size: "lg",
                    resolve: {
                        data: function () {
                            return $scope.project
                        }
                    }
                });

                modalInstance.result.then(function (project) {
                    DataFactory.insert("projects/project", project, function (response) {
                        ToasterService.pop('success', "Success", "Project edited");
                        ListProjects();
                    });
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            }

            $scope.new = function () {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/projects/templates/new_task.html',
                    controller: 'ModalInstanceController',
                    controllerAs: '$modal',
                    size: "lg",
                    resolve: {
                        data: function () {
                            return ProjectFactory.emptyTask(projectId);
                        }
                    }
                });

                modalInstance.result.then(function (task) {
                    task.weight = weights[task.weight];
                    console.log(task);
                    DataFactory.insert("projects/task", task, function (response) {
                        ToasterService.pop('success', "Success", "Task added to backlog");
                        ListTasks();
                    });
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            };



            $scope.taskDetails = function (task) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/projects/templates/new_task.html',
                    controller: 'ModalInstanceController',
                    controllerAs: '$modal',
                    size: "lg",
                    resolve: {
                        data: function () {
                            return task;
                        }
                    }
                });

                modalInstance.result.then(function (task) {
                    DataFactory.update("projects/task", task.id, task, function (response) {
                        ToasterService.pop('success', "Success", "Task edited");
                    });
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            }

            $scope.show = function (task) {
                console.log(task);
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'app/components/projects/templates/show_task.html',
                    controller: 'ModalInstanceController',
                    controllerAs: '$modal',
                    resolve: {
                        data: function () {
                            return task;
                        }
                    }
                });

                modalInstance.result.then(function (task) {
                    DataFactory.delete("projects/task", task.id, function (response) {
                        ToasterService.pop('success', "Success", "Task deleted");
                        ListTasks();
                    });
                }, function () {
                    ToasterService.pop('info', "Info", "Modal closed");
                });
            }

            $scope.onDrop = function (srcList, srcIndex, targetList, targetIndex, new_status, task) {
                task.taskStatus = taskStates[new_status];
                DataFactory.update("projects/task", task.id, task, function (response) {
                    ToasterService.pop('success', "Success", "Task new status: " + new_status);
                    ListTasks();
                });
                // Copy the item from source to target.
                targetList.splice(targetIndex, 0, srcList[srcIndex]);
                // Remove the item from the source, possibly correcting the index first.
                // We must do this immediately, otherwise ng-repeat complains about duplicates.
                if (srcList == targetList && targetIndex <= srcIndex) srcIndex++;
                srcList.splice(srcIndex, 1);
                // By returning true from dnd-drop we signalize we already inserted the item.
                return true;
            };

        }]);
}());