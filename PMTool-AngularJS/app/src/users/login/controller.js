class Controller {
    constructor($routeParams, $location) {
        console.log("LOGIN CONTROLLER")
    }
    getReportFullName(path) {
        console.log(path);
        return path.substring(21);
    }
}


Controller.$inject = ['$routeParams', '$location'];
export default ["$routeParams", "$location", Controller];
