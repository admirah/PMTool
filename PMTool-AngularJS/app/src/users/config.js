import from 'angular';
import from 'angular-ui-router';

import 'angular';
import 'angular-ui-router';

export default angular.module( 'app.users', [ 'ngMaterial', 'ui.router'] )
  .config(($mdIconProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) => {
    $urlRouterProvider.otherwise("/"); //default to home
  });