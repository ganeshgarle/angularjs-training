'use strict';

describe('Controller: ExpensecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('expenseManagementApp'));

  var ExpensecontrollerCtrl,
    scope,routeParams,location,expenseapiservice,expnesedatafactory;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ( $controller, $rootScope ) {
    console.log('In inject function ');
    scope = $rootScope.$new();

    ExpensecontrollerCtrl = $controller('ExpensecontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
/*
  it('should attach a list of awesomeThings to the scope', function () {
    expect(ExpensecontrollerCtrl.awesomeThings.length).toBe(3);
  });*/
});
