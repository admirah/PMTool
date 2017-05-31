(function () {
    angular
        .module("NWT")
        .controller('ModalInstanceController', ['$uibModalInstance', '$scope', 'DataFactory', 'data', function ($uibModalInstance, $scope, DataFactory, data) {

            var $modal = this;

            $modal.data = data;
            $modal.data.members=[];
            $modal.allusers = function (value) {
                console.log(value);
                var url="users/users/name/" + value;
                if (value.length > 2) {
                    return DataFactory.promise(url).then(function (response) {
                        console.log(response);
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

            $modal.insertComment = function() {
                var comment = {
                    content: $modal.data.new_comment,
                    task: {
                        id: $modal.data.id
                    },
                    user: credentials.id,
                    createdOn: new Date()
                };
                DataFactory.insert("projects/task/comment", comment, function(response) {
                    $modal.data.comments.push(comment);
                     $modal.data.new_comment = "";
                });
            };

        }]);

}());