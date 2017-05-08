// Load libraries
import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-route';

import AppController from 'src/AppController';
import Login from 'src/users/login/module';

export default angular.module( 'app', [ 'ngMaterial', 'ngRoute', Login.name ] )
  .config(($mdIconProvider, $mdThemingProvider, $locationProvider) => {
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

    $locationProvider.hashPrefix(''); // Angular 1.6 defaults to '!'

  })
  .controller('AppController', AppController);
