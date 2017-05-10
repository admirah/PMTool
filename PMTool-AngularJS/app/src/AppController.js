/**
 * Main App Controller for the Angular Material Starter App
 * @param UsersDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController($mdSidenav, $scope, $localStorage) {
	$scope.message = $localStorage.Token ? "You are logged in. CONGRATS :)" : "You are not logged in :("; 
}

export default ['$mdSidenav', '$scope', '$localStorage', AppController];
