angular.module('contactsApp')
        .controller('ListController', function ($scope, $rootScope, Leave, $location, options) {
            $rootScope.PAGE = "all";
            $scope.leaves = Leave.query();
            $scope.fields = ['dateFrom', 'dateTo', 'reason', 'days'].concat(options.displayed_fields);

            $scope.sort = function (field) {
                $scope.sort.field = field;
                $scope.sort.order = !$scope.sort.order;
            };

            $scope.sort.field = 'dateFrom';
            $scope.sort.order = false;

            $scope.show = function (id) {
                $location.url('/leave/' + id);
            };
        })
        .controller('NewController', function ($scope, $rootScope, Leave, $location) {
            $rootScope.PAGE = "new";
            $scope.leave = new Leave({
                dateFrom: ['', 'date'],
                dateTo: ['', 'date'],
                reason: ['', 'text']
            });

            $scope.save = function () {
                if ($scope.newLeave.$invalid) {
                    $scope.$broadcast('record:invalid');
                } else {
                    // Find Total Day
                    var d1 = new Date($scope.leave.dateFrom[0]);
                    var d2 = new Date($scope.leave.dateTo[0]);
                    var miliseconds = d2 - d1;
                    var seconds = miliseconds / 1000;
                    var minutes = seconds / 60;
                    var hours = minutes / 60;
                    var days = (hours / 24) + 1;
                    $scope.leave.days = [days, 'text'];

                    $scope.leave.$save();
                    $location.url('/leaves');
                }
            };
        })
        .controller('SingleController', function ($scope, $rootScope, $location, Leave, $routeParams) {
            $rootScope.PAGE = "single";
            $scope.contact = Leave.get({id: parseInt($routeParams.id, 10)});
            $scope.delete = function () {
                $scope.contact.$delete();
                $location.url('/leaves');
            };
        })
        .controller('SettingsController', function ($scope, $rootScope, options, Fields) {
            $rootScope.PAGE = 'settings';

            $scope.allFields = [];
            $scope.fields = options.displayed_fields;

            Fields.headers().then(function (data) {
                $scope.allFields = data;
            });

            $scope.toggle = function (field) {
                var i = options.displayed_fields.indexOf(field);

                if (i > -1) {
                    options.displayed_fields.splice(i, 1);
                } else {
                    options.displayed_fields.push(field);
                }

                Fields.set(options.displayed_fields);
            };
        })
        .controller('UsersListController', function ($scope, $rootScope, User, $location, options) {
            $rootScope.PAGE = "all-users";
            $scope.users = User.query();
            $scope.fields = ['name', 'designation', 'username'];

            $scope.sort = function (field) {
                $scope.sort.field = field;
                $scope.sort.order = !$scope.sort.order;
            };

            $scope.sort.field = 'username';
            $scope.sort.order = false;

            $scope.show = function (id) {
                $location.url('/user/' + id);
            };
        })
        .controller('UsersNewController', function ($scope, $rootScope, User, $location) {
            $rootScope.PAGE = "new-user";
            $scope.user = new User({
                name: '',
                designation: '',
                username: '',
                password: '',
                allocated: '',
                taken: ''
            });

            $scope.save = function () {
                if ($scope.newUser.$invalid) {
                    $scope.$broadcast('record:invalid');
                } else {
                    $scope.user.password =  hash($scope.user.password);
                    $scope.user.$save();
                    $location.url('/users');
                }
            };
        })
        ;
