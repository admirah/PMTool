(function () {
    angular
        .module("NWT")
        .factory("DataFactory", ['$http', 'ToasterService', function ($http, ToasterService) {
            var source = NWTConfig.source;
            $http.defaults.headers.common.Token = credentials.token;
            return {
                promise: function (dataSet) {
                    return $http.get(source + dataSet);
                },

                list: function (dataSet, callback, params) {
                    $http.get(source + dataSet, { params: params })
                        .then(function success(response) {
                            return callback(response.data);
                        }, function error(error) {
                            ToasterService.pop('error', "Error", error.data.message);
                        });

                },

                read: function (dataSet, id, callback) {
                    $http.get(source + dataSet + "/" + id)
                        .then(function success(response) {
                            return callback(response.data);
                        }, function error(error) {
                            ToasterService.pop('error', "Error", error.data.message);
                        });
                },

                insert: function (dataSet, data, callback, params) {
                    $http({ method: "post", url: source + dataSet, data: data, params: params })
                        .then(function success(response) {
                            return callback(response.data);
                        }, function error(error) {
                            ToasterService.pop('error', "Error", error.data.message);
                        });
                },

                update: function (dataSet, id, data, callback) {
                    $http({ method: "put", url: source + dataSet + "/" + id, data: data })
                        .then(function success(response) {
                            return callback(response.data);
                        }, function error(error) {
                            ToasterService.pop('error', "Error", error.data.message);
                        });
                },

                delete: function (dataSet, id, callback) {
                    $http({ method: "delete", url: source + dataSet + "/" + id })
                        .then(function success(response) {
                            return callback(response.data);
                        }, function error(error) {
                            ToasterService.pop('error', "Error", error.data.message);
                        });
                }
            };
        }]);
}());