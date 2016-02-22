'use strict';

describe('Controller: IncomecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('expenseManagementApp'));

  var IncomecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IncomecontrollerCtrl = $controller('IncomecontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

 /* it('should attach a list of awesomeThings to the scope', function () {
    expect(IncomecontrollerCtrl.awesomeThings.length).toBe(3);
  });*/
});
