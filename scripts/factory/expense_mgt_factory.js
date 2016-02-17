app.factory('expManagementFactory', function(expneseMgtService) {

    var factory = {};
    factory.getTrasanctionData = function(expneseServiceData,type){
      var expenseData = [];
        for( var i = 0; i< expneseServiceData.expensesData.length; i++ ){
            if( expneseServiceData.expensesData[i].type == type ){
              expenseData.push(expneseServiceData.expensesData[i]);
            }
            if( type == "home" ){
                expenseData.push(expneseServiceData.expensesData[i]);
            }
        }
        expenseData.expenseObject = calculateIcomeAndExpense(expneseServiceData);
        return expenseData;
    }

    function calculateIcomeAndExpense(expneseServiceData){
        var expenseObject = { income: 0, expense: 0 };
          for( var i = 0; i < expneseServiceData.expensesData.length; i++ ){
            if( expneseServiceData.expensesData[i].type == "Income" ){
                expenseObject.income = expenseObject.income + parseInt( expneseServiceData.expensesData[i].amount );
            }else if( expneseServiceData.expensesData[i].type == "Expense" ){
                expenseObject.expense = expenseObject.expense + parseInt( expneseServiceData.expensesData[i].amount );
            }
          }
        return expenseObject;
    }

    factory.balanceCalculation = function( type, expneseServiceData, expDetails ) {
       if(  type == "Income"){
              expneseServiceData.currentBalance = parseInt( expneseServiceData.currentBalance ) + parseInt( expDetails.amount );
              return true;
          }else{
              if( parseInt( expDetails.amount ) > parseInt( expneseServiceData.currentBalance )){
               return false;
              }else{
                  expneseServiceData.currentBalance = parseInt( expneseServiceData.currentBalance ) - parseInt( expDetails.amount );
                  return true;
              }
          }
    }
  //  $scope.errors.requiredPayerName = a.trim().length > 1 ? true : false;
  factory.checkValidations = function(expDetails){
      var errors = { requiredPayerName:true, requiredPayeeName:true, requiredCatName:true, requiredAmount:true,
      requiredDate:true, modeofPayment:true, note:true};
      errors.requiredPayerName = !expDetails.payer ? true : expDetails.payer == undefined ? true : false;
      errors.requiredPayeeName = !expDetails.payee ? true : expDetails.payee == undefined ? true :false;
      errors.requiredCatName = expDetails.categorytype == undefined ? true : false;
      errors.requiredAmount = !expDetails.amount ? true : expDetails.amount == undefined ? true : false;
      errors.requiredDate = !expDetails.date ? true : expDetails.date == undefined ? true : false;
      errors.modeofPayment = !expDetails.modeofpayment ? true : expDetails.modeofpayment == undefined ? true :false;
      errors.note = !expDetails.note ? true : expDetails.note == undefined ? true : false;
      if( !errors.note ){
          errors.noteLength = expDetails.note.length > 50 ? true : false;
      }
      if( errors.requiredPayerName ||  errors.requiredPayeeName || errors.requiredCatName || errors.requiredAmount || errors.requiredDate || errors.modeofPayment){
          return true;
      }else{
          return false;
      }
  }

  factory.deleteTransaction = function(expneseServiceData,obj,type,ctrl){

      var balance = 0;
      if(type == "Expense"){
          balance = parseInt( expneseServiceData.currentBalance ) + parseInt( obj.amount );
      }else{
          balance = parseInt( expneseServiceData.currentBalance ) - parseInt( obj.amount );
      }
      if(ctrl == 'home'){
        type = ctrl;
      }
      if(balance < 0 ){
          alert("Your balance is very low....!");
          return factory.getTrasanctionData( expneseServiceData, type );
      }else{
          var result = confirm("Do you want to delete this transaction ? ");
          if (result) {
              expneseServiceData.currentBalance = balance;
              var index = expneseServiceData.expensesData.indexOf( obj );
              expneseServiceData.expensesData.splice( index, 1 );
              expneseMgtService.saveTransaction( expneseServiceData );
              if( ctrl == "home" ){
                  expenseData = expneseServiceData.expensesData;
                  var expenseDetails = calculateIcomeAndExpense(expneseServiceData);
                  expneseServiceData.currentBalance = parseInt( expenseDetails.income ) - parseInt( expenseDetails.expense );
                  expenseData.expenseObject = calculateIcomeAndExpense(expneseServiceData);
                  return expenseData;
             }else{
                  return factory.getTrasanctionData( expneseServiceData, type );
             }
          }else{
              return factory.getTrasanctionData( expneseServiceData, type );
          }
      }
  }

  factory.editTransaction = function(expneseServiceData,expDetails,type){
      for( var i = 0; i < expneseServiceData.expensesData.length; i++ ){
        if( expneseServiceData.expensesData[i].transactionId == expDetails.transactionId  ){
            expDetails.type = type;
            expneseServiceData.expensesData[i] = expDetails;
        }
      }

      var expenseDetails = calculateIcomeAndExpense(expneseServiceData);
      if( parseInt( expenseDetails.income ) < parseInt( expenseDetails.expense )){
          alert("Expense is More than Balance");
          return false;
      }else{
          expneseServiceData.currentBalance = parseInt( expenseDetails.income ) - parseInt( expenseDetails.expense );
          expneseMgtService.saveTransaction( expneseServiceData );
          factory.getTrasanctionData(expneseServiceData,type);
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
  return factory;
});