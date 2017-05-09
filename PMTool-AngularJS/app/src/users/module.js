import 'angular';
import 'angular-ui-router';

import loginController from './login/controller';
import registerController from './register/controller';

export default angular.module( 'app.users', [ 'ngMaterial', 'ui.router'] )
  .config(['$mdIconProvider', '$mdThemingProvider', '$stateProvider', ($mdIconProvider, $mdThemingProvider, $stateProvider) => {
    $stateProvider.state('login', {
    	url: '/login',
    	templateUrl: 'src/users/login/template.html',
    	controller: loginController
    });
    $stateProvider.state('register', {
    	url: '/register',
    	templateUrl: 'src/users/register/template.html',
    	controller: registerController
    });
  }]);