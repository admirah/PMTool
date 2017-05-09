class Controller {
    constructor($routeParams, $location) {
    	console.log($routeParams);
        console.log("LOGIN CONTROLLER")
    }
    getReportFullName(path) {
        console.log(path);
        return path.substring(21);
    }
}


Controller.$inject = [];
export default [Controller];
