angular.module('contactsApp', ['ngRoute', 'ngResource', 'ngMessages'])
    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/leaves', {
                controller: 'ListController',
                templateUrl: 'views/list.html'
            })
            .when('/leave/new', {
                controller: 'NewController',
                templateUrl: 'views/new.html'
            })
            .when('/leave/:id', {
                controller: 'SingleController',
                templateUrl: 'views/single.html'
            })
            .when('/users', {
                controller: 'UsersListController',
                templateUrl: 'views/users/list.html'
            })
            .when('/settings', {
                controller: 'SettingsController',
                templateUrl: 'views/settings.html'
            })
            .otherwise({
                redirectTo: '/leaves'   
            });
        $locationProvider.html5Mode(true);
    })
    .value('options', {})
    .run(function (options, Fields) {
        Fields.get().success(function (data) {
            options.displayed_fields = data;
        });
    });
