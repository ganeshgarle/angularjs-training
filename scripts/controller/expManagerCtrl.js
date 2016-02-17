app.controller('expManagerCtrl', ['$scope','expneseMgtService','expManagementFactory', function( $scope, expneseMgtService,expManagementFactory ){
    $scope.expDetails = {};
    $scope.buttonValue = "Add";
    $scope.categoryType = [ 'Rent', 'Light Bill', 'Internet Bill', 'Recharge', 'Other' ];
    $scope.modeofPayment = [ 'Credit Card', 'Cash', 'Net Banking' ];
    $scope.expenseData = [];
    var errorIs = true;
    var transactionId = 0;
    $scope.expneseServiceData = {};
    $scope.expenseData;
    $scope.currentPage = "home";

    if( expneseMgtService.getTransactionData() == undefined ){
        expneseMgtService.getTransactionDataFromMockApi().then(function(data){
          $scope.expneseServiceData = data;
          $scope.expenseData = expManagementFactory.getTrasanctionData( $scope.expneseServiceData, $scope.currentPage );
        });

    }else{
        $scope.expneseServiceData = expneseMgtService.getTransactionData();
        $scope.expenseData = expManagementFactory.getTrasanctionData( $scope.expneseServiceData, $scope.currentPage );
    }

    $scope.deleteTransaction = function( obj,type ){
      $scope.expenseData = expManagementFactory.deleteTransaction( $scope.expneseServiceData, obj, type, $scope.currentPage );
    }
    var editValue = "";
    $scope.updateTransaction = function( obj ){
      $scope.buttonValue = "Edit";
      $scope.expDetails = obj;
      $scope.type = $scope.expDetails.type;
      editValue = obj.amount;
    }

}]);
/*app.loadData = function( $q,$http ){

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
}*/

/*app.filter('trafficCalculator',function(){
  return function(array,laneType){
    var avarage = _.reduce(array,function(count,num){
        return count+num;
    },0);
    if(avarage > 3){
      return 'High Trafic';
    }
    if(avarage > 2){
      if(laneType == 'SIGNAL'){
        return 'Modreate Trafic';
      }else if(laneType == 'DOUBLE'){
        return 'Low Trafic';
      }
    }else{
      return 'Lows Trafic';
    }
  }
})*/

