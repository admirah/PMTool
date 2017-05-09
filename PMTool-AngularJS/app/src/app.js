// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';
import AppController from 'src/AppController';
import UsersModule from 'src/users/module';
import UserServices from 'src/users/services/module';

export default angular.module( 'app', [ 'ngMaterial', 'ui.router', UserServices.name, UsersModule.name] )
  .config(['$mdIconProvider', '$mdThemingProvider', '$urlRouterProvider', '$stateProvider', ($mdIconProvider, $mdThemingProvider, $urlRouterProvider, $stateProvider) => {
    // Register the user `avatar` icons
    $mdIconProvider
      .defaultIconSet("./assets/svg/avatars.svg", 128)
      .icon("menu", "./assets/svg/menu.svg", 24)
      .icon("share", "./assets/svg/share.svg", 24)
      .icon("google_plus", "./assets/svg/google_plus.svg", 24)
      .icon("hangouts", "./assets/svg/hangouts.svg", 24)
      .icon("twitter", "./assets/svg/twitter.svg", 24)
      .icon("phone", "./assets/svg/phone.svg", 24);

    $mdThemingProvider.theme('default')
      .primaryPalette('brown')
      .accentPalette('red');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('login', {
          url: '/login',
          templateUrl: 'src/users/login/template.html',
          controller: "loginController"
        })
        .state('register', {
          url: '/register',
          templateUrl: 'src/users/register/template.html',
          controller: "registerController"
    });

  }])
  .controller('AppController', AppController);
