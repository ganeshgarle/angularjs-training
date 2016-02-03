app.controller('expManagerExpenseCtrl', function( $scope, expneseMgtService,expManagementFactory ){
    $scope.expDetails = {};
    $scope.buttonValue = "Add";

    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    $scope.expneseServiceData = {};
    var errorIs = true;
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

   if( expneseMgtService.get() == undefined ){
        var promise =expneseMgtService.getjson()
        .then(function(data) {
           $scope.expneseServiceData = data;
           expManagementFactory.incomeDetailFun($scope,$scope.type);
        }, function(error) {
           return error;
        })
        .finally(function() {
          console.log('Finished at:', new Date())
        });
    }else{
        $scope.expneseServiceData = expneseMgtService.get();
        expManagementFactory.incomeDetailFun($scope,$scope.type);
       // $scope.incomeDetailFun();
    }

    $scope.clear = function(){
      $scope.expDetails = "";
      $scope.buttonValue = "Add";
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
    $scope.addIncome = function() {
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
                    if( expManagementFactory.editEntry($scope,$scope.type) ){
                        $scope.buttonValue = "Add";
                    }
                }
          }else{
            if( expManagementFactory.incomeCalculationFun($scope) ){
                $scope.expneseServiceData.expensesData.push( data );
                $scope.expneseServiceData.expensesData.reverse();
                expneseMgtService.saveData( $scope.expneseServiceData );
                expManagementFactory.incomeDetailFun($scope,$scope.type);
                alert( "Record Added Successfully...!" );
                $scope.expDetails = "";
            }else{
               alert( "Expense amount is more than balance amount...!" );
            }

          }
        }
    }



    $scope.deleteExpenseData = function( obj ){
      expManagementFactory.deleteEntry($scope,obj,$scope.type);
    }

    var editValue = "";
    $scope.editExpenseData = function( obj ){
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }

})