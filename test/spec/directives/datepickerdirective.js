'use strict';

describe('Directive: datepickerDirective', function () {

  // load the directive's module
  beforeEach(module('expenseManagementApp'));

  var scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  /*it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<datepicker-directive></datepicker-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the datepickerDirective directive');
  }));*/
});
