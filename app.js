var app = angular.module('expManagerApp', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'view/home.html',
        controller: 'expManagerCtrl',
       /* resolve: {
            "myfun":function(){
                console.log("ssssss");
            }
        }*/
    }).
      when('/income', {
        templateUrl: 'view/income.html',
        controller: 'expManagerIncomeCtrl'
      }).
      when('/expenses', {
        templateUrl: 'view/income.html',
        controller: 'expManagerExpenseCtrl'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
