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
       .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'SettingscontrollerCtrl',
        controllerAs: 'settings'
      })
       .when('/Income/:id', {
        templateUrl: 'views/income-expense.html',
        controller: 'IncomecontrollerCtrl',
        controllerAs: 'Income'
      })
        .when('/Expenses/:id', {
        templateUrl: 'views/income-expense.html',
        controller: 'ExpensecontrollerCtrl',
        controllerAs: 'Expenses'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
