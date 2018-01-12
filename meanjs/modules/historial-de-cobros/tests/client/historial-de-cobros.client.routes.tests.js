(function () {
  'use strict';

  describe('Historial de cobros Route Tests', function () {
    // Initialize global variables
    var $scope,
      HistorialDeCobrosService;

    // We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _HistorialDeCobrosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      HistorialDeCobrosService = _HistorialDeCobrosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('historial-de-cobros');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/historial-de-cobros');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          HistorialDeCobrosController,
          mockHistorialDeCobro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('historial-de-cobros.view');
          $templateCache.put('modules/historial-de-cobros/client/views/view-historial-de-cobro.client.view.html', '');

          // create mock Historial de cobro
          mockHistorialDeCobro = new HistorialDeCobrosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Historial de cobro Name'
          });

          // Initialize Controller
          HistorialDeCobrosController = $controller('HistorialDeCobrosController as vm', {
            $scope: $scope,
            historialDeCobroResolve: mockHistorialDeCobro
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:historialDeCobroId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.historialDeCobroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            historialDeCobroId: 1
          })).toEqual('/historial-de-cobros/1');
        }));

        it('should attach an Historial de cobro to the controller scope', function () {
          expect($scope.vm.historialDeCobro._id).toBe(mockHistorialDeCobro._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/historial-de-cobros/client/views/view-historial-de-cobro.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          HistorialDeCobrosController,
          mockHistorialDeCobro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('historial-de-cobros.create');
          $templateCache.put('modules/historial-de-cobros/client/views/form-historial-de-cobro.client.view.html', '');

          // create mock Historial de cobro
          mockHistorialDeCobro = new HistorialDeCobrosService();

          // Initialize Controller
          HistorialDeCobrosController = $controller('HistorialDeCobrosController as vm', {
            $scope: $scope,
            historialDeCobroResolve: mockHistorialDeCobro
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.historialDeCobroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/historial-de-cobros/create');
        }));

        it('should attach an Historial de cobro to the controller scope', function () {
          expect($scope.vm.historialDeCobro._id).toBe(mockHistorialDeCobro._id);
          expect($scope.vm.historialDeCobro._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/historial-de-cobros/client/views/form-historial-de-cobro.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          HistorialDeCobrosController,
          mockHistorialDeCobro;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('historial-de-cobros.edit');
          $templateCache.put('modules/historial-de-cobros/client/views/form-historial-de-cobro.client.view.html', '');

          // create mock Historial de cobro
          mockHistorialDeCobro = new HistorialDeCobrosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Historial de cobro Name'
          });

          // Initialize Controller
          HistorialDeCobrosController = $controller('HistorialDeCobrosController as vm', {
            $scope: $scope,
            historialDeCobroResolve: mockHistorialDeCobro
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:historialDeCobroId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.historialDeCobroResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            historialDeCobroId: 1
          })).toEqual('/historial-de-cobros/1/edit');
        }));

        it('should attach an Historial de cobro to the controller scope', function () {
          expect($scope.vm.historialDeCobro._id).toBe(mockHistorialDeCobro._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/historial-de-cobros/client/views/form-historialDeCobro.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
}());
