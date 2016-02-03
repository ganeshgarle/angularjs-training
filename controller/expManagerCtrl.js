app.controller('expManagerCtrl', function( $scope, expneseMgtService,expManagementFactory ){
    $scope.expDetails = {};
    $scope.buttonValue = "Add";

    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    var errorIs = true;


    var transactionId = 0;
    $scope.expneseServiceData = {};
    $scope.expenseData;
    if( expneseMgtService.get() == undefined ){
        var promise =expneseMgtService.getjson()
        .then(function(data) {
          $scope.expneseServiceData = data;
           expManagementFactory.incomeDetailFun($scope,"home");
        }, function(error) {
           return error;
        })
        .finally(function() {
          console.log('Finished at:', new Date())
        });
    }else{
        $scope.expneseServiceData = expneseMgtService.get();
        expManagementFactory.incomeDetailFun($scope,"home");
    }

    $scope.deleteExpenseData = function( obj,type ){
      expManagementFactory.deleteEntry($scope,obj,type,"home");
    }
    var editValue = "";
    $scope.editExpenseData = function( obj ){
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }

})

app.loadData = function( $q,$http ){

  var defer = $q.defer();

    $http({
              method: 'GET',
              url: 'mock_api/expensedata.json'
          }).success(function (data) {
            statementDetails =  data;
              defer.resolve(data);
          }).error(function (msg) {
              defer.reject(msg+"error message:");
          });

  return defer.promise;
}