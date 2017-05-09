import UserServices from 'src/users/services/module';
import 'ngStorage';
export default angular.module('app.login', ['ngStorage', UserServices.name]).controller('loginController', ['UserService', '$scope', function(UserService, $scope){
	$scope.user = {username: "", password: ""};
	$scope.submitLogin = function(){
		UserService.authenticate($scope.user.username, $scope.user.password).then(function(res){
			console.log(res);
			//redirect to main site if login is sucessuful
		});
	}
}]).controller('registerController', ['UserService', '$scope', function(UserService, $scope){
	$scope.user = {username: "", email: "", name: "", password: "", confirmPassword: "", bio: ""};
	$scope.errorMsg = "";
	$scope.submitRegister = function() {
		if($scope.user.password != $scope.user.confirmPassword) {$scope.errorMsg = "Passwords must be identical."; return;}
		UserService.register($scope.user).then(function(res){
			console.log(res);
		})
	}
}])
.factory('UserService', UserService);
function UserService($http, $localStorage) {       
    return {
    	authenticate: function(username, password) {
          var encode = function(input){
            var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        };       // Encode the String
        console.log(username + " " + password);
        let encodedUsernameAndPass = encode(username+":"+password);

        $http.defaults.headers.common['Authorization'] = 'Basic ' + encodedUsernameAndPass;

        return $http.get('http://localhost:8082/login').then(function(resp){
            $localStorage.token = resp.data.Token;
            console.log(resp);
        });
    },
    register: function(user){
    	delete user.confirmPassword;
    	return $http.post('http://localhost:8082/users/register', user).then(function(res){
    		console.log(res);
    	})
    },
    getToken: function() {
        return $localStorage.token;
    }}
}

UserService.$inject = ['$http', '$localStorage'];