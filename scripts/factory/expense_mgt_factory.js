app.factory('expManagementFactory', function(expneseMgtService) {

    var factory = {};

    factory.incomeDetailFun = function(scope,type) {
       incomeDetailFunInsideFact(scope,type);
    }
    function incomeDetailFunInsideFact(scope,type){
      scope.expenseData = [];
        for( var i = 0; i< scope.expneseServiceData.expensesData.length; i++ ){
            if( scope.expneseServiceData.expensesData[i].type == type ){
              scope.expenseData.push(scope.expneseServiceData.expensesData[i]);
            }
            if( type == "home" ){
                scope.expenseData.push(scope.expneseServiceData.expensesData[i]);
            }
        }
        console.log( scope.expenseData );
        calculateIcomeAndExpense(scope)
    }
    factory.incomeCalculationFun = function(scope) {
       if(  scope.type == "Income"){
              scope.expneseServiceData.currentBalance = parseInt( scope.expneseServiceData.currentBalance ) + parseInt( scope.expDetails.amount );
              return true;
          }else{
              if( parseInt( scope.expDetails.amount ) > parseInt( scope.expneseServiceData.currentBalance )){
               return false;
              }else{
                  scope.expneseServiceData.currentBalance = parseInt( scope.expneseServiceData.currentBalance ) - parseInt( scope.expDetails.amount );
                  return true;
              }
          }
    }
  //  $scope.errors.requiredPayerName = a.trim().length > 1 ? true : false;
  factory.checkValidations = function(scope){
      scope.errors.requiredPayerName = !scope.expDetails.payer ? true : scope.expDetails.payer == undefined ? true : false;
      scope.errors.requiredPayeeName = !scope.expDetails.payee ? true : scope.expDetails.payee == undefined ? true :false;
      scope.errors.requiredCatName = scope.expDetails.categorytype == undefined ? true : false;
      scope.errors.requiredAmount = !scope.expDetails.amount ? true : scope.expDetails.amount == undefined ? true : false;
      scope.errors.requiredDate = !scope.expDetails.date ? true : scope.expDetails.date == undefined ? true : false;
      scope.errors.modeofPayment = !scope.expDetails.modeofpayment ? true : scope.expDetails.modeofpayment == undefined ? true :false;
      scope.errors.note = !scope.expDetails.note ? true : scope.expDetails.note == undefined ? true : false;
      if( !scope.errors.note ){
              scope.errors.noteLength = scope.expDetails.note.length > 50 ? true : false;
      }
      if( scope.errors.requiredPayerName ||  scope.errors.requiredPayeeName || scope.errors.requiredCatName || scope.errors.requiredAmount || scope.errors.requiredDate || scope.errors.modeofPayment){
          return true;
      }else{
        return false;
      }
  }

  factory.deleteTransaction = function(scope,obj,type,ctrl){
    var balance = 0;
    if(type == "Expense"){
        balance = parseInt( scope.expneseServiceData.currentBalance ) + parseInt( obj.amount );
    }else{
        balance = parseInt( scope.expneseServiceData.currentBalance ) - parseInt( obj.amount );
    }

   /*   var index = scope.expenseData.indexOf( obj );
      scope.expenseData.splice( index, 1 );*/
      if(balance < 0 ){
        alert("Your balance is very low....!")
      }else{
          scope.expneseServiceData.currentBalance = balance;
          var index = scope.expneseServiceData.expensesData.indexOf( obj );
          scope.expneseServiceData.expensesData.splice( index, 1 );
          expneseMgtService.saveTransaction( scope.expneseServiceData );
          if(ctrl == "home"){
              scope.expenseData = scope.expneseServiceData.expensesData;
              var expenseDetails = calculateIcomeAndExpense(scope);
              scope.expneseServiceData.currentBalance = parseInt( expenseDetails.income ) - parseInt( expenseDetails.expense );
         }else{
              incomeDetailFunInsideFact(scope,type)
         }
   }
  }

  factory.editTransaction = function(scope,type){
      for( var i = 0; i < scope.expneseServiceData.expensesData.length; i++ ){
        if( scope.expneseServiceData.expensesData[i].transactionId == scope.expDetails.transactionId  ){
            scope.expDetails.type = scope.type;
            scope.expneseServiceData.expensesData[i] = scope.expDetails;
        }
      }

      var expenseDetails = calculateIcomeAndExpense(scope);
      if( parseInt( expenseDetails.income ) < parseInt( expenseDetails.expense )){
          alert("Expense is More than Balance");
          return false;
      }else{
          scope.expneseServiceData.currentBalance = parseInt( expenseDetails.income ) - parseInt( expenseDetails.expense );
          expneseMgtService.saveTransaction( scope.expneseServiceData );
           incomeDetailFunInsideFact(scope,type);
          scope.expDetails = "";
          return true;
     }
  }
  factory.createTransactionId = function(id, list) {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i].transactionId <= id) {
            id++;
          }
      }
      return id;
  }
  function calculateIcomeAndExpense(scope){
      scope.expMgt={income: 0,expense: 0 }
        for( var i = 0; i < scope.expneseServiceData.expensesData.length; i++ ){
          if( scope.expneseServiceData.expensesData[i].type == "Income" ){
              scope.expMgt.income = scope.expMgt.income + parseInt( scope.expneseServiceData.expensesData[i].amount );
          }else if( scope.expneseServiceData.expensesData[i].type == "Expense" ){
              scope.expMgt.expense = scope.expMgt.expense + parseInt( scope.expneseServiceData.expensesData[i].amount );
          }
        }
        console.log(scope.expMgt);
      return scope.expMgt;
  }
  return factory;
});