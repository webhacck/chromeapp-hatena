/* global angular */

angular.module('myApp', [])
    .controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
        var pageUrl; //対象URLの保持
        
        $scope.result; //はてブ数の保持
        $scope.comments; //はてブコメントの保持
        
        //開いているWebページのURLを取得
        chrome.tabs.getSelected(null, function(tab) {
            pageUrl = tab.url;
        });
        
        //イベント処理
        $scope.getUrl = function() {
            
            //はてブコメントの取得
            $http.jsonp('https://b.hatena.ne.jp/entry/jsonlite/', {
                params: {
                    callback: 'JSON_CALLBACK',
                    url: pageUrl
                }
            })
            //正常に取得できた時の処理
            .success(function(data) {
                
                //全ての「はてブコメント」を格納する配列
                var comments = [];
                
                //はてブ数の取得
                $scope.result = data.count + " users";
                
                //はてブコメントを1つずつ配列に格納
                angular.forEach(data.bookmarks, function(value, index) {
                    if(value.comment !== '') {
                        comments.push(value.comment+"　("+value.timestamp+")");
                    }
                });
                
                $scope.comments = comments;
            })
            //取得できなかった時の処理
            .error(function(err) {
                alert(err);
            })
        }
    }]);