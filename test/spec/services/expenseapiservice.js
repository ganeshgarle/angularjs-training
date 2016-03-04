'use strict';

describe('Service: ExpenseApiService', function () {

  // load the service's module
  beforeEach(module('expenseManagementApp'));

  // instantiate service
  var ExpenseApiService;
  beforeEach(inject(function (_ExpenseApiService_) {
    ExpenseApiService = _ExpenseApiService_;
  }));

   it('should do something', function () {
    console.log('in service');

    expect(!!ExpenseApiService).toBe(true);
  });

});
