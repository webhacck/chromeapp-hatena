/* global angular */

angular.module('myApp', [])
    .controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
        $scope.counts = 0;
        $scope.result;
        $scope.url;
        $scope.comments;
        
        chrome.tabs.getSelected(null, function(tab) {
            $scope.url = tab.url;
        });
        
        $scope.getUrl = function() {
            $http.jsonp('https://b.hatena.ne.jp/entry/jsonlite/', {
                params: {
                    callback: 'JSON_CALLBACK',
                    url: $scope.url
                }
            })
            .success(function(data) {
                var comments = [];
                
                $scope.result = data.count + " users";
                angular.forEach(data.bookmarks, function(value, index) {
                    if(value.comment !== '') {
                        comments.push(value.comment+"　("+value.timestamp+")");
                    }
                });
                console.log(data);
                $scope.comments = comments;
            })
            .error(function(err) {
                alert(err);
            })
        }
    }]);