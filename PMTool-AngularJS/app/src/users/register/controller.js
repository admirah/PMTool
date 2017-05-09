import UserServices from './../services/module';

class Controller {
    constructor(UserService) {
    	console.log("JEDA");
        this.UserService = UserService;
        console.log(this.UserService);
    }
    getReportFullName(path) {
        console.log(path);
        return path.substring(21);
    }
}

Controller.$inject = ['UserService'];

export default angular.module( 'app.users.register', [ 'ngMaterial', 'ui.router', UserServices.name ])
	  .config(['$stateProvider', ($stateProvider) => {
		    $stateProvider.state('register', {
		    	url: '/register',
		    	templateUrl: 'src/users/register/template.html',
		    	controller: Controller});
}]).controller('RegisterController', Controller);