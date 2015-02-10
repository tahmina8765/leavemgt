angular.module('contactsApp')
    .factory('Leave', function ($resource) {
        return $resource('/api/leave/:id', { id: '@id' }, {
            'update': { method: 'PUT' }
        });
    })
    .factory('User', function ($resource) {
        return $resource('/api/user/:id', { id: '@id' }, {
            'update': { method: 'PUT' }
        });
    })
    .factory('Fields', function ($q, $http, Leave) {
        var url = '/options/displayed_fields',
            ignore = ['dateFrom', 'dateTo', 'id', 'userId'],
            allFields = [],
            deferred = $q.defer(),

            contacts = Leave.query(function () {
                contacts.forEach(function (c) {
                    Object.keys(c).forEach(function (k) {
                        if (allFields.indexOf(k) < 0 && ignore.indexOf(k) < 0) allFields.push(k);
                    });
                });
                deferred.resolve(allFields);
            });

        return {
            get: function () {
                return $http.get(url);
            },
            set: function (newFields) {
                return $http.post(url, { fields: newFields });
            },
            headers: function () {
                return deferred.promise;
            }
        };
    });
