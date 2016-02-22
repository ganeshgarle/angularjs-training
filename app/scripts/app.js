'use strict';

/**
 * @ngdoc overview
 * @name expenseManagementApp
 * @description
 * # expenseManagementApp
 *
 * Main module of the application.
 */
angular
  .module('expenseManagementApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomecontrollerCtrl',
        controllerAs: 'home'
      })
      .when('/income', {
        templateUrl: 'views/income-expense.html',
        controller: 'IncomecontrollerCtrl',
        controllerAs: 'income'
      })
       .when('/expenses', {
        templateUrl: 'views/income-expense.html',
        controller: 'ExpensecontrollerCtrl',
        controllerAs: 'expnese'
      })
       .when('/income/:id', {
        templateUrl: 'views/income-expense.html',
        controller: 'IncomecontrollerCtrl',
        controllerAs: 'income'
      })
        .when('/expenses/:id', {
        templateUrl: 'views/income-expense.html',
        controller: 'ExpensecontrollerCtrl',
        controllerAs: 'expenses'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
