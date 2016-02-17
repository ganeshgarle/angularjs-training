'use strict';

app.service('expneseMgtService',function( $http,$q ){
    var statementDetails;

    this.saveTransaction = function( data ){
      statementDetails = data;
      return data;
    }

      this.getTransactionData = function () {
          return statementDetails;
      };

    /*this.getData = function(){
           $http.get('mock_api/expensedata.json').success(function(response){
            statementDetails =  response;
           });
       return statementDetails;
     }
*/

     var deferred = $q.defer();
      this.getTransactionDataFromMockApi = function () {
          $http({
              method: 'GET',
              url: 'mock_api/expensedata.json'
          }).success(function (data) {
            statementDetails =  data;
              deferred.resolve(data);
          }).error(function (msg) {
              deferred.reject(msg+"error message:");
          });
          return deferred.promise;
      };
});