'use strict';

describe('Directive: upcomingTransactionDirective', function () {

  // load the directive's module
  beforeEach(module('expenseManagementApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<upcoming-transaction-directive></upcoming-transaction-directive>');
    element = $compile(element)(scope);/*
    expect(element.text()).toBe('this is the upcomingTransactionDirective directive');*/
  }));
});
