import 'ngStorage';

import UserService from './user.service';

var appModule = angular.module( 'app.users.services', ['ngStorage'] );
appModule.service('UserService', UserService);
export default appModule;
