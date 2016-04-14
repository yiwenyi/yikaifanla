/**
 * Created by Zyra on 2016/3/19.
 */
angular.module('kaifanla', ['ng', 'ngTouch'])
    .controller('parentCtrl', function ($scope, $http) {
        //console.log('parentCtrl');
        angular.element(document).on('pagecreate', function (event) {
            //console.log('一个新page被创建了');
            var target = event.target;
            console.log(target);
            var scope = angular.element(target).scope();
            angular.element(target).injector().invoke(function ($compile) {
                $compile(angular.element(target))(scope);
                scope.$digest();
            })
        });
        $(document).delegate('.kfl-children', 'swipeleft', function () {
            $.mobile.changePage('main.html', {transition: 'flow'})
        });
        $scope.jump = function (url) {
            $.mobile.changePage(url, {transition: 'turn'})
        };
        $(document).delegate('#main-list img', 'click', function () {
            $.mobile.changePage('detail.html', {transition: 'flow'})
        });
        $scope.jump2Orders = function () {//跳转到所有订单页
            $.mobile.changePage('myOrders.html', 'flow')
        };
    })
    .controller('startCtrl', function ($scope) {
    })
    .controller('mainCtrl', function ($scope, $http) {
        $http.get('data/dish_getbypage.php')
            .success(function (data) {//加载主菜单
                //console.log('请求数据成功')
                //console.log(data);
                $scope.dishList = data;
                //console.log($scope.dishList)
                $scope.jump2Detail = function (did) {//跳转到详情页
                    sessionStorage.setItem('did', did);
                    $.mobile.changePage('detail.html', 'flow')
                };
                //加载更多功能
                $scope.hasMore = true;
                $scope.loadingMore = function () {
                    $http.get('data/dish_getbypage.php?main=' + $scope.dishList.length)
                        .success(function (data) {
                            if (data.length < 5) {
                                $scope.hasMore = false;
                            }
                            $scope.dishList = $scope.dishList.concat(data);
                        })
                };
            });
        //关键字搜索功能
        $scope.$watch('kw', function () {
            if ($scope.kw) {
                $http.get('data/dish_getbykw.php?kw=' + $scope.kw)
                    .success(function (data) {
                        $scope.dishList = data;
                    })
            }
        })
    })
    .controller('detailCtrl', function ($scope, $http) {
        var did = sessionStorage.getItem('did');
        $http.get('data/dish_getbyid.php?did=' + did)
            .success(function (data) {
                $scope.dish = data[0];
                //console.log(data[0]);
            })
    })
    .controller('orderCtrl', function ($scope, $http) {
        var did = sessionStorage.getItem('did');
        $scope.order = {};
        $scope.order.did = did;
        /*测试数据
         $scope.order.userName = 'yiyimei';
         $scope.order.gender = '2';
         $scope.order.phone = '13701234567';
         $scope.order.addr = '人和繁荣街2号'*/
        $scope.showWarning = false;
        $scope.submitOrder = function () {
            //console.log($scope.order)
            var result = $.param($scope.order);
            //console.log(result);
            $http.get('data/order_add.php?' + result)
                .success(function (data) {
                    //console.log('请求成功')
                    //console.log(data);
                    $scope.state = data;
                    if ($scope.state.status = 400) {
                        $scope.showWarning = true;
                    }
                })
        }

    })
    .controller('myordersCtrl',function($scope,$http){
        $http.get('data/orders_getbydb.php')
            .success(function(data){
                $scope.orders = data;
                //console.log(data)
            })
    })


