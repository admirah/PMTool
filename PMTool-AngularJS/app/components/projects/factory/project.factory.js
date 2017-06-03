(function () {
    angular
        .module("NWT")
        .factory("ProjectFactory", function () {
            return {
                empty: function () {
                    return {
                        id: 0,
                        name: '',
                        description: '',
                        owner: credentials.id,
                        createdOn: new Date(),
                        startedOn: new Date(),
                        endOn: new Date()
                    }
                },
                emptyTask: function (projectId) {
                    return {
                        id: 0,
                        name: '',
                        description: '',
                        owner: credentials.id,
                        project: {
                            id: projectId
                        },
                        createdOn: new Date(),
                        startedOn: new Date(),
                        endOn: new Date(),
                        finishedOn: null,
                        taskStatus: 0,
                        weight: "LOW"
                    }
                },
                new_project: function(project) {
                    return {
                        id: project.id,
                        name: project.name,
                        description: project.description,
                        owner: project.owner,
                        startedOn: project.startedOn,
                        endOn: project.endOn,
                        members: project.members
                    }
                }
            };
        })
}());