(function () {
  'use strict';

  describe('Historial de cobros Controller Tests', function () {
    // Initialize global variables
    var HistorialDeCobrosController,
      $scope,
      $httpBackend,
      $state,
      Authentication,
      HistorialDeCobrosService,
      mockHistorialDeCobro;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$state_, _$httpBackend_, _Authentication_, _HistorialDeCobrosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();

      // Point global variables to injected services
      $httpBackend = _$httpBackend_;
      $state = _$state_;
      Authentication = _Authentication_;
      HistorialDeCobrosService = _HistorialDeCobrosService_;

      // create mock Historial de cobro
      mockHistorialDeCobro = new HistorialDeCobrosService({
        _id: '525a8422f6d0f87f0e407a33',
        name: 'Historial de cobro Name'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['user']
      };

      // Initialize the Historial de cobros controller.
      HistorialDeCobrosController = $controller('Historial de cobrosController as vm', {
        $scope: $scope,
        historialDeCobroResolve: {}
      });

      // Spy on state go
      spyOn($state, 'go');
    }));

    describe('vm.save() as create', function () {
      var sampleHistorialDeCobroPostData;

      beforeEach(function () {
        // Create a sample Historial de cobro object
        sampleHistorialDeCobroPostData = new HistorialDeCobrosService({
          name: 'Historial de cobro Name'
        });

        $scope.vm.historialDeCobro = sampleHistorialDeCobroPostData;
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (HistorialDeCobrosService) {
        // Set POST response
        $httpBackend.expectPOST('api/historial-de-cobros', sampleHistorialDeCobroPostData).respond(mockHistorialDeCobro);

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL redirection after the Historial de cobro was created
        expect($state.go).toHaveBeenCalledWith('historial-de-cobros.view', {
          historialDeCobroId: mockHistorialDeCobro._id
        });
      }));

      it('should set $scope.vm.error if error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/historial-de-cobros', sampleHistorialDeCobroPostData).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      });
    });

    describe('vm.save() as update', function () {
      beforeEach(function () {
        // Mock Historial de cobro in $scope
        $scope.vm.historialDeCobro = mockHistorialDeCobro;
      });

      it('should update a valid Historial de cobro', inject(function (HistorialDeCobrosService) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/historial-de-cobros\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        $scope.vm.save(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($state.go).toHaveBeenCalledWith('historial-de-cobros.view', {
          historialDeCobroId: mockHistorialDeCobro._id
        });
      }));

      it('should set $scope.vm.error if error', inject(function (HistorialDeCobrosService) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/historial-de-cobros\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        $scope.vm.save(true);
        $httpBackend.flush();

        expect($scope.vm.error).toBe(errorMessage);
      }));
    });

    describe('vm.remove()', function () {
      beforeEach(function () {
        // Setup Historial de cobros
        $scope.vm.historialDeCobro = mockHistorialDeCobro;
      });

      it('should delete the Historial de cobro and redirect to Historial de cobros', function () {
        // Return true on confirm message
        spyOn(window, 'confirm').and.returnValue(true);

        $httpBackend.expectDELETE(/api\/historial-de-cobros\/([0-9a-fA-F]{24})$/).respond(204);

        $scope.vm.remove();
        $httpBackend.flush();

        expect($state.go).toHaveBeenCalledWith('historial-de-cobros.list');
      });

      it('should should not delete the Historial de cobro and not redirect', function () {
        // Return false on confirm message
        spyOn(window, 'confirm').and.returnValue(false);

        $scope.vm.remove();

        expect($state.go).not.toHaveBeenCalled();
      });
    });
  });
}());
