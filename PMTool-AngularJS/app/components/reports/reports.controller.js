(function () {
    angular
        .module("NWT")
        .controller("ReportsController", ['$scope', '$routeParams', 'DataFactory', 'ToasterService', function ($scope, $routeParams, DataFactory, ToasterService) {

            var projectId = $routeParams.id;
            var userId = credentials.id;

            DataFactory.read("projects/project/report", projectId, function (response) {
                console.log(response);
                $scope.report = response;
                var percentTasks = Math.floor(response.tasksDone / response.numberOfTasks * 100);
                angular.element('#first-circle').addClass("p" + percentTasks);


                var taskStatus = setTaskStatus(response.tasksInStatus);

                $scope.taskStatusReport = {
                    data: taskStatus.data,
                    options: taskStatus.options
                };

                var taskWeight = setTaskWeights(response.tasksInWeights);
                
                $scope.taskWeightReport = {
                    data: taskWeight.data,
                    options: taskWeight.options
                };

            });

            function setTaskWeights(result) {
                var data = [];
                data.push({ key: "LOW", value: result["LOW"] });
                data.push({ key: "MEDIUM", value: result["MEDIUM"] });
                data.push({ key: "HIGH", value: result["HIGH"] });
                return {
                    data: data,
                    options: {
                        chart: {
                            type: 'pieChart',
                            height: 650,
                            x: function (d) {
                                return d.key;
                            },
                            y: function (d) {
                                return d.value;
                            },
                            showLabels: true,
                            duration: 500,
                            labelThreshold: 0.01,
                            labelSunbeamLayout: true
                        }
                    }
                }
            }

            function setTaskStatus(result) {
                var data = [];
                data.push({ label: "BACKLOG", value: result["BACKLOG"] });
                data.push({ label: "DONE", value: result["DONE"] });
                data.push({ label: "INPROGRESS", value: result["INPROGRESS"] });
                data.push({ label: "QA", value: result["QA"] });
                data.push({ label: "SPRINT", value: result["SPRINT"] });

                return {
                    data: [{ key: "Tasks By Status", values: data }],
                    options: {
                        chart: {
                            type: 'discreteBarChart',
                            height: 550,
                            x: function (d) {
                                return d.label;
                            },
                            y: function (d) {
                                return d.value;
                            },
                            margin: {
                                top: 20,
                                right: 100,
                                bottom: 100,
                                left: 100
                            },
                            showValues: false,
                            duration: 500,
                            yAxis: {
                                tickFormat: function (d) {
                                    return d3.format('d')(d);
                                }
                            },
                        },
                        title: {
                            enable: true,
                            text: 'Task By Status'
                        }
                    }
                }
            }

        }]);
}());