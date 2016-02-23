'use strict';

/**
 * @ngdoc function
 * @name expenseManagementApp.controller:IncomecontrollerCtrl
 * @description
 * # IncomecontrollerCtrl
 * Controller of the expenseManagementApp
 */
angular.module('expenseManagementApp')
  .controller('IncomecontrollerCtrl', function ( $scope,$routeParams, $location, ExpenseApiService,ExpenseDataFactory ) {
    $scope.expDetails = {};
    $scope.buttonValue = "Add";
    $scope.categoryType = [ 'Salary', 'Business', 'Interest', 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    $scope.expneseServiceData = {};
    var errorIs = true;
    $scope.type = 'Income';
    $scope.currentPage = "Income";
    var transactionId = 0;
    var data = {};
    $scope.showForm = false;
    var editValue = "";
    var upcomingDataObj = "";
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

    $scope.clearForm = function(){
       $scope.expDetails = "";
       $location.url("income");
    }
    $scope.showTransactionForm = function(){
        $scope.showForm = true;
    }
     $scope.hideTransactionForm = function(){
        $scope.showForm = false;
        $location.url("income");
    }

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
                  if( !ExpenseDataFactory.checkValidations($scope.expDetails) ){
                      if( ExpenseDataFactory.editTransaction($scope.expneseServiceData, $scope.expDetails, $scope.type) ){
                          $scope.buttonValue = "Add";
                          $scope.showForm = false;
                          $scope.expDetails = "";
                          $location.url("income");
                      }
                  }
            }else{
              if( ExpenseDataFactory.balanceCalculation( $scope.type, $scope.expneseServiceData, $scope.expDetails ) ){
                  $scope.expneseServiceData.expensesData.push( data );
                  $scope.expneseServiceData.expensesData.reverse();
                  if( upcomingDataObj.length != 0 ){
                      var index = $scope.expneseServiceData.upcomingTransactionData.indexOf( upcomingDataObj );
                      $scope.expneseServiceData.upcomingTransactionData.splice( index, 1 );
                      var parts = upcomingDataObj.date.split("/");
                      var changeMonth = parseInt(parts[1]) + 1;
                      if( changeMonth > 12 ){
                        changeMonth = '01';
                      }
                      var changeDate = parts[0]+"/"+ changeMonth+"/"+parts[2];
                      upcomingDataObj.date = changeDate;
                      $scope.expneseServiceData.upcomingTransactionData.push( upcomingDataObj );
                  }

                  ExpenseApiService.saveTransaction( $scope.expneseServiceData );
                  $scope.expenseData =  ExpenseDataFactory.getTrasanctionData($scope.expneseServiceData,$scope.type);
                  alert( "Record Added Successfully...!" );
                  $scope.expDetails = "";
                  $scope.showForm = false;
                  $('#searchBox').focus();
                  $location.url("income");
              }else{
                 alert( "Expense amount is more than balance amount...!" );
              }
            }
        }
    }

    $scope.deleteTransaction = function( obj ){
      $scope.expenseData = ExpenseDataFactory.deleteTransaction($scope.expneseServiceData,obj,$scope.type);
      $location.url("income");
    }

    $scope.updateTransaction = function( obj ){
      $scope.showForm = true;
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
      $location.url("income");
    }
  });
