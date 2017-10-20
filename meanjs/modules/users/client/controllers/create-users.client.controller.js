(function() {
  'use strict';

  angular
    .module('users')
    .controller('CreateUsersController', CreateUsersController);

  CreateUsersController.$inject = ['$scope', '$state', 'UsersService', '$location', '$window', 'Authentication', 'PasswordValidator', 'Notification'];

  function CreateUsersController($scope, $state, UsersService, $location, $window, Authentication, PasswordValidator, Notification) {
    var vm = this;

    // Create users controller logic
    // ...
    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    vm.dniRegex = /^[0-9]{8}$/;
    vm.disciplines = getDisciplines();

    var temp = Authentication.user;



    function getDisciplines() {
      UsersService.getArticles()
        .then(function (response) {
          vm.disciplines = response;
        }, function (error) {
        });
    }

    function signup(isValid) {

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      UsersService.userCreate(vm.credentials)
        .then(onUserSignupSuccess)
        .catch(onUserSignupError);
    }

    // Authentication Callbacks

    function onUserSignupSuccess(response) {
      // If successful we assign the response to the global user model
      //vm.authentication.user = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Usuario ' + response.displayName +  ' creado!' });
      // And redirect to the previous or home page
      //$state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onUserSignupError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
    }

    init();

    function init() {
    }
  }
})();
