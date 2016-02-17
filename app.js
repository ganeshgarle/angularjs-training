var app = angular.module('expManagerApp', ['ngRoute']);
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'view/home.html',
        controller: 'expManagerCtrl'
        /*resolve: {
            myfun:resolvefunction
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


/*var interceptors =  function($q){
  return{
    request: function(config){
      console.log(config);
      return config;
    },

    response: function(result){
        console.log('respo');
        console.log(result);
        //result.data.splice(0,10).forEach(function(repo){
        //  console.log(respo.name);
       // })
        return result;
    },

    responseError: function(rejection){
        console.log('Failed With',rejection.status,'status');
        return $q.reject(rejection);
    }
  }
}*/
/*
app.config(function($httpProvider){
   $httpProvider.interceptors.push(interceptors);
   console.log($httpProvider);
}).run(function($http){
   $http.get('mock_api/expensedata.json');
})*/
/*app.config(function (movieProvider) {
  var datds = movieProvider.setVersion('Reloaded');
  console.log( datds );
});
app.provider('movie', function () {
  var version;
  return {
    setVersion: function (value) {
      console.log(value);
      version = value;
    },
    $get: function () {

      return {
          title: 'The Matrix' + ' ' + version
      }
    }
  }
});
function resolvefunction($http,$q){
  var deferred = $q.defer();
                $http({
                    method: 'GET',
                    url: 'mock_api/expensedata.json'
                }).success(function (data) {
                  statementDetails =  data;
                    deferred.resolve(data);
                }).error(function (msg) {
                    deferred.reject(msg+"error message:");
                });
                console.log(deferred);
                return deferred.promise;

};
*/
$("li").click(function(){
    $("li").removeClass("active");
    $(this).addClass("active");
  });