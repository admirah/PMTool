(function () {
    angular
        .module("NWT")
        .controller("LoginController", ['$scope', '$http', 'SessionService', 'ToasterService', '$rootScope', '$location', function ($scope, $http, SessionService, ToasterService, $rootScope, $location) {

            $http.get("config.json")
                .then(function (response) {
                    NWTConfig = response.data;
                    if(credentials !== null) $location.path(NWTConfig.DefaultRoute);
                }, function (reason) {
                    ToasterService.pop('error', "Error", "Username or password is incorrect");
                });

            $scope.user = {
                username: 'admin',
                password: 'admin'
            };
            $scope.registration = function(){
                  $window.location.href = 'app/components/sessions/templates/registration.html';
               window.location.reload();
            }
            $scope.login = function () {
                $http.defaults.headers.common.Authorization = "Basic " + SessionService.encode($scope.user.username + ":" + $scope.user.password);
                $http({
                    method: "GET",
                    url: NWTConfig.source + "login",
                }).then(function (response) {
                    credentials = response.data;
                    $rootScope.currentUser = {
                        id: credentials.id,
                        username: credentials.username
                    };
                    redirectTo = (redirectTo == "/logout") ? NWTConfig.DefaultRoute : redirectTo;
                    $location.path(redirectTo);
                }, function (reason) {
                    ToasterService.pop('error', "Error", "Username or password is incorrect");
                });
            }
        }])
        .controller("LogoutController", function() {
            credentials = null;
            window.location.reload();
        })
        .controller("RegistrationController", function(){
            $window.location.href = 'app/components/sessions/templates/registration.html';
               window.location.reload();
        });
        
}());