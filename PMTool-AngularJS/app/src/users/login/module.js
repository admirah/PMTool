import template from './template.html';
import controller from './controller';

export default angular.module('login', []).config(function ($routeProvider) {
    $routeProvider.when('/login', {
        template: template
    });
})
    .controller('LoginController', controller);
