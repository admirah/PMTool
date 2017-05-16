(function () {

    var app = angular.module("NWT", ["ngRoute", "ui.bootstrap", "LocalStorageModule"]);

    credentials = {
        token: "",
        expiration: "",
        id: 0,
        username: ""
    };

    redirectTo = '/';

    function authenticated() {
        if (credentials === null) return false;
        return (credentials.id !== 0);
    }

    app.config(function ($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "app/components/sessions/templates/login.html",
                controller: "LoginController"
            })
            .when("/logout", {
                template: "",
                controller: "LogoutController"
            })
            .when("/registration", {
                templateUrl: "app/components/sessions/templates/registration.html",
                controller: "RegistrationController"
            })
            .when("/projects", {
                templateUrl: "app/components/projects/templates/projects.html",
                controller: "ProjectsController"
            })
            .otherwise({ redirectTo: "/projects" });
    }).run(function ($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!authenticated()) {
                var restrictedPage = $.inArray($location.path(), ['/login', '/registration']) === -1;
                if (restrictedPage) {
                    if (next.templateUrl != "app/components/sessions/templates/login.html") {
                        redirectTo = $location.path();
                        $location.path("/login");
                    }
                }
            }
        });
        $rootScope.authenticated = authenticated;
    });
}());
