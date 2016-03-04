'use strict';

/**
 * @ngdoc function
 * @name expenseManagementApp.controller:HomecontrollerCtrl
 * @description
 * # HomecontrollerCtrl
 * Controller of the expenseManagementApp
 */
angular.module('expenseManagementApp')
  .controller('HomecontrollerCtrl', function ( $scope, $location,ExpenseApiService,ExpenseDataFactory ) {
     $scope.expDetails = {};
    $scope.buttonValue = "Add";
    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.trasactionType = [ 'Income', 'Expense'];
    $scope.expenseData = [];
    var errorIs = true;
    var transactionId = 0;
    $scope.expneseServiceData = {};
    $scope.currentPage = "home";
    $scope.selectedTab = "home";
    $scope.count = 0;
    $scope.selectTabs = function(tab){
      $scope.selectedTab = tab;
    }
    if( ExpenseApiService.getTransactionData() == undefined ){
        ExpenseApiService.getTransactionDataFromMockApi().then(function(data){
          $scope.expneseServiceData = data;
          $scope.expenseData = ExpenseDataFactory.getTrasanctionData( $scope.expneseServiceData, $scope.currentPage );
        });

    }else{
        $scope.expneseServiceData = ExpenseApiService.getTransactionData();
        $scope.expenseData = ExpenseDataFactory.getTrasanctionData( $scope.expneseServiceData, $scope.currentPage );
    }

    $scope.deleteTransaction = function( objId,type ){
      // $scope.expenseData = ExpenseDataFactory.deleteTransaction( $scope.expneseServiceData, obj, type, $scope.currentPage );

      $scope.expenseData = ExpenseDataFactory.deleteTransaction($scope.expneseServiceData,objId,type, $scope.currentPage);
        $scope.addedSuccess = $scope.expenseData.delete;
        if($scope.addedSuccess){
          $scope.addedSuccess = true;
         console.log( "Delete Successfull..!" );
        }else{
          $scope.addedSuccess = false;
          console.log( "Record Is Not Delete!" );
        }
        delete $scope.expenseData.delete;
    }
    var editValue = "";
    $scope.updateTransaction = function( obj ){
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }
    $scope.deleteUpcomingData = function(upcomingdataObj){
       var index = $scope.expneseServiceData.upcomingTransactionData.indexOf( upcomingdataObj );
        $scope.expneseServiceData.upcomingTransactionData.splice( index, 1 );
        ExpenseApiService.saveTransaction( $scope.expneseServiceData );
    }
    $scope.addUpcomingData = function(expneseType,id){
         $location.url(expneseType+"/"+id);
    }

    $scope.showNewUpcomingDataForm = function(){
       $scope.showNewModal = !$scope.showNewModal;
       if($scope.expneseServiceData.upcomingTransactionData.length == 0){
                $scope.showNewModal = true;
        }
    }
  });
