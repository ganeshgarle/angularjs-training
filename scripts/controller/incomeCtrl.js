app.controller('expManagerIncomeCtrl', ['$scope','expneseMgtService','expManagementFactory', function( $scope, expneseMgtService,expManagementFactory ){

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
    if( expneseMgtService.getTransactionData() == undefined ){
          expneseMgtService.getTransactionDataFromMockApi().then(function(data){
            $scope.expneseServiceData = data;
            $scope.expenseData = expManagementFactory.getTrasanctionData($scope.expneseServiceData,$scope.currentPage);
        });
    }else{
        $scope.expneseServiceData = expneseMgtService.getTransactionData();
        $scope.expenseData = expManagementFactory.getTrasanctionData($scope.expneseServiceData,$scope.type);
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
    }
    $scope.showTransactionForm = function(){
        $scope.showForm = true;
    }
     $scope.hideTransactionForm = function(){
        $scope.showForm = false;
    }

    $scope.addTransaction = function() {
        if( expManagementFactory.checkValidations( $scope.expDetails ) ){
          errorIs = true;
        }else {
            if( $scope.expneseServiceData.expensesData.length > 1 ){
                transactionId = $scope.expneseServiceData.expensesData.length;
            }
            transactionId = expManagementFactory.createTransactionId(transactionId,$scope.expneseServiceData.expensesData);
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
                  if( !expManagementFactory.checkValidations($scope.expDetails) ){
                      if( expManagementFactory.editTransaction($scope.expneseServiceData, $scope.expDetails, $scope.type) ){
                          $scope.buttonValue = "Add";
                          $scope.showForm = false;
                          $scope.expDetails = "";
                      }
                  }
            }else{
              if( expManagementFactory.balanceCalculation( $scope.type, $scope.expneseServiceData, $scope.expDetails ) ){
                  $scope.expneseServiceData.expensesData.push( data );
                  $scope.expneseServiceData.expensesData.reverse();
                  expneseMgtService.saveTransaction( $scope.expneseServiceData );
                  $scope.expenseData =  expManagementFactory.getTrasanctionData($scope.expneseServiceData,$scope.type);
                  alert( "Record Added Successfully...!" );
                  $scope.expDetails = "";
                  $scope.showForm = false;
                  $('#searchBox').focus();
              }else{
                 alert( "Expense amount is more than balance amount...!" );
              }
            }
        }
    }

    $scope.deleteTransaction = function( obj ){
      $scope.expenseData = expManagementFactory.deleteTransaction($scope.expneseServiceData,obj,$scope.type);
    }

    $scope.updateTransaction = function( obj ){
      $scope.showForm = true;
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }

}]);