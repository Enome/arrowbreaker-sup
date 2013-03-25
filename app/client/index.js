var angular = window.angular;
var sup = angular.module('sup', []);


var filters = require('./filters');

sup.filter('css', filters.cssFilter);
sup.filter('name', filters.nameFilter);
sup.filter('tinyUrl', filters.tinyUrlFilter);


var services = require('./services');

sup.factory('events', services.events);
sup.factory('socket', services.socket);


var controller = require('./controllers');

sup.controller('createCtrl', controller.createCtrl);
sup.controller('urlsCtrl', controller.urlsCtrl);
sup.controller('urlCtrl', controller.urlCtrl);
sup.controller('modalCtrl', controller.modalCtrl);
