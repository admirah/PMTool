(function () {
    angular
        .module("NWT")
        .controller('ModalInstanceController', ['$rootScope', '$uibModalInstance', '$scope', 'DataFactory', 'data', function ($rootScope, $uibModalInstance, $scope, DataFactory, data) {

            var $modal = this;
            $modal.data = data;
            $modal.data.members=[]; //[{'name':'emina','id':7,'bio':'bla','email':'email'},{'name':'emi','id':4,'bio':'bla','email':'email'}];
            $modal.data.memberstable = $rootScope.members;
             function pushMembers() {
                for (var i = 0; i < $modal.data.memberstable.length; i++) {
                    var m=$modal.data.memberstable[i];
                    var url = "users/users/"+m.userId;
                      DataFactory.list(url, function (response) {
                        $modal.data.members.push(response);
                      
                });
                }
            }
            
                // pushMembers();
               
            $modal.username ="";
            function GetName(){
                var url="users/users/"+credentials.id;
                DataFactory.list(url, function (response) {
                      $modal.username=response.name;   
                      console.log(response.name);
                });
            }
            GetName();
            $modal.allusers = function (value) {

                var url = "users/users/name/" + value;
                if (value.length > 2) {
                    return DataFactory.promise(url).then(function (response) {
                        return response.data;
                    });
                }


            };
          

            $modal.ok = function () {
                $uibModalInstance.close($modal.data);
            };


            $modal.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            $modal.insertComment = function () {
                var comment = {
                    content: $modal.data.new_comment,
                    task: {
                        id: $modal.data.id
                    },
                    user: credentials.id,
                    createdOn: new Date(),
                    username : $modal.username
                };
                DataFactory.insert("projects/task/comment", comment, function (response) {
                    $modal.data.comments.push(comment);
                    $modal.data.new_comment = "";
                });
            };

        }]);

}());