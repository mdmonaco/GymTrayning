'use strict';

describe('Historial de cobros E2E Tests:', function () {
  describe('Test Historial de cobros page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/historial-de-cobros');
      expect(element.all(by.repeater('historial-de-cobro in historial-de-cobros')).count()).toEqual(0);
    });
  });
});
