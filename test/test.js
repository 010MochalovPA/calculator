import Identifier from '../classes/Identifier.js';
import Numeric from '../classes/Identifier.js';
import Variable from '../classes/Variable.js';
import Func from '../classes/Function.js'
import Data from '../classes/Function.js'

describe('Classes:',() => {
  describe('class Identifier', () => {

    it('класс Identifier существует', () => {
      expect(Identifier).to.exist;
      expect(Identifier).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const instance = new Identifier();
      expect(instance).to.respondTo('isNumeric');
      expect(instance).to.respondTo('isValid');
      expect(instance).to.respondTo('getValue');
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

  describe('class Numeric', () => {

    it('класс Numeric существует', () => {
      expect(Numeric).to.exist;
      expect(Numeric).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const number = new Numeric();
      expect(number).to.respondTo('getValue');
    });

    it('возвращает корректное значение', () => {
      const number = new Numeric('-1');
      assert.strictEqual(number.getValue(),'-1');
    });
  });

  describe('class Variable', () => {

    it('класс Variable существует', () => {
      expect(Variable).to.exist;
      expect(Variable).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const variable = new Variable();
      expect(variable).to.respondTo('getValue');
    });


    it('возвращает корректное значение', () => {
      const variable1 = new Variable('x', 'NaN');
      const variable2 = new Variable('y','-1');
      const variable3 = new Variable('z','3');
      const variable4 = new Variable('x','12.5');

      assert.strictEqual(variable1.getValue(),'NaN');
      assert.strictEqual(variable2.getValue(),'-1');
      assert.strictEqual(variable3.getValue(),'3');
      assert.strictEqual(variable4.getValue(),'12.5');
    });

  });
  describe('class Func', () => {

    it('класс Func существует', () => {
      expect(Func).to.exist;
      expect(Func).to.be.instanceOf(Function);
    });

    it('присутствуют методы', () => {
      const fn = new Func();
      expect(fn).to.respondTo('getValue');
    });

    it('возвращает корректное значение', () => {
      const variable1 = new Variable('x', 'NaN');
      const variable2 = new Variable('y','-1');
      const variable3 = new Variable('z','3');
      const variable4 = new Variable('x','12.5');

      assert.strictEqual(variable1.getValue(),'NaN');
      assert.strictEqual(variable2.getValue(),'-1');
      assert.strictEqual(variable3.getValue(),'3');
      assert.strictEqual(variable4.getValue(),'12.5');
    });

  });
})
