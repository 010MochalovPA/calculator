import Identifier from '../classes/Identifier.js';

describe('Classes:',() => {
  describe('class Identifier', () => {

    it('класс Identifier существует', () => {
      expect(Identifier).to.exist;
      expect(Identifier).to.be.instanceOf(Function);
    });

    it('присутствуют нужные методы', () => {
      const instance = new Identifier();
      expect(instance).to.respondTo('isNumeric');
      expect(instance).to.respondTo('isValid');
      expect(instance).to.respondTo('getValue');
    });

    it('возвращает null если не переданы параметры при создании', () => {
      const identifier = new Identifier();
      assert.strictEqual(identifier.getValue(), null);
    });

    it('возвращает корректное значение', () => {
      const identifier = new Identifier('x');
      assert.strictEqual(identifier.getValue(),'x');
    });

    it('является ли идентификатор числом с плавающей точкой ', () => {
      const identifier = new Identifier('x');
      const identifier2 = new Identifier('1.23');
      const identifier3 = new Identifier();
      const identifier4 = new Identifier('-2512.156234');
      const identifier5 = new Identifier('1,543');
      assert.strictEqual(identifier.isNumeric(), false);
      assert.strictEqual(identifier2.isNumeric(), true);
      assert.strictEqual(identifier3.isNumeric(), false);
      assert.strictEqual(identifier4.isNumeric(), true);
      assert.strictEqual(identifier5.isNumeric(), false);
    });

    it('является ли валидным', () => {
      const identifier = new Identifier('x');
      const identifier2 = new Identifier('1.233');
      const identifier3 = new Identifier('1,232523');
      const identifier4 = new Identifier("_1");
      const identifier5 = new Identifier("1x");
      const identifier6 = new Identifier('true');
      const identifier7 = new Identifier('false');
      const identifier8 = new Identifier('undefined');
      const identifier9 = new Identifier('NaN');
      assert.strictEqual(identifier.isValid(), true);
      assert.strictEqual(identifier2.isValid(), true);
      assert.strictEqual(identifier3.isValid(), false);
      assert.strictEqual(identifier4.isValid(), true);
      assert.strictEqual(identifier5.isValid(), false);
      assert.strictEqual(identifier6.isValid(), false);
      assert.strictEqual(identifier7.isValid(), false);
      assert.strictEqual(identifier8.isValid(), false);
      assert.strictEqual(identifier9.isValid(), false);
    });

  });
})
