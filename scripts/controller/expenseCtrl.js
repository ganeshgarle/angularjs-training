app.controller('expManagerExpenseCtrl', ['$scope','expneseMgtService','expManagementFactory', function( $scope, expneseMgtService,expManagementFactory ){
   console.log('expManagerExpenseCtrl');
    $scope.expDetails = {};
    $scope.buttonValue = "Add";

    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    $scope.expneseServiceData = {};
    var errorIs = true;
    $scope.currentPage = "Expense"
    $scope.showForm = false;
/*
    $scope.expenceType = [{
        type:'Income',isDefault:true
      },
      {
       type:'Expense',isDefault:false
      }];
*/
    $scope.type = 'Expense';
    var transactionId = 0;

    $scope.showTransactionForm = function(){
      $scope.showForm = true;
    }
   if( expneseMgtService.getTransactionData() == undefined ){
        expneseMgtService.getTransactionDataFromMockApi().then(function(data){
          console.log(data);
          $scope.expneseServiceData = data;
           expManagementFactory.incomeDetailFun($scope,$scope.currentPage);
        });
    }else{
        $scope.expneseServiceData = expneseMgtService.getTransactionData();
        expManagementFactory.incomeDetailFun($scope,$scope.type);
       // $scope.incomeDetailFun();
    }

    $scope.clear = function(){
      $scope.expDetails = "";
     // $scope.buttonValue = "Add";
    }
    $scope.hideTransactionForm = function(){
      $scope.showForm = false;
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
  //  $scope.errors.requiredPayerName = a.trim().length > 1 ? true : false;


    var data = {};
    $scope.addTransaction = function() {
        if( expManagementFactory.checkValidations($scope) ){
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
              if( !expManagementFactory.checkValidations($scope) ){
                    if( expManagementFactory.editTransaction($scope,$scope.type) ){
                        $scope.buttonValue = "Add";
                        $scope.showForm = false;
                    }
                }
          }else{
            if( expManagementFactory.incomeCalculationFun($scope) ){
                $scope.expneseServiceData.expensesData.push( data );
                $scope.expneseServiceData.expensesData.reverse();
                expneseMgtService.saveTransaction( $scope.expneseServiceData );
                expManagementFactory.incomeDetailFun($scope,$scope.type);
                alert( "Record Added Successfully...!" );
                $scope.expDetails = "";
                $scope.showForm = false;
            }else{
               alert( "Expense amount is more than balance amount...!" );
            }

          }
        }
    }

    $scope.deleteTransaction = function( obj ){
      expManagementFactory.deleteTransaction($scope,obj,$scope.type);
    }

    var editValue = "";
    $scope.updateTransaction = function( obj ){
      $scope.showForm = true;
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }
}]);