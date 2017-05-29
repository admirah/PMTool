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
                }
            };
        })
}());