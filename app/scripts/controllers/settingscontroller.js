'use strict';

/**
 * @ngdoc function
 * @name expenseManagementApp.controller:SettingscontrollerCtrl
 * @description
 * # SettingscontrollerCtrl
 * Controller of the expenseManagementApp
 */
angular.module('expenseManagementApp')
  .controller('SettingscontrollerCtrl', function ($scope,ExpenseApiService,ExpenseDataFactory) {
    var transactionId = 0;
     var errorIs = true;
    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.trasactionType = [ 'Income', 'Expense'];

     if( ExpenseApiService.getTransactionData() == undefined ){
        ExpenseApiService.getTransactionDataFromMockApi().then(function(data){
          $scope.expneseServiceData = data;
          $scope.expenseData = ExpenseDataFactory.getTrasanctionData( $scope.expneseServiceData, $scope.currentPage );
        });

    }else{
        $scope.expneseServiceData = ExpenseApiService.getTransactionData();
        $scope.expenseData = ExpenseDataFactory.getTrasanctionData( $scope.expneseServiceData, $scope.currentPage );
    }
    $scope.upcomingData = {};
    $scope.addNewUpcomingData = function(){
      $scope.errors = { requiredPayerName:true, requiredType:true, requiredCatName:true, requiredAmount:true,
        requiredDate:true};
      $scope.errors.requiredPayerName = !$scope.upcomingData.payer ? true : $scope.upcomingData.payer === undefined ? true : false;
      $scope.errors.requiredType = $scope.upcomingData.type === undefined ? true : false;
      $scope.errors.requiredCatName = $scope.upcomingData.categorytype === undefined ? true : false;
      $scope.errors.requiredAmount = !$scope.upcomingData.amount ? true : $scope.upcomingData.amount === undefined ? true : false;
      $scope.errors.requiredDate = !$scope.upcomingData.date ? true : $scope.upcomingData.date === undefined ? true : false;
      if( $scope.errors.requiredPayerName ||  $scope.errors.requiredType || $scope.errors.requiredCatName || $scope.errors.requiredAmount || $scope.errors.requiredDate ){
      }else{
            if( $scope.expneseServiceData.upcomingTransactionData.length > 1 ){
                  transactionId = $scope.expneseServiceData.upcomingTransactionData.length;
              }
              transactionId = ExpenseDataFactory.createTransactionId(transactionId,$scope.expneseServiceData.upcomingTransactionData);
              errorIs = false;
              var data = {
                  "upcomingtransactionId":transactionId,
                  "amount":$scope.upcomingData.amount,
                  "categorytype":$scope.upcomingData.categorytype,
                  "date":$scope.upcomingData.date,
                  "payer":$scope.upcomingData.payer,
                  "type":$scope.upcomingData.type
              }
              $scope.expneseServiceData.upcomingTransactionData.push( data );
              ExpenseApiService.saveTransaction( $scope.expneseServiceData );
              alert('Successfully added new upcoming data');
              $scope.upcomingData = "";
        }
    }
    $scope.cancel = function(){
      $scope.upcomingData = "";
    }
  });
