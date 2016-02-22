'use strict';

/**
 * @ngdoc directive
 * @name expenseManagementApp.directive:upcomingTransactionDirective
 * @description
 * # upcomingTransactionDirective
 */
angular.module('expenseManagementApp')
  .directive('upcomingTransactionDirective', function($compile){
    return {
        restrict: "E",
        template: "<button>Upcoming Trasanction</button>",
        link: function( scope,element,attrs){
            scope.showModal = false;
            element.bind('click',function(){
                scope.showModal = !scope.showModal;
                if(scope.showModal){
                    angular.element(element[0].parentNode).append($compile("<div upcoming-transaction-template data='expneseServiceData.upcomingTransactionData'></div>")(scope));
                }else{
                    $(element[0].parentNode).find('[upcoming-transaction-template]').remove();
                };
            })
        }
    }
}).directive("upcomingTransactionTemplate", function($location){
    return{
        restrict: 'A',
        scope:{
          data : '='
        },
        templateUrl:'views/upcoming-transaction.html',
        link:function($scope,element,attrs){
            $scope.addUpcomingData = function(expneseType,id){
                $location.url(expneseType+"/"+id);
            }
        }
    }
});
