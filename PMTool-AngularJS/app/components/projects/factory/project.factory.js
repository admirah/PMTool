(function() {
    angular
        .module("NWT")
        .factory("ProjectFactory", function() {
            return {
                empty: function() {
                    return {
                        id: 0,
                        name: '',
                        description: '',
                        owner: credentials.id,
                        createdOn: new Date(),
                        startedOn: new Date(),
                        endOn: new Date()
                    }
                }
            };
        })
}());