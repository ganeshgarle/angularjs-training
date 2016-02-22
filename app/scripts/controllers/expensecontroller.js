'use strict';

/**
 * @ngdoc function
 * @name expenseManagementApp.controller:ExpensecontrollerCtrl
 * @description
 * # ExpensecontrollerCtrl
 * Controller of the expenseManagementApp
 */
angular.module('expenseManagementApp')
  .controller('ExpensecontrollerCtrl', function ( $scope, $routeParams, $location, ExpenseApiService, ExpenseDataFactory ) {
    $scope.expDetails = {};
    $scope.buttonValue = "Add";
    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    $scope.expneseServiceData = {};
    var errorIs = true;
    $scope.currentPage = "Expense"
    $scope.showForm = false;
    $scope.type = 'Expense';
    var transactionId = 0;
    var data = {};
    var editValue = "";
    var upcomingDataObj = "";

     $scope.z = 0;
    $scope.sum = function() {
      $scope.z = $scope.x + $scope.y;
    };

    if( ExpenseApiService.getTransactionData() == undefined ){
          ExpenseApiService.getTransactionDataFromMockApi().then(function(data){
              $scope.expneseServiceData = data;
              $scope.expenseData = ExpenseDataFactory.getTrasanctionData($scope.expneseServiceData,$scope.currentPage);
        });
    }else{
        $scope.expneseServiceData = ExpenseApiService.getTransactionData();
        $scope.expenseData = ExpenseDataFactory.getTrasanctionData($scope.expneseServiceData,$scope.type);
    }
    if( $routeParams.id != undefined ){
        upcomingDataObj = $scope.expneseServiceData.upcomingTransactionData.filter(function ( obj ) {
            return obj.upcomingtransactionId == $routeParams.id;
        })[0];
        $scope.showForm = true;
        $scope.expDetails.amount= upcomingDataObj.amount;
        $scope.expDetails.categorytype= upcomingDataObj.categorytype;
        $scope.expDetails.date= upcomingDataObj.date;
        $scope.expDetails.payer= upcomingDataObj.payer;
    }
    $scope.clearForm = function(){
      $scope.expDetails = "";
      $location.url("expenses");
    }
    $scope.showTransactionForm = function(){
      $scope.showForm = true;
    }
    $scope.hideTransactionForm = function(){
      $scope.showForm = false;
      $location.url("expenses");
    }

    $scope.errors = {
        'requiredPayerName': false,
        'requiredPayeeName': false,
        'requiredCatName': false,
        'requiredAmount': false,
         'requiredDate': false,
         'modeofPayment': false,
         'note': false,
         'noteLength': false
    };

    $scope.addTransaction = function() {
        if( ExpenseDataFactory.checkValidations( $scope.expDetails ) ){
            errorIs = true;
        }else {
            if( $scope.expneseServiceData.expensesData.length > 1 ){
                transactionId = $scope.expneseServiceData.expensesData.length;
            }
            transactionId = ExpenseDataFactory.createTransactionId(transactionId,$scope.expneseServiceData.expensesData);
            errorIs = false;
            data = {
                "transactionId":transactionId,
                "amount":$scope.expDetails.amount,
                "categorytype":$scope.expDetails.categorytype,
                "date":$scope.expDetails.date,
                "modeofpayment":$scope.expDetails.modeofpayment,
                "note":$scope.expDetails.note,
                "payee":$scope.expDetails.payee,
                "payer":$scope.expDetails.payer,
                "type":$scope.type
            }
        }
        if( !errorIs ) {
            if( $scope.buttonValue == "Edit" ){
                if( !ExpenseDataFactory.checkValidations($scope) ){
                      if( ExpenseDataFactory.editTransaction($scope.expneseServiceData, $scope.expDetails, $scope.type) ){
                          $scope.buttonValue = "Add";
                          $scope.showForm = false;
                          $scope.expDetails = "";
                          $location.url("expenses");
                      }
                  }
            }else{
                if( ExpenseDataFactory.balanceCalculation($scope.type, $scope.expneseServiceData, $scope.expDetails ) ){
                    $scope.expneseServiceData.expensesData.push( data );
                    $scope.expneseServiceData.expensesData.reverse();
                    ExpenseApiService.saveTransaction( $scope.expneseServiceData );
                    $scope.expenseData = ExpenseDataFactory.getTrasanctionData($scope.expneseServiceData,$scope.type);
                    alert( "Record Added Successfully...!" );
                    $scope.expDetails = "";
                    $scope.showForm = false;
                    $location.url("expenses");
                }else{
                   alert( "Expense amount is more than balance amount...!" );
                }
            }
          }
    }

    $scope.deleteTransaction = function( obj ){
        $scope.expenseData = ExpenseDataFactory.deleteTransaction($scope.expneseServiceData,obj,$scope.type);
        $location.url("expenses");
    }

    $scope.updateTransaction = function( obj ){
      $scope.showForm = true;
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }


  });
