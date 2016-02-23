'use strict';

/**
 * @ngdoc directive
 * @name expenseManagementApp.directive:upcomingTransactionDirective
 * @description
 * # upcomingTransactionDirective
 */
angular.module('expenseManagementApp')
  .directive("upcomingTransactionTemplate", function(){
    return{
        restrict: 'A',
        scope:{
          data : '='
        },
        templateUrl:'views/upcoming-transaction.html',
        controller: 'HomecontrollerCtrl',
        link:function($scope,element,attrs){
            $scope.showNewModal = false;
            if($scope.data.length === 0){
                $scope.showNewModal = true;
            }
        }
    }
});
