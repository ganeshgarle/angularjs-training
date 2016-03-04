'use strict';

describe('Controller: ExpensecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('expenseManagementApp'));

  var scope, controller,service, $httpBackend;

  // Initialize the controller and a mock scope
   beforeEach( inject( function ( _$httpBackend_,$rootScope, $controller,ExpenseApiService ) {

      $httpBackend = _$httpBackend_;
      scope = $rootScope.$new();

      service = ExpenseApiService;
      controller =  $controller( 'ExpensecontrollerCtrl', {
        $scope: scope
      } );

  } ) );


  it( 'should exist', function () {
    // ****** test varibles defined or not *********************
        expect( controller ).toBeDefined();
        expect( scope.expDetails ).toBeDefined();
        expect( scope.buttonValue ).toBe('Add');
        expect( scope.categoryType.length ).toBe(5);
        expect( scope.modeofPayment.length ).toBeDefined(3);
        expect( scope.expenseData ).toBeDefined();
        expect( scope.expneseServiceData ).toBeDefined();
        expect( scope.showForm ).toBeDefined();
        expect( scope.errorIs ).toBeDefined();
        expect(scope.currentPage).toBe('Expense');
        expect(scope.type).toBe('Expense');
        expect(scope.errors).toBeDefined();


// ****** test Functions defined or not *********************
        expect(scope.clearForm).toBeDefined();
        expect(scope.showTransactionForm).toBeDefined();
        expect(scope.hideTransactionForm).toBeDefined();
        expect(scope.addTransaction).toBeDefined();
        expect(scope.deleteTransaction).toBeDefined();
        expect(scope.updateTransaction).toBeDefined();
  } );
  it( 'addTransaction Transaction function exist', function () {
    var expenseDetails = { "transactionId" : 2,
            "amount" : "2000",
            "categorytype" : "Recharge",
            "date" : "25/01/2016",
            "note" : "Mobile Recharge",
            "payee" : "Roy",
            "payer" : "Rahul",
            "type" : "Expense",
            "modeofpayment" : "Credit Card"};
    scope.expneseServiceData= {};
    scope.expneseServiceData.expensesData = [];
    scope.expDetails = expenseDetails;
    scope.addTransaction();
    expect(scope.addedSuccess).toBe(true);
  } );


  it( 'Delete Transaction Transaction function exist', function () {
    var expenseDetails = {  "transactionId" : 2,
                            "amount" : "2000",
                            "categorytype" : "Recharge",
                            "date" : "25/01/2016",
                            "note" : "Mobile Recharge",
                            "payee" : "Roy",
                            "payer" : "Rahul",
                            "type" : "Expense",
                            "modeofpayment" : "Credit Card"};
    scope.expneseServiceData= {
                                "id": "1",
                                "name": "Wisconsin Horses",
                                "created_at": 1447695716,
                                "updated_at": 1447695716,
                                "currentBalance": 7000
                              };

  scope.expneseServiceData.expensesData = [
        {
            "transactionId" : 1,
            "amount" : "1000",
            "categorytype" : "Internet Bills",
            "date" : "12/01/2016",
            "note" : "Internet Bills",
            "payee" : "Roy",
            "payer" : "Rahul",
            "type" : "Expense",
            "modeofpayment" : "cash"

        },
         {
            "transactionId" : 2,
            "amount" : "2000",
            "categorytype" : "Recharge",
            "date" : "25/01/2016",
            "note" : "Mobile Recharge",
            "payee" : "Roy",
            "payer" : "Rahul",
            "type" : "Expense",
            "modeofpayment" : "Credit Card"
        },
        {
            "transactionId" : 3,
            "amount" : "9000",
            "categorytype" : "Other",
            "date" : "01/01/2016",
            "note" : "Payement",
            "payee" : "Roy",
            "payer" : "Rahul",
            "type" : "Income",
            "modeofpayment" : "Online"
        },
        {
            "transactionId" : 4,
            "amount" : "1000",
            "categorytype" : "Other",
            "date" : "01/01/2016",
            "note" : "Payement",
            "payee" : "Roys",
            "payer" : "Rahul",
            "type" : "Income",
            "modeofpayment" : "Online"
        }
    ];
    scope.expDetails = expenseDetails;
    scope.deleteTransaction(expenseDetails.transactionId);
    console.log(scope.expneseServiceData.expensesData.length);
    expect(scope.expneseServiceData.expensesData.length).toBe(3);
    expect(scope.addedSuccess).toBe(true);
  } );

  /*it( 'addTransaction Transaction function exist', function () {
    var expenseDetails = { "transactionId":8,
                "amount":'sdsdf',
                "categorytype":'Rent',
                "date":'5/05/2016',
                "modeofpayment":'cash',
                "note":'My Payment',
                "payee":'ABC',
                "payer":'PQR',
                "type":'Income'}
     scope.expneseServiceData= {};
    scope.expneseServiceData.expensesData = [];
    scope.expDetails = expenseDetails;
    scope.addTransaction();
    expect(scope.addedSuccess).toBe(true);

    scope.expneseServiceData.currentBalance
  } );*/


});
