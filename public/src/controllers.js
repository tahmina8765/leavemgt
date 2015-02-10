angular.module('ContactsApp')
    .controller('ListController', function ($scope, $rootScope, Leave, $location, options) {
        $rootScope.PAGE = "all";
        $scope.contacts = Leave.query();
        $scope.fields = ['dateFrom', 'dateTo', 'reason'].concat(options.displayed_fields);

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
        $scope.contact = new Leave({
            dateFrom: ['', 'date'],
            dateTo:  ['', 'date'],
            reason:  ['', 'text']            
        });

        $scope.save = function () {
            if ($scope.newContact.$invalid) {
                $scope.$broadcast('record:invalid');
            } else {
                $scope.contact.$save();
                $location.url('/leaves');
            }
        };
    })
    .controller('SingleController', function ($scope, $rootScope, $location, Leave, $routeParams) {
        $rootScope.PAGE = "single";
        $scope.contact = Leave.get({ id: parseInt($routeParams.id, 10) }); 
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
    });
