'use strict';

/**
 * @ngdoc service
 * @name expenseManagementApp.ExpenseApiService
 * @description
 * # ExpenseApiService
 * Service in the expenseManagementApp.
 */
angular.module('expenseManagementApp')
  .service('ExpenseApiService', function ( $http,$q ) {
      // AngularJS will instantiate a singleton by calling "new" on this function
      var statementDetails;

      this.saveTransaction = function( data ){
        statementDetails = data;
        return data;
      }

      this.getTransactionData = function () {
          return statementDetails;
      };
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
