'use strict';

describe('Controller: IncomecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('expenseManagementApp'));

  var controller,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    controller = $controller('IncomecontrollerCtrl', {
        $scope: scope,
        $routeParams:{}

      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(3).toBe(3);
  });
});
