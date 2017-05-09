// Load the custom app ES6 modules
import 'ngStorage';

import UsersService from 'src/usersbekap/services/UsersService';

import UsersList from 'src/usersbekap/components/list/UsersList';
import UserDetails from 'src/usersbekap/components/details/UserDetails';
import UserServices from 'src/users/services/user.service';

// Define the Angular 'users' module

export default angular
  .module("users", ['ngMaterial', 'UserServices.name', 'ngStorage'])
  .config(['$stateProvider', function($stateProvider) {
  	$stateProvider.state('register1', {
  		url: '/register1',
  		template: '<user-details></user-details>'
  	});
  }])
  .component(UserDetails.name, UserDetails.config)

  .service("UsersService", ['$localStorage', UsersDataService]);
