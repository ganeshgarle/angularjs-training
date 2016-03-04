'use strict';

describe('Controller: SettingscontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('expenseManagementApp'));

  var SettingscontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettingscontrollerCtrl = $controller('SettingscontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
   /* expect(SettingscontrollerCtrl.awesomeThings.length).toBe(3);*/
  });
});
